import { Fragmen } from './fragmen.js';

let wrapDiv, canvasDiv;

(() => {
  wrapDiv = document.createElement('div');
  canvasDiv = document.createElement('div');
  document.body.appendChild(wrapDiv)
    .appendChild(canvasDiv);

  wrapDiv.style.height = '100%';
  canvasDiv.style.overflow = 'hidden';
  canvasDiv.style.height = '100%';
  let { width, height } = wrapDiv.getBoundingClientRect();
  // todo: fragmen mouseMove
  canvasDiv.width = width;
  canvasDiv.height = height;
})();


const message = document.createElement('div');
message.style.height = '2rem'
message.textContent = ' ● ready';
wrapDiv.appendChild(message)

let currentMode = Fragmen.MODE_CLASSIC; // 現在の Fragmen モード
let currentSource = ''; // 直近のソースコード

// fragmen.js 用のオプションの雛形
const FRAGMEN_OPTION = {
  target: null,
  eventTarget: null,
  mouse: true,
  resize: true,
  escape: false,
};

const fragmenDefaultSource = Fragmen.DEFAULT_SOURCE;
currentMode = Fragmen.MODE_CLASSIC;
currentSource = fragmenDefaultSource[currentMode];
// メインとなる fragmen のインスタンス
const option = Object.assign(FRAGMEN_OPTION, {
  target: canvasDiv,
  eventTarget: window,
});
const fragmen = new Fragmen(option);
//const fragmen = new Fragmen();
fragmen.mode = currentMode;
fragmen.render(currentSource);

canvasDiv.addEventListener('touchmove', (event) => {
  //event.preventDefault();
});
