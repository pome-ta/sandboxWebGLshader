#version 300 es
precision highp float;


// [Flame](https://www.shadertoy.com/view/MdX3zr)
// [ボリュームレイキャスティングとレイマーチング 普通のレイキャスティングとの違い｜ちがい総研｜note](https://note.com/rodz/n/n58348b74074f)

uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

out vec4 fragmentColor;

float noise(vec3 p) { //Thx to Las^Mercury
  vec3 i = floor(p);
  vec4 a = dot(i, vec3(1.0, 57.0, 21.0)) + vec4(0.0, 57.0, 21.0, 78.0);
  vec3 f = cos((p - i) * acos(-1.0)) * (-0.5) + 0.5;
  a = mix(sin(cos(a) * a), sin(cos(1.0 + a) * (1.0 + a)), f.x);
  a.xy = mix(a.xz, a.yw, f.y);
return mix(a.x, a.y, f.z);
}

float sphere(vec3 p, vec4 spr) {
  return length(spr.xyz-p) - spr.w;
}

float flame(vec3 p) {
float d = sphere(p * vec3(1.0, 0.5, 1.0), vec4(0.0, -1.0, 0.0, 1.0));
return d + (noise(p + vec3(0.0, time * 2.0, 0.0)) + noise( p * 3.0) * 0.5) * 0.25 * (p.y) ;
}

float scene(vec3 p) {
  return min(100.0 - length(p), abs(flame(p)));
}

vec4 raymarch(vec3 org, vec3 dir) {
  float d = 0.0;
  float glow = 0.0;
  float eps = 0.02;
  vec3 p = org;
  bool glowed = false;

  for(int i=0; i<64; i++) {
    d = scene(p) + eps;
    p += d * dir;
    if(d > eps) {
      if(flame(p) < 0.0) {
        glowed = true;
      }
      if(glowed) {
        glow = float(i) / 64.0;
      }
    }
  }
  return vec4(p, glow);
}


void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  //vec2 v = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;
  //v.x *= resolution.x / resolution.y;

  vec3 org = vec3(0.0, -2.0, 4.0);
  //vec3 org = vec3(0.0, -mouse.y, mouse.x);
  vec3 dir = normalize(vec3(uv.x * 1.6, -uv.y, -1.5));

  vec4 p = raymarch(org, dir);
  float glow = p.w;

  vec4 col = mix(vec4(1.0, 0.5, 0.1, 1.0), vec4(0.1, 0.5, 1.0, 1.0), p.y * 0.02 + 0.4);
  fragmentColor = mix(vec4(0.0), col, pow(glow * 2.0, 4.0));
  //fragmentColor = mix(vec4(1.0), mix(vec4(1.0, 0.5, 0.1, 1.0), vec4(0.1, 0.5, 1.0, 1.0), p.y * 0.02 + 0.4), pow(glow * 2.0, 4.0));
  
}

