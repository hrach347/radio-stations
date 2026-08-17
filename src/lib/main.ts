import { publicApiUrl, routes } from "../constants.js"
import type { Filter, ObjectIn, SearchType } from "../types.js"


async function fetchData(url: string): Promise<ObjectIn[] | null> {
    try {
        const response = await fetch(url)

        if (!response.ok) return null

        return await response.json() as ObjectIn[]
    } catch {
        return null
    }
}

export async function getAll(filter: Filter = ""): Promise<ObjectIn[] | null> {
    if (!filter) return fetchData(publicApiUrl + routes.all)
    return fetchData(publicApiUrl + routes[filter])
}

export async function searchStations(searchType: SearchType = "", searchItem: string = ""): Promise<ObjectIn[] | null> {
    if (!searchType) return fetchData(publicApiUrl + routes.all)
    return fetchData(`${publicApiUrl + routes.all}/${searchType}/${searchItem}`)
}
