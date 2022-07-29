#version 300 es
precision highp float;

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

out vec4 fragmentColor;



void main(void) {
  //vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  
  vec2 uv = gl_FragCoord.xy / resolution;
  
  //vec4 outColor = vec4(uv, 0.5, 1.0);
  vec4 outColor = vec4(uv, pow(sin(time), 2.0), 1.0);
  fragmentColor = outColor;
}

