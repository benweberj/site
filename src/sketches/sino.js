import { generateParameters, updateParameters } from "./utils";
import { Ball } from './objects'

export const sinoInfo = {
   name: "Sino",
   description: "Yeah, its sino",
   settings: {
      inverselyProportionalAmplitude: {
         value: true,
         name: "Inversely-proportional amplitude",
         description: "...",
      },
   },
};

export default p => {
   let canvas;
   let ball;

   const defaultParams = generateParameters(sinoInfo.settings);
   let params = JSON.parse(JSON.stringify(defaultParams)); // simple deep copy

   const drawVelocities = () => {
      p.noStroke();
      p.fill(100);
      p.rect(p.width / 2, p.height - ball.vels.up.mag() * 20, 10, ball.vels.up.mag() * 20);
      p.rect(0, p.height / 2, ball.vels.right.mag() * 20, 10);
      p.rect(p.width - ball.vels.left.mag() * 20, p.height / 2, ball.vels.left.mag() * 20, 10);
      p.rect(p.width / 2, 0, 10, ball.vels.down.mag() * 20);
  }

   p.setup = () => {
      p.noStroke();
      p.angleMode(p.RADIANS);
      canvas = p.createCanvas(500, 500);
      ball = new Ball(p, p.width/2, p.height/2);
   };

   // p.mouseClicked = () => p.background(255);

   p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
      const newParams = generateParameters(newProps.settings);
      params = updateParameters(newParams, params, defaultParams);
   };

   p.draw = () => {
      p.background(255, 30);
      ball.draw();
      ball.move();
      // drawVelocities();

      
      // const amplitude = 30;
      // const val = amplitude * Math.sin(p.frameCount/5);
      
      // let pt = ball.pos.copy();
      // const vel = ball.velocity();
      // let perp = p.createVector(-vel.y, -vel.x)
      // if (perp.mag() == 0) perp = p.createVector(0,1) 
      // perp.setMag(val);
      // pt.add(perp);
      // p.stroke(0)
      // p.strokeWeight(1)
      // p.line(ball.pos.x, ball.pos.y, pt.x, pt.y)

      // p.fill(0);
      // p.ellipse(pt.x, pt.y, 3, 3)      
   };
};
