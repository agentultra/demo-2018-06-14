import {deg2rad} from './trig.js'
import {btn} from './controls.js'
import {stageW, stageH} from './constants.js'

export const Player = (x, y) => ({
    x, y,
    w: 20, h: 20,
    dx: 0, dy: 0,
    angle: 90,
    rotSpeed: 3,
    speed: 0,
    friction: 0.05,
    braking: false
})

export const update = player => {
    if (btn('Up') && btn('Left')) {
        player.angle = player.angle - player.rotSpeed <= 0
            ? 360 - (player.angle - player.rotSpeed)
            : player.angle - player.rotSpeed
    } else if (btn('Up') && btn('Right')) {
        player.angle = player.angle + player.rotSpeed >= 360
            ? 0 + ((player.angle + player.rotSpeed) - 360)
            : player.angle + player.rotSpeed
    }

    if (btn('Up')) {
        player.speed = 5
    } else {
        const newSpeed = btn('Down')
              ? player.speed *= 0.8
              : player.speed - (player.speed * player.friction)
        player.speed = newSpeed <= 0.1 ? 0 : newSpeed
    }

    const {x: oldX, y: oldY} = player
    , newX = player.x + (Math.cos(deg2rad(player.angle)) * player.speed)
    , newY = player.y + (Math.sin(deg2rad(player.angle)) * player.speed)
    player.x = newX
    player.y = newY
    if (player.x > stageW + Math.floor(player.w / 2)) {
        player.x = 0 - Math.floor(player.w / 2)
    }
    if (player.x < 0 - Math.floor(player.w / 2)) {
        player.x = stageW + Math.floor(player.w / 2)
    }
    if (player.y > stageH + Math.floor(player.h / 2)) {
        player.y = 0 - Math.floor(player.h / 2)
    }
    if (player.y < 0 - Math.floor(player.h / 2)) {
        player.y = stageH + Math.floor(player.h / 2)
    }
}

export const draw = (stage, player) => {
    stage.save()
    stage.translate(player.x, player.y)
    stage.rotate(deg2rad(player.angle))
    stage.fillStyle = 'yellow'
    stage.fillRect(-Math.floor(player.w / 2),
                   -Math.floor(player.h / 2),
                   player.w,
                   player.h)
    stage.strokeStyle = 'red'
    stage.beginPath()
    stage.moveTo(0, 0)
    stage.lineTo(20, 0)
    stage.stroke()
    stage.restore()
}

export default {
    Player,
    update,
    draw
}
