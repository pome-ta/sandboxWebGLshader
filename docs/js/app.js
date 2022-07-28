'use strict';

let canvasDiv, cxtCanvas;
let gl;
let uniLocation = new Array();

let mouseX = 0.5;
let mouseY = 0.5;
let canvasW, canvasH;

let time = 0.0;
const FPS = 30;
const frameTime = 1 / FPS;
let prevTimestamp = 0;

const vs = './shaders/vertex/vertexMain.js';
const fs = './shaders/fragment/fragmentMain.js';
const vertexPrimitive = await fetchShader(vs);
const fragmentPrimitive = await fetchShader(fs);

async function fetchShader(path) {
  const res = await fetch(path);
  const shaderText = await res.text();
  return shaderText;
}

function createCanvas() {
  document.body.style.backgroundColor = 'dimgray';
  canvasDiv = document.createElement('div');
  cxtCanvas = document.createElement('canvas');
  canvasDiv.style.width = '100%';
  cxtCanvas.style.width = '100%';
  canvasDiv.appendChild(cxtCanvas);
  document.body.appendChild(canvasDiv);
}

function initCanvasSize() {
  const oneSide = Math.min(canvasDiv.clientWidth, canvasDiv.clientHeight);
  //const oneSide = 640
  cxtCanvas.width = oneSide;
  cxtCanvas.height = oneSide;
  canvasW = cxtCanvas.width;
  canvasH = cxtCanvas.height;
}

function initShader() {
  gl = cxtCanvas.getContext('webgl2');
  //gl = cxtCanvas.getContext('webgl');
  const prg = create_program(
    create_shader('vs', vertexPrimitive),
    create_shader('fs', fragmentPrimitive)
  );
  uniLocation[0] = gl.getUniformLocation(prg, 'time');
  uniLocation[1] = gl.getUniformLocation(prg, 'mouse');
  uniLocation[2] = gl.getUniformLocation(prg, 'resolution');

  const position = [
    -1.0, 1.0, 0.0, 1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0,
  ];
  const index = [0, 2, 1, 1, 2, 3];

  const vPosition = create_vbo(position);
  const vIndex = create_ibo(index);
  const vAttLocation = gl.getAttribLocation(prg, 'position');

  gl.bindBuffer(gl.ARRAY_BUFFER, vPosition);
  gl.enableVertexAttribArray(vAttLocation);
  gl.vertexAttribPointer(vAttLocation, 3, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vIndex);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
}

// シェーダを生成する関数
function create_shader(type, text) {
  let shader;
  // scriptタグのtype属性をチェック
  switch (type) {
    // 頂点シェーダの場合
    case 'vs':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
    // フラグメントシェーダの場合
    case 'fs':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    default:
      return;
  }

  // 生成されたシェーダにソースを割り当てる
  gl.shaderSource(shader, text);
  // シェーダをコンパイルする
  gl.compileShader(shader);
  // シェーダが正しくコンパイルされたかチェック
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // 成功していたらシェーダを返して終了
    return shader;
  } else {
    // 失敗していたらエラーログをアラートしコンソールに出力
    // alert(gl.getShaderInfoLog(shader));
    console.log(gl.getShaderInfoLog(shader));
  }
}

// プログラムオブジェクトを生成しシェーダをリンクする関数
function create_program(vs, fs) {
  // プログラムオブジェクトの生成
  const program = gl.createProgram();
  // プログラムオブジェクトにシェーダを割り当てる
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  // シェーダをリンク
  gl.linkProgram(program);
  // シェーダのリンクが正しく行なわれたかチェック
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // 成功していたらプログラムオブジェクトを有効にする
    gl.useProgram(program);
    // プログラムオブジェクトを返して終了
    return program;
  } else {
    // 失敗していたら NULL を返す
    return null;
  }
}

// VBOを生成する関数
function create_vbo(data) {
  // バッファオブジェクトの生成
  const vbo = gl.createBuffer();
  // バッファをバインドする
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  // バッファにデータをセット
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  // バッファのバインドを無効化
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  // 生成した VBO を返して終了
  return vbo;
}

// IBOを生成する関数
function create_ibo(data) {
  // バッファオブジェクトの生成
  const ibo = gl.createBuffer();
  // バッファをバインドする
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  // バッファにデータをセット
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
  // バッファのバインドを無効化
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
  // 生成したIBOを返して終了
  return ibo;
}

function render(timestamp) {
  const elapsed = (timestamp - prevTimestamp) / 1000;
  if (elapsed <= frameTime) {
    requestAnimationFrame(render);
    return;
  }

  time = elapsed;
  // カラーバッファをクリア
  gl.clear(gl.COLOR_BUFFER_BIT);
  // uniform 関連
  gl.uniform1f(uniLocation[0], time);
  gl.uniform2fv(uniLocation[1], [mouseX, mouseY]);
  gl.uniform2fv(uniLocation[2], [canvasW, canvasH]);
  // 描画
  gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  gl.flush();
  // 再帰
  requestAnimationFrame(render);
}

createCanvas();
initCanvasSize();
initShader();
render();
