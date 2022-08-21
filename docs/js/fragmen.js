const VS300 = `#version 300 es
precision highp float;

in vec3 position;
void main(void){
    gl_Position = vec4(position, 1.0);
}`;

const FS300 = `#version 300 es
precision highp float;

//uniform float time;
//uniform vec2 resolution;
//uniform vec2 mouse;

out vec4 outColor;

void main() {
  //vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  vec2 uv = gl_FragCoord.xy / resolution.xy;

  vec3 colors = vec3(uv, abs(sin(time)));
  outColor = vec4(colors, 1.0);
}`;

const myCanvas = document.createElement('canvas');

export class Fragmen {
  constructor() {
    this.cnavas = null;
    this.gl = null;
    /**
     * 転写用シェーダープログラム
     * @type {object}
     */
    this.postProgram = null;
    this.init();
  }
  init() {
    const opt = { alpha: false, preserveDrawingBuffer: true };
    this.gl = this.cnavas.getContext('webgl2', opt);
  }
}
