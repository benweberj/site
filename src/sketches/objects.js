export class Ball {
   constructor(p, x, y, rate = .1, size = 10, fluidity=3, sino=true, attractedToMouse=true) {
      this.p = p;
      this.pos = p.createVector(x, y);
      this.rate = rate;
      this.size = size;
      this.fluidity = fluidity;
      this.sino = sino;
      this.mouse = attractedToMouse;

      this.vels = {
         'up': p.createVector(),
         'down': p.createVector(),
         'left': p.createVector(),
         'right': p.createVector()
      }
      this.accs = {
         'up': p.createVector(0, -rate),
         'down': p.createVector(0, rate),
         'left': p.createVector(-rate, 0),
         'right': p.createVector(rate, 0)
      }
   }

   move() {
      const { vels, accs, fluidity, pos, p } = this;
      let dirCodes = [87, 83, 65, 68];
      let dirs = ['up', 'down', 'left', 'right'];

      for (let i = 0; i < dirs.length; i++) {
         let dir = dirs[i];
         if (p.keyIsDown(dirCodes[i])) {
            vels[dir].add(accs[dir]);
         } else if (vels[dir].mag() > 0) {
            vels[dir].sub(accs[dir]);
            vels[dir].limit(fluidity);
         }
      }

      this.ensureBounds();

      // sum em up and update position
      for (let i = 0; i < dirs.length; i++) {
         pos.add(vels[dirs[i]]);
      }
   }

   ensureBounds() {
      const { pos, size, p } = this;
      if (pos.x < size / 2) pos.x = size / 2;
      if (pos.x > p.width - size / 2) pos.x = p.width - size / 2;
      if (pos.y < size / 2) pos.y = size / 2;
      if (pos.y > p.height - size / 2) pos.y = p.height - size / 2;
   }

   // convert your directional velocity array into its cum vector
   velocity() {
      let velocity = this.p.createVector();
      for (let vel in this.vels) {
         velocity.add(this.vels[vel]);
      }
      return velocity;
   }

   draw() {
      const { p, pos, size, sino, mouse } = this
      p.fill('#000');
      p.noStroke();
      p.ellipse(pos.x, pos.y, 3, 3);

      // draw the tangent line
      // const vel = this.velocity();
      // let theta = vel.x > 0 ? Math.atan(vel.y / vel.x) : 0
      // console.log(theta);


      // p.strokeWeight(1);
      // p.stroke(100);
      
      // if (vel.x == 0 && vel.y == 0) {
      //    p.line(pos.x - 999, pos.y, pos.x+999, pos.y)
      // } else {
      //    p.stroke(255, 0, 0)
      //    let pt = vel.copy().mult(-99).add(pos)
      //    let pt2 = vel.copy().mult(99).add(pos)
      //    p.line(pt.x, pt.y, pt2.x, pt2.y)

      //    p.stroke(0,0,255)
      //    pt = p.createVector(-vel.y, -vel.x).mult(-99).add(pos)
      //    pt2 = p.createVector(-vel.y, -vel.x).mult(99).add(pos)
      //    p.line(pt.x, pt.y, pt2.x, pt2.y)
      // }
   }
}