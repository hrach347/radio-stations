import { getAll, prune, searchStations } from "../dist/index.js"


const podcasts = await searchStations("bytag", "podcast")
console.log(podcasts.length)

const inArmenia = await searchStations("bycountrycodeexact", "AM")
console.log(prune(inArmenia).length)

const availableCountries = await getAll("countries")
console.log(availableCountries.length)

const availableLanguages = await getAll("languages")
console.log(availableLanguages.length)