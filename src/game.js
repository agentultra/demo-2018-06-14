import {deg2rad} from './trig.js'
import {btn} from './controls.js'
import {clamp} from './helpers.js'
import plyr from './player.js'
import {stageW, stageH} from './constants.js'

const canvas = document.getElementById('stage')
, stage = canvas.getContext('2d')
, fps = 60
, state = {}

let currentTime = 0
, lastTime = (new Date()).getTime()
, dt = 0
, interval = 1000 / fps

canvas.width = stageW
canvas.height = stageH

const clr = () => {
    stage.fillStyle = 'black'
    stage.fillRect(0, 0, stageW, stageH)
}

const init = () => Object.assign(state, {
    player: plyr.Player(stageW / 2, stageH / 2)
})

const update = dt => {
    const {player} = state
    plyr.update(player)
}

const render = () => {
    const {player} = state

    plyr.draw(stage, player)
}

const loop = () => {
    window.requestAnimationFrame(loop)
    currentTime = (new Date()).getTime()
    dt = currentTime - lastTime

    update(dt)

    if (dt > interval) {
        clr()
        render()
        lastTime = currentTime - (dt % interval)
    }
}

init()
window.requestAnimationFrame(loop)
