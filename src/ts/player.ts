import * as PIXI from 'pixi.js'
import { Game } from './game'
import Matter from 'matter-js'

export class Player extends PIXI.Sprite {
xspeed= 0
yspeed= 0
rigidBody: Matter.Body

    constructor(game: Game, texture:PIXI.Texture, x: number, y: number) {
        super(texture)
        const playerOptions: Matter.IBodyDefinition = {
            label: "Player"
        }

        this.rigidBody = Matter.Bodies.rectangle(600, 230, 55, 100, playerOptions)
        this.scale.set(2)
        Matter.Composite.add(game.engine.world, this.rigidBody)
        this.anchor.set(0.5)
        this.x = x
        this.y = y
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public update(delta: number): void {
        if (this.xspeed != 0) {
            Matter.Body.setVelocity(this.rigidBody, { x: this.xspeed, y: this.rigidBody.velocity.y })

        }
        this.x += this.xspeed
        this.y += this.yspeed
        this.x = this.rigidBody.position.x
        this.y = this.rigidBody.position.y
        
    }
    public beforeUnload() {
    
    }


    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -4             
                 break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 4
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }

}
}