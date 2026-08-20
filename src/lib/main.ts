import { spawnProcess } from "exec-cute"

import { publicApiUrl, routes } from "../constants.js"
import type { Category, Filter, SearchType, Station, StreamPlayer } from "../types.js"

import type { ReadableStream } from "node:stream/web"
import { Readable } from "node:stream"



async function fetchData<T>(url: string): Promise<T[] | null> {
    try {
        const response = await fetch(url)

        if (!response.ok) return null

        return await response.json() as T[]
    } catch {
        return null
    }
}

export async function getAll(filter: Filter = ""): Promise<Category[] | null> {
    if (!filter) return fetchData(publicApiUrl + routes.all)
    return fetchData<Category>(publicApiUrl + routes[filter])
}

export async function searchStations(searchType: SearchType = "", searchItem: string = ""): Promise<Station[] | null> {
    if (!searchType) return fetchData(publicApiUrl + routes.all)
    return fetchData<Station>(`${publicApiUrl + routes.all}/${searchType}/${searchItem}`)
}

export function prune(list: Station[]): Partial<Station>[] {
    return list.map(({ stationuuid, name, url, homepage, tags, country, countrycode, language }) => ({
        stationuuid,
        name,
        url,
        homepage,
        tags,
        country,
        countrycode,
        language
    }))
}


export async function playStream(url: string, logging = false): Promise<StreamPlayer> {

    //ONLY for LINUX/MAC

    console.log("Connecting to stream via fetch...");

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (!response.body) {
        throw new Error("Response body is empty or null.");
    }

    const player = spawnProcess('ffplay -nodisp -autoexit -i pipe:0');

    player.onData((polishedData, data, err) => {
        //ALWAYS THROWS ERROR BECAUSE FFMPEG IS DUMB :) SO -> if polishedData is "" so there no data -> now check err, if err uremn really err, FFMPEG TWEAK
        if (!polishedData && err) {
            console.log("#### Is FFMPEG package installed? - sudo apt install ffmpeg ####")
            throw new Error(err)
        }

        //Monitoring-the-stream
        if (logging) {
            console.log(polishedData)
        }
    })


    console.log("Starting MP3 stream live...");
    if (!player.stdin) {
        throw new Error("Failed to open stdin for the media player process.");
    }

    Readable.fromWeb(response.body as ReadableStream<any>).pipe(player.stdin);

    return {
        player,
        url,
        stop: function (this) {
            if (this.player.stdin) {
                this.player.stdin.end();
            }
        }
    }
}

