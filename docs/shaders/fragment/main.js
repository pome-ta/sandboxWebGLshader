#ifdef GL_ES
precision highp float;
#endif

uniform float time;
uniform vec2 resolution;


const float PI = acos(-1.0);

vec2 rot(vec2 p, float a) {
  return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}

// LIVE Shader Deconstruction :: happy jumping
// https://www.youtube.com/watch?v=Cfe5UQ-1L9Q&feature=youtu.be
// around 53:00
float map(vec3 p) {
  float d = length(p) - 0.25;
  float d2 = p.y + 0.25;
  return min(d, d2);
}

vec3 normal(vec3 p){
    vec2 e=vec2(.001,.0);
    return normalize(.000001+map(p)-vec3(map(p-e.xyy),map(p-e.yxy),map(p-e.yyx)));
}

float castRay(vec3 ro,vec3 rd){
    float t=0.0;
    for(int i=0;i<200;++i){
	    float f=map(ro+t*rd);
	    if(f<.001) break;
	    if(t>20.) break;
        t+=f;
	}
	if(t>20.) t=-1.;
	return t;
}

void main(void)
{
	vec2 p = (2.*gl_FragCoord.xy-resolution.xy) / min(resolution.x,resolution.y);
	vec3 col=vec3(.6,.7,.8);
	
	vec3 ro=vec3(.0,.0,1.)
	,rd=normalize(vec3(p,-1.5));
	
    vec3 N=vec3(.0),ray=ro;
    float d=castRay(ro,rd);

    if(d>.0){
        N=normal(ro+d*rd);
        vec3 mate=vec3(.18);
        
        vec3 sun_dir=normalize(vec3(.8,.4,.2));
        float sun_dif=clamp(dot(N,sun_dir),.0,1.);
        float sun_sha=step(castRay(ro+d*rd+N*.001,sun_dir),.0);
        float sky_dif=clamp(.5+.5*dot(N,vec3(.0,1.,.0)),.0,1.);
        float bou_dif=clamp(.5+.5*dot(N,vec3(.0,-1.,.0)),.0,1.);
        
        col=mate*vec3(7.,4.5,3.)*sun_dif*sun_sha;
        col+=mate*vec3(.5,.8,.9)*sky_dif;
        col+=mate*vec3(.7,.3,.2)*bou_dif;
    }
//    if(d<.0) col-=sun_dif;
    
    col=pow(col, vec3(.4545));
	
	gl_FragColor = vec4(col, 1.);
}
