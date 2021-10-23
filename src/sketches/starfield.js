/**
 * Hyper-speed starfield illusion
 *
 * The board is represented in terms of the tile index, not pixel pos
 *    - (snake[n].x|y < cellSize)
 */

import { generateParameters, updateParameters } from "./utils";

// this is imported into the Sketch manager component and it will update the sketch with its own controlled values
export const starfieldInfo = {
   name: "Starfield",
   description: "Yeah, its a starfield",
   settings: {
      afterTrail: {
         value: 100,
         name: "Aftertrail",
         description: "...",
         step: 25,
      },
      starSize: {
         value: 10,
         name: "Star size",
      },
      starCount: {
         value: 300,
         name: "Star count",
         step: 20,
      },
   },
};

export default (p) => {
   //  const { settings: s } = starfieldInfo;
   let canvas; // p5 canvas object
   let starfield = [];

   const defaultParams = generateParameters(starfieldInfo.settings);
   let params = JSON.parse(JSON.stringify(defaultParams));
   //  let afterTrail;
   //  let starSize;
   //  let starCount;

   const addStar = () => {
      let r = p.random(150, 255);
      let g = p.random(150, 255);
      let b = p.random(150, 255);
      starfield.push(new Star([r, g, b], p, params.starSize));
   };

   p.setup = () => {
      canvas = p.createCanvas(500, 500);
      starfield = [];
      for (let i = 0; i < params.starCount; i++) addStar();
   };

   p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
      const newParams = generateParameters(newProps.settings);
      let countDiff = newParams.starCount - params.starCount
      if (newParams.starSize != params.starSize) starfield.forEach(star => star.setSize(newParams.starSize))
      
      // not sure what the fuck is happening witht this. Its even showing that the counts are in fact changing
      console.log(countDiff)
      if (countDiff != 0) {
         for (let i = 0; i < countDiff; i++) countDiff < 0 ? starfield.pop() : addStar();
      }

      params = updateParameters(newParams, params, defaultParams);
   };

   p.keyPressed = (e) => {};

   p.draw = () => {
      p.background(0, 5000 / params.afterTrail);
      starfield.forEach((star) => {
         star.move();
         star.show();
      });
   };
};

class Star {
   constructor(color, p, size = 1) {
      this.p = p;
      this.spawnStar();
      this.color = color;
      this.size = size;
   }

   move() {
      this.prev = this.pos.copy();
      this.path.mult(1.1);
      this.pos.add(this.path);
      this.age += 0.15;

      if (this.dead()) this.spawnStar();
   }

   show() {
      this.p.strokeWeight(this.age * this.size * 0.1);
      this.p.stroke(this.color);
      this.p.line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
   }

   setSize(s) {
      this.size = s;
   }

   dead() {
      return (
         this.pos.x > this.p.width + this.age ||
         this.pos.x < -this.age ||
         this.pos.y < -this.age ||
         this.pos.y > this.p.height + this.age
      );
   }

   spawnStar() {
      this.pos = this.p.createVector(
         this.p.random(this.p.width),
         this.p.random(this.p.height)
      );
      this.prev = this.pos.copy();
      this.path = this.p.constructor.Vector.sub(
         this.pos,
         this.p.createVector(this.p.mouseX, this.p.mouseY)
      ).normalize();
      this.age = 0;
   }
}
