import { generateParameters, updateParameters } from "./utils";

export const matrixInfo = {
   name: "Matrix",
   description: "...",
   settings: {
      glyphSize: {
         value: 20,
         name: 'Glyph size',
         description: '...',
         step: 10,
      },
      color: {
         value: '#32ff96',
         name: 'Color',
         description: '...',
         color: true,
      },
      headColor: {
         value: '#dfffdc',
         name: 'Head color',
         description: '...',
         color: true,
      },
      highlightHead: {
         value: true,
         name: 'Highlight head',
         description: '...',
      }
   }
}


export default (p) => {
   let streams = [];
   let canvas;

   const defaultParams = generateParameters(matrixInfo.settings);
   let params = JSON.parse(JSON.stringify(defaultParams));

   // Creates a katakana character that rains down the screen
   class Glyph {
      constructor(x, y, speed, interval, head, size) {
         this.x = x;
         this.y = y;
         this.speed = speed;
         this.interval = interval;
         this.head = head;
         this.size = size;
   
         this.char = "_";
         this.setChar();
      }
   
      setChar() {
         let letter = p.random(0, 90);
         this.char = String.fromCharCode(0x30a0 + letter);
      }
   
      render() {
         p.fill((this.head && params.highlightHead) ? params.headColor : params.color);
         p.textSize(this.size);
         p.text(this.char, this.x, this.y);
      }
   
      rain() {
         if (this.y >= p.height) this.y = 0;
         this.y += this.speed;
         if (Math.abs(this.y % this.interval) === 0) this.setChar();
         this.render();
      }
   }

   // Creates a column of glyphs
   class Stream {
      constructor(x, size) {
         this.x = x;
         this.glyphs = [];

         let speed = p.round(p.random(2, 6));
         let count = p.round(p.random(10, (p.height / size) * 0.5));
         let stagger = p.round(p.random(100, 1000));
   
         for (let i = 0; i < count; i++) {
            let interval = p.round(p.random(50, 100));
            let head = i === 0 && p.random() < 0.5;
            let glyph = new Glyph(
               this.x,
               -1 * size * i - stagger,
               speed,
               interval,
               head,
               size,
            );
            this.glyphs.push(glyph);
         }
      }
   
      rain() {
         this.glyphs.forEach((glyph) => glyph.rain());
      }
   }

   // when the params change, you pretty much just need to recreate all the streams
   // so, no need to implement setColor() or setHightlightHead() or anything for each Stream
   const resetStreams = () => {
      streams = [];
      for (let i = 0; i < p.width; i += params.glyphSize) {
         streams.push(new Stream(i, params.glyphSize));
      }
   }

   p.setup = () => {
      canvas = p.createCanvas(500, 500);
      p.background(0);
      resetStreams();
   }

   p.draw = () => {
      p.background(0, 100);
      streams.forEach(stream => stream.rain());
   }

   p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
      const newParams = generateParameters(newProps.settings);
      let reset = false;
      if (newParams.glyphSize != params.glyphSize) reset = true;
      params = updateParameters(newParams, params, defaultParams);
      
      if (reset) resetStreams();
   }
}
