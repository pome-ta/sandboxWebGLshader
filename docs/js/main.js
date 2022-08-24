import { Fragmen } from './fragmen.js';

function createElements(tags) {
  return tags.map((tag) => document.createElement(tag));
}

let latestStatus = 'success';
const tagArray = ['main', 'div', 'div'];

let wrapDiv, canvasDiv, message;
(() => {
  [wrapDiv, canvasDiv, message] = createElements(tagArray);
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

  // todo: setting fragmen glCanvas size
  const { width, height } = wrapDiv.getBoundingClientRect();
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
