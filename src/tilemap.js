import {range} from './helpers.js'

export const tileTypes = {
    road: 0,
    sidewalk: 1,
    building: 2
}

export const TileMap = (w, h) => ({
    w, h, tiles: range(w * h, tileTypes.road)
})

export const get = (tileMap, x, y) => tileMap[y * tileMap.w + x]

export const set = (tileMap, x, y, v) => {
    tileMap[y * tileMap.w + x] = v
}

export default {
    tileTypes,
    TileMap,
    get,
    set
}
