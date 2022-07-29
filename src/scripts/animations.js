const rotateCoords = {
  0: { a: 1, b: 0, c: 0, d: 1 },
  15: { a: 0.97, b: 0.26, c: -0.26, d: 0.97 },
  90: { a: 0, b: 1, c: -1, d: 0 },
  180: { a: -1, b: 0, c: -0, d: -1 },
  270: { a: 0, b: -1, c: 1, d: 0 },
  345: { a: 0.97, b: -0.26, c: 0.26, d: 0.97 },
};

const getTier = (posY) => {
  if (posY < 20) {
    //high
    return 0;
  } else if (posY > 24) {
    //low
    return 2;
  } else {
    //middle
    return 1;
  }
};

export const innerParticleStatus = {
  fill: "#ffffff",
  fillOpacity: 0.35,
  stroke: "#ffffff",
  strokeOpacity: 0.103535,
};

export const outterParticleStatus = {
  fill: "rgb(255, 228, 10)",
  fillOpacity: 1,
  stroke: "rgb(143, 143, 0)",
  strokeOpacity: 0.63253,
};

const rotate = (matrix, degrees) => {
  if (rotateCoords.hasOwnProperty(degrees)) {
    let coords = rotateCoords[degrees];
    return Object.assign(matrix, coords);
  } else {
    console.warn(
      `The informed number '${degrees}' is not part of mapped Coordinates`
    );
    console.dir(rotateCoords);
    return matrix;
  }
};

const scale = (matrix, scX, scY) => {
  let scaleObj = { a: matrix.a * scX, d: matrix.d * scY };
  return Object.assign(matrix, scaleObj);
};

const translate = (matrix, trX, trY) => {
  let translateObj = { e: matrix.e + trX, f: matrix.f + trY };
  return Object.assign(matrix, translateObj);
};

const Animation = {
  getTier,
  rotate,
  scale,
  translate,
};

export default Animation;
