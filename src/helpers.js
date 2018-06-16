export const clamp = (min, max, v) =>
    v < min
    ? min
    : v > max
    ? max
    : v

export const always = x => () => x

export const range = (n, v=0) => Array.from({length: n}, always(v))

export default {
    always,
    clamp,
    range
}
