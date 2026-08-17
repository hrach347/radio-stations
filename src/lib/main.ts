import { publicApiUrl, routes } from "../constants.js"
import type { Category, Filter, SearchType, Station } from "../types.js"


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