import { getAll, playStream, prune, searchStations } from "../dist/index.js"


const podcasts = await searchStations("bytag", "podcast")
console.log(podcasts.length)

const inArmenia = await searchStations("bycountrycodeexact", "AM")
console.log(prune(inArmenia))

const availableCountries = await getAll("countries")
console.log(availableCountries.length)

const availableLanguages = await getAll("languages")
console.log(availableLanguages.length)





// NEW FEAUTURE - PLAY LIVE STREAM RADIO AND ANY MP3 STREAM

const stream = await playStream("https://cast.thiff.com/proxy/laarmeni?mp=/stream")
console.log(stream)

const stream2 = await playStream("https://eu.stream4cast.com/proxy/marshallfm/stream", true)
console.log(stream2)