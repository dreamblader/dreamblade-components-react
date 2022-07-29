import Animation from "./animations";
import { emptyMatrix, particleFrames, moonFrames } from "./utils";

const DEBUG = true;

const setTransformOrigin = (element, { x, y, width, height }) => {
  const anchorX = x + width / 2;
  const anchorY = y + height / 2;
  element.style.transformOrigin = `${anchorX}px ${anchorY}px`;
};

const getStartY = (posX) => {
  const guideLineEquation = (9 * posX - 534) / 17;
  return guideLineEquation;
};

const particleAnimate = (element) => {
  const bb = element.getBBox();
  const matrix = emptyMatrix();
  const startY = getStartY(bb.x) - bb.y;
  const tier = Animation.getTier(bb.y + bb.height);
  const moveY = Math.min((-startY * 1.5) / 4, -0.5);
  const duration = 5000;
  const scaleMin = 0.5;

  setTransformOrigin(element, bb);
  element.style.opacity = 0;

  const copyElement = element.cloneNode(false);
  copyElement.id = `${copyElement.id}-copy`;

  const animation = [
    particleFrames(matrix, startY, moveY, scaleMin, tier),
    {
      duration: duration,
      iterations: Infinity,
    },
  ];

  const delay = Math.ceil(duration * (2.5 / animation[0].length));

  setTimeout(() => {
    copyElement.animate(animation[0], animation[1]);
  }, delay);
  element.animate(animation[0], animation[1]);

  document.getElementById("layer3").appendChild(copyElement);

  if (DEBUG) {
    console.log(element);
    console.log(
      `Y:${bb.y} moveY:${moveY} height:${bb.height} tierCalcY:${
        bb.y + bb.height
      } Copy Delay: ${delay}`
    );
    console.log();
  }
};

const moonAnimate = (moon) => {
  const bb = moon.getBBox();
  const matrix = emptyMatrix();

  setTransformOrigin(moon, bb);
  moon.animate(moonFrames(matrix), {
    duration: 5000,
    iterations: Infinity,
  });
};

const textAnimate = (text, shadow, letterNum) => {
  const duration = 150;
  const delay = letterNum * duration;
  const animation = [
    [{ opacity: 0 }, { opacity: 1 }],
    {
      duration: duration,
      iterations: 1,
    },
  ];

  text.style.opacity = 0;
  shadow.style.opacity = 0;

  setTimeout(() => {
    let textAnimation = text.animate(animation[0], animation[1]);
    let shadowAnimation = shadow.animate(animation[0], animation[1]);

    textAnimation.onfinish = () => {
      text.style.opacity = 1;
    };
    shadowAnimation.onfinish = () => {
      shadow.style.opacity = 1;
    };
  }, delay);
};

const run = () => {
  let particles = document.querySelectorAll("#layer3 > *");
  for (let i = 0; i < particles.length; i++) {
    const moonID = "path24680";
    let element = particles[i];
    if (element.id === moonID) {
      moonAnimate(element);
    } else {
      particleAnimate(element);
    }
  }

  let sparkles = document.querySelectorAll("#layer2 > *");
  for (let i = 0; i < sparkles.length; i++) {
    let element = sparkles[i];
    const bb = element.getBBox();
    setTransformOrigin(element, bb);
  }

  let text = document.querySelectorAll("#text863 > *");
  let textShadow = document.querySelectorAll("#text867 > *");

  for (let i = 0; i < text.length; i++) {
    textAnimate(text[i], textShadow[i], i);
  }
};

export default run;
