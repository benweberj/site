
// import React, { useEffect, useRef } from 'react';
// import p5 from 'p5';
// import pixelData from './pixel_data.json';

// const Sketch = () => {
//   const sketchRef = useRef();

//   useEffect(() => {
//     const sketch = (p) => {
//       let cells = [];
//       let scrambled = false;

//       const scrambleEasing = 0.2; // slower speed for scrambling
//       const settleEasing = 0.2; // faster speed for settling
//       const tolerance = 0.1; // tolerance for snapping to target position

//       class Cell {
//         constructor(x, y, color) {
//           this.startX = x;
//           this.startY = y;
//           this.targetX = x;
//           this.targetY = y;
//           this.currentX = x;
//           this.currentY = y;
//           this.color = color;
//         }

//         update() {
//           const easing = scrambled ? scrambleEasing : settleEasing;

//           if (Math.abs(this.targetX - this.currentX) < tolerance) {
//             this.currentX = this.targetX;
//           } else {
//             this.currentX += (this.targetX - this.currentX) * easing;
//           }

//           if (Math.abs(this.targetY - this.currentY) < tolerance) {
//             this.currentY = this.targetY;
//           } else {
//             this.currentY += (this.targetY - this.currentY) * easing;
//           }
//         }

//         draw() {
//           p.fill(this.color);
//           p.noStroke();
//           p.rect(this.currentX, this.currentY, 12, 12);
//         }

//         scramble() {
//           if (scrambled) {
//             this.targetX = this.startX + p.random(-100, 100);
//             this.targetY = this.startY + p.random(-100, 100);
//           } else {
//             this.targetX = this.startX;
//             this.targetY = this.startY;
//           }
//         }
//       }

//       p.setup = () => {
//         p.createCanvas(800, 800);
//         cells = pixelData.map(pixel => new Cell(pixel.x, pixel.y, pixel.rgba));
//         p.noLoop();
//       };

//       p.draw = () => {
//         // p.background(0, 0, 0, 60);
//         p.clear()
//         let allSnapped = true;
//         cells.forEach(cell => {
//           cell.update();
//           cell.draw();
//           if (cell.currentX !== cell.targetX || cell.currentY !== cell.targetY) {
//             allSnapped = false;
//           }
//         });
//         if (allSnapped) {
//           p.noLoop();
//         }
//       };

//       const toggleScramble = () => {
//         scrambled = !scrambled;
//         cells.forEach(cell => cell.scramble());
//         p.loop();
//       };

//       p.mousePressed = () => {
//         toggleScramble();
//       };
//     };

//     const p5Instance = new p5(sketch, sketchRef.current);
//     return () => {
//       p5Instance.remove();
//     };
//   }, []);

//   return <div ref={sketchRef}></div>;
// };

// export default Sketch;



import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import pixelData from './pixel_data.json';

const REPEL = 100

const Sketch = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let cells = [];
      let scrambled = false;

      const scrambleEasing = 0.2; // Faster speed for scrambling
      const settleEasing = 0.05; // Slower speed for settling
      const tolerance = 0.1; // Tolerance for snapping to target position
      let repelStrength = REPEL/10; // Strength of repulsion force
      const damping = 0.8; // Damping factor for smooth movement
      const maxForce = 1000000

      class Cell {
        constructor(x, y, color) {
          this.startX = x;
          this.startY = y;
          this.newHomeX = x;
          this.newHomeY = y;
          this.currentX = x;
          this.currentY = y;
          this.vx = 0;
          this.vy = 0;
          this.color = color;
        }

        update() {
          const easing = scrambled ? scrambleEasing : settleEasing;

          if (Math.abs(this.newHomeX - this.currentX) < tolerance) {
            this.currentX = this.newHomeX;
          } else {
            this.currentX += (this.newHomeX - this.currentX) * easing;
          }

          if (Math.abs(this.newHomeY - this.currentY) < tolerance) {
            this.currentY = this.newHomeY;
          } else {
            this.currentY += (this.newHomeY - this.currentY) * easing;
          }
        }

        applyForce(fx, fy) {
          this.vx += fx;
          this.vy += fy;
        }

        updatePhysics() {
          this.vx *= damping;
          this.vy *= damping;
          this.currentX += this.vx;
          this.currentY += this.vy;

          // Ensure they seek their new home
          const dx = this.newHomeX - this.currentX;
          const dy = this.newHomeY - this.currentY;
          this.vx += dx * settleEasing;
          this.vy += dy * settleEasing;
        }

        draw() {
          p.fill(this.color);
          p.noStroke();
          p.rect(this.currentX, this.currentY, 12, 12);
        }

        scramble() {
          if (scrambled) {
            this.newHomeX = this.startX + p.random(-100, 100);
            this.newHomeY = this.startY + p.random(-100, 100);
          } else {
            this.newHomeX = this.startX;
            this.newHomeY = this.startY;
          }
        }
      }

      p.setup = () => {
        p.createCanvas(800, 800);
        cells = pixelData.map(pixel => new Cell(pixel.x, pixel.y, pixel.rgba));
        p.noLoop();
      };

      p.draw = () => {
        p.clear()

        let allSnapped = true;

        // if (scrambled || true) {
          cells.forEach(cell => {
            const dx = p.mouseX - cell.currentX;
            const dy = p.mouseY - cell.currentY;
            const distSq = dx * dx + dy * dy;
            const force = Math.min(maxForce, repelStrength / Math.sqrt(distSq));
            const angle = Math.atan2(dy, dx);
            const fx = -force * Math.cos(angle);
            const fy = -force * Math.sin(angle);
            cell.applyForce(fx, fy);
            cell.updatePhysics();
          });
        // } else {
        //   cells.forEach(cell => cell.update());
        // }

        cells.forEach(cell => {
          cell.draw();
          if (cell.currentX !== cell.newHomeX || cell.currentY !== cell.newHomeY) {
            allSnapped = false;
          }
        });

        if (allSnapped && !scrambled) {
          p.noLoop();
        }
      };

      const toggleScramble = () => {
          scrambled = !scrambled;
          repelStrength = scrambled ? REPEL : REPEL/10
        cells.forEach(cell => cell.scramble());
        p.loop();
      };

      p.mousePressed = () => {
        toggleScramble();
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);
    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default Sketch;
