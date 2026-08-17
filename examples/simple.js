import { getAll, searchStations } from "../dist/index.js"

const podcasts = await searchStations("bytag", "podcast")
console.log(podcasts)

const inArmenia = await searchStations("bycountrycodeexact", "AM")
console.log(inArmenia)

const availableCountries = await getAll("countries")
console.log(availableCountries)