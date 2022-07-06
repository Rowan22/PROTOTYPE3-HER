import * as PIXI from 'pixi.js'
import { Player } from './player'
import Matter from 'matter-js'
import PlayerImage from "../images/player.png"
import powerupimg from "../images/frikandelbroodje.png"
import { Powerup } from './powerup'

export class Game {
private player: Player
private powerup: Powerup
public pixi: PIXI.Application
public engine: Matter.Engine
private elements: (Powerup | Player)[] = []



    constructor() {
        const container = document.getElementById("container")!
            this.pixi = new PIXI.Application({ width: 900, height: 512 })
            container.appendChild(this.pixi.view)
            this.engine = Matter.Engine.create()
            this.engine.world.gravity.y = 0;
            Matter.Events.on(this.engine, 'collisionStart', (event) => this.onCollision(event))
        this.pixi.loader
                .add('player', PlayerImage)
                .add('frikandelbroodje', powerupimg)


            this.pixi.loader.load(() => this.loadCompleted())

    }

    public loadCompleted() {
      this.player = new Player(this,this.pixi.loader.resources["player"].texture!, 500, 500)
      this.pixi.stage.addChild(this.player)
      this.elements.push(this.player)

      this.powerup = new Powerup(this,this.pixi.loader.resources["frikandelbroodje"].texture!, 600, 500)

      this.pixi.stage.addChild(this.powerup)
      this.elements.push(this.powerup)


        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    private update(delta: number) {
        Matter.Engine.update(this.engine, 1000 / 60)
        for (let el of this.elements) {
            el.update(delta)
        }
    }

    private onCollision(event: Matter.IEventCollision<Matter.Engine>) {
        let collision = event.pairs[0]
        let [bodyA, bodyB] = [collision.bodyA, collision.bodyB]
       
        if (bodyA.label === "Player" && bodyB.label === "powerup") {
            let element = this.findSpriteWithRigidbody(bodyB)
            if (element) this.removeElement(element)
        }

    }

    private findSpriteWithRigidbody(rb: Matter.Body) {
        return this.elements.find((element) => element.rigidBody === rb)
    }

    private removeElement(element: Powerup | Player) {
        element.beforeUnload()
        Matter.Composite.remove(this.engine.world, element.rigidBody)                           
        this.pixi.stage.removeChild(element)                                                    
        this.elements = this.elements.filter((el: Powerup | Player) => el != element)   
    }

}

