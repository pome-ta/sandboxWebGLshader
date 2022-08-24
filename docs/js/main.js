import { Fragmen } from './fragmen.js';

function createElements(tags) {
  //const hoge = tags.map((tag) => document.createElement(tag))
  return 
}

createElements()
let latestStatus = 'success';
const setTags = ['main', 'div', 'div'];
//let [wrapDiv, canvasDiv, message] = createElements(setTags)
let wrapDiv, canvasDiv, message;
(() => {
  wrapDiv = document.createElement('main');
  canvasDiv = document.createElement('div');
  message = document.createElement('div');
  message.style.height = '2rem';

  document.body.appendChild(wrapDiv);

  wrapDiv.appendChild(canvasDiv);
  wrapDiv.appendChild(message);

  wrapDiv.style.display = 'grid';
  wrapDiv.gridTemplateRows = 'auto 1fr';

  message.style.fontFamily = 'monospace';
  message.textContent = ' ● ready';
  wrapDiv.style.height = '100%';
  canvasDiv.style.overflow = 'hidden';
  canvasDiv.style.height = '100%';

  const { width, height } = wrapDiv.getBoundingClientRect();

  // todo: setting fragmen glCanvas size
  canvasDiv.width = width;
  canvasDiv.height = height;
})();

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
fragmen.onBuild((status, msg) => {
  message.textContent = msg;
});

fragmen.mode = currentMode;
fragmen.render(currentSource);

canvasDiv.addEventListener('touchmove', (event) => {
  //event.preventDefault();
});
