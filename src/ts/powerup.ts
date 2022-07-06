import * as PIXI from 'pixi.js'
import { Game } from './game'
import Matter from 'matter-js'
import soundFile from 'url:../sound/powerup.mp3'

export class Powerup extends PIXI.Sprite {
sound:HTMLAudioElement
rigidBody: Matter.Body

    constructor(game: Game, texture:PIXI.Texture, x: number, y: number) {
        super(texture)
        const playerOptions: Matter.IBodyDefinition = {
            label: "powerup"
        }
this.scale.set(0.1)
        this.rigidBody = Matter.Bodies.rectangle(200, 200, 55, 100, playerOptions)
        Matter.Composite.add(game.engine.world, this.rigidBody)
        this.anchor.set(0.5)
        this.x = x
        this.y = y
    }

    public update(delta: number): void {
        this.x = this.rigidBody.position.x
        this.y = this.rigidBody.position.y
        
    }
    public beforeUnload() {
        this.sound = new Audio(soundFile)
        this.sound.play()
    }




}