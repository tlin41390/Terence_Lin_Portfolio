import{n as c,s as h}from"./scheduler.7a274a43.js";const e=[];function d(n,a=c){let o;const i=new Set;function r(t){if(h(n,t)&&(n=t,o)){const b=!e.length;for(const s of i)s[1](),e.push(s,n);if(b){for(let s=0;s<e.length;s+=2)e[s][0](e[s+1]);e.length=0}}}function l(t){r(t(n))}function _(t,b=c){const s=[t,b];return i.add(s),i.size===1&&(o=a(r,l)||c),t(n),()=>{i.delete(s),i.size===0&&o&&(o(),o=null)}}return{set:r,update:l,subscribe:_}}var f;const p=((f=globalThis.__sveltekit_1lz9lbt)==null?void 0:f.base)??"/Terence_Lin_Portfolio";var u;const z=((u=globalThis.__sveltekit_1lz9lbt)==null?void 0:u.assets)??p;export{z as a,p as b,d as w};
