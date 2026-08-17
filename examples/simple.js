import { getAll, searchStations } from "../dist/index.js"

const podcasts = await searchStations("bytag", "podcast")
console.log(podcasts)

const availableCountries = await getAll("countries")
console.log(availableCountries)