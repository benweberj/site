
export const particleMeshInfo = {
  name: "Paricle Mesh",
  description: "Yeah, its a particle mesh",
  settings: {
    
  },
};

export default (p) => {
  const { settings: s } = starfieldInfo;
  let canvas; // p5 canvas object
  let starfield = [];
  let afterTrail;
  let starSize;
  let starCount;

  const addStar = () => {
     let r = p.random(150, 255);
     let g = p.random(150, 255);
     let b = p.random(150, 255);
     starfield.push(new Star([r, g, b], p, starSize));
  }

  p.setup = () => {
     canvas = p.createCanvas(500, 500);
     afterTrail = s.afterTrail.value;
     starSize = s.starSize.value;
     starCount = s.starCount.value;

     starfield = [];
     for (let i = 0; i < starCount; i++) addStar();

  };

  p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
     const { settings: os } = starfieldInfo
     const { settings: s } = newProps;
     if (s.starSize != starSize) {
        starSize = s.starSize.value || os.starSize.value;
        starfield.forEach(star => star.setSize(starSize))
     }
     afterTrail = s.afterTrail.value || os.afterTrail.value;

     let newSC = s.starCount.value || os.starCount.value;
     console.log(`old: ${starCount}, new: ${newSC}`)
     if (starCount != newSC) {
        if (newSC < starCount) {
           for (let i = 0; i < (starCount-newSC); i++) starfield.pop();
           // starfield.slice(-(starCount-newSC))
        } else {
           for (let i = 0; i < (newSC-starCount); i++) addStar();
        }
     }
     starCount = newSC

     if (newProps.name != starfieldInfo.name) p.remove()
  };

  p.keyPressed = (e) => { };

  p.draw = () => {
     p.background(0, 5000/afterTrail);
     starfield.forEach(star => {
        star.move()
        star.show();
     })
  };
};
