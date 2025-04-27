// BlockyAnimal.js 

let canvas, gl;
let a_Position, u_FragColor, u_ModelMatrix, u_GlobalRotateMatrix;
let g_globalAngle = 0;
let g_tailAngle = 0;
let g_legAngle = 0;
let g_animation = false;
let g_seconds = performance.now() / 1000;

function setupWebGL() {
  canvas = document.getElementById('webgl');
  gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
  if (!gl) throw new Error("WebGL not supported");
  gl.enable(gl.DEPTH_TEST);
}

var VSHADER_SOURCE = `
attribute vec4 a_Position;
uniform mat4 u_ModelMatrix;
uniform mat4 u_GlobalRotateMatrix;
void main() {
 gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
}`;

var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
void main() {
 gl_FragColor = u_FragColor;
}`;

function connectGLSL() {
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) throw new Error("Shader init failed");
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
}

function renderScene() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const globalRot = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRot.elements);

  let secondsNow = performance.now() / 1000;
  if (g_animation) {
    g_tailAngle = Math.sin(secondsNow * 5) * 30;
  }


  let body = new Cube();
  body.color = [0.7, 0.7, 0.7, 1.0];
  body.matrix.translate(-0.25, -0.3, 0);
  body.matrix.scale(0.5, 0.25, 0.25);
  body.render();

  let head = new Cube();
  head.color = [0.7, 0.7, 0.7, 1.0];
  head.matrix.set(body.matrix);
  head.matrix.translate(1.0, 0.5, 0);
  head.matrix.scale(0.3, 0.3, 0.3);
  head.render();

  let leftEar = new Cube();
  leftEar.color = [1.0, 0.7, 0.7, 1.0];
  leftEar.matrix.set(head.matrix);
  leftEar.matrix.translate(0.0, 1.0, 0.2);
  leftEar.matrix.scale(0.3, 0.3, 0.3);
  leftEar.render();

  let rightEar = new Cube();
  rightEar.color = [1.0, 0.7, 0.7, 1.0];
  rightEar.matrix.set(head.matrix);
  rightEar.matrix.translate(0.0, 1.0, -0.2);
  rightEar.matrix.scale(0.3, 0.3, 0.3);
  rightEar.render();

  let leftEye = new Cube();
  leftEye.color = [0, 0, 0, 1.0];
  leftEye.matrix.set(head.matrix);
  leftEye.matrix.translate(0.2, 0.4, 0.2);
  leftEye.matrix.scale(0.25, 0.25, 0.25);
  leftEye.render();

  let rightEye = new Cube();
  rightEye.color = [0, 0, 0, 1.0];
  rightEye.matrix.set(head.matrix);
  rightEye.matrix.translate(0.2, 0.4, -0.2);
  rightEye.matrix.scale(0.25, 0.25, 0.25);
  rightEye.render();

  let nose = new Cube();
  nose.color = [1.0, 0.5, 0.5, 1.0];
  nose.matrix.set(head.matrix);
  nose.matrix.translate(0.7, 0.15, 0);
  nose.matrix.scale(0.2, 0.2, 0.2);
  nose.render();

  let tail = new Cube();
  tail.color = [1.0, 0.7, 0.7, 1.0];
  tail.matrix.set(body.matrix);
  tail.matrix.translate(-0.25, 0.05, 0);
  tail.matrix.rotate(g_tailAngle, 0, 1, 0);
  tail.matrix.scale(0.05, 0.05, 0.8);
  tail.render();

  let frontLeg = new Cube();
  frontLeg.color = [0.7, 0.7, 0.7, 1.0];
  frontLeg.matrix.set(body.matrix);
  frontLeg.matrix.translate(0.5, -0.4, 0.1);
  frontLeg.matrix.rotate(g_legAngle, 1, 0, 0);
  frontLeg.matrix.scale(0.08, 0.1, 0.08);
  frontLeg.render();

  let backLeg = new Cube();
  backLeg.color = [0.7, 0.7, 0.7, 1.0];
  backLeg.matrix.set(body.matrix);
  backLeg.matrix.translate(0.1, -0.4, 0.1);
  backLeg.matrix.rotate(g_legAngle, 1, 0, 0);
  backLeg.matrix.scale(0.08, 0.1, 0.08);
  backLeg.render();
}

function tick() {
  g_seconds = performance.now() / 1000;
  renderScene();
  requestAnimationFrame(tick);
}

function main() {
  setupWebGL();
  connectGLSL();

  document.getElementById('angleSlide').oninput = e => { g_globalAngle = e.target.value; };
  document.getElementById('tailSlide').oninput = e => { g_tailAngle = e.target.value; };
  document.getElementById('legSlide').oninput = e => { g_legAngle = e.target.value; };
  document.getElementById('animateButton').onclick = () => { g_animation = !g_animation; };

  gl.clearColor(0.9, 0.9, 1.0, 1.0);
  tick();
}

function main() {
  setupWebGL();
  connectGLSL();

  fpsCounter = new FPSCounter(document.getElementById('fpsCanvas'));
  fpsCounter.start();

  document.getElementById('angleSlide').oninput = e => { g_globalAngle = e.target.value; };
  document.getElementById('tailSlide').oninput = e => { g_tailAngle = e.target.value; };
  document.getElementById('legSlide').oninput = e => { g_legAngle = e.target.value; };
  document.getElementById('animateButton').onclick = () => { g_animation = !g_animation; };

  gl.clearColor(0.9, 0.9, 1.0, 1.0);
  tick();
}


function drawTriangle3D(vertices) {
  const n = 3;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 3);
}