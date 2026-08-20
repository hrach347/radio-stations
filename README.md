# Radio Stations 📡

Discover **radio stations** with a simple, developer-friendly JavaScript API.

**GitHub: https://github.com/hrach347/radio-stations**

## Install

```bash
npm install radio-stations
```

## Examples

```js
import { getAll, searchStations } from "radio-stations"

const podcasts = await searchStations("bytag", "podcast")
console.log(podcasts)

const inArmenia = await searchStations("bycountrycodeexact", "AM")
console.log(inArmenia)

const availableCountries = await getAll("countries")
console.log(availableCountries)
```
## Search Types

Use `searchStations(type, value)` to search stations:

```js
searchStations("byname", "BBC")               // Name
searchStations("bycountry", "Armenia")        // Country
searchStations("bycountrycodeexact", "AM")    // Country code
searchStations("bylanguage", "English")       // Language
searchStations("bycodec", "MP3")              // Codec
searchStations("bytag", "rock")               // Tag
```

## Filters

Use `getAll(filter)` to retrieve available values for a category:

```js
getAll("countries")   // All countries
getAll("languages")   // All languages
getAll("states")      // All states
getAll("codecs")      // All codecs
getAll("tags")        // All tags
```

For example, discover available tags and find something to listen to:

```js
const tags = await getAll("tags")
const podcasts = await searchStations("bytag", "podcast")
```

---

# 🎵 Play a Radio Stream

Play a live `radio stream` directly from Node.js using **FFmpeg**.

> **Linux/macOS only**

### Requirements

Install FFmpeg

```bash
sudo apt install ffmpeg
```

### Usage
```js
import { playStream } from "radio-stations"

const player = await playStream("https://cast.thiff.com/proxy/laarmeni?mp=/stream")
```
The stream starts playing immediately through `ffplay`.
### Logging

Pass `true` as the second argument to enable FFmpeg output:
```js
const player = await playStream("https://cast.thiff.com/proxy/laarmeni?mp=/stream",true)
```
### Stop Playback

```js
player.stop()
```

--- 

### The Best **radio-station** discovery experience for us "developers"

* **Simple API** - Easy to use methods for flexible discovery
* **TypeScript support** - Fully typed API
* **Promise-based** - Modern async/await support

## License

MIT
