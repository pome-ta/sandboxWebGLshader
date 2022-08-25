import { Fragmen } from './fragmen.js';
import { wrapDiv, canvasDiv, message, modeSelect, editor } from './setDOM.js';

/*
function createElements(tags) {
  return tags.map((tag) => document.createElement(tag));
}

let latestStatus = 'success';
const tagArray = ['main', 'div', 'div', 'select', 'div'];

const modeOptions = [
  'classic',
  'geek',
  'geeker',
  'geekest',
  'classic (300 es)',
  'geek (300 es)',
  'geeker (300 es)',
  'geekest (300 es)',
  'classic (MRT)',
  'geek (MRT)',
  'geeker (MRT)',
  'geekest (MRT)',
];

let wrapDiv, canvasDiv, message, modeSelect, editor;
(() => {
  [wrapDiv, canvasDiv, message, modeSelect, editor] = createElements(tagArray);

  modeSelect.style.width = '100%';
  modeSelect.style.height = '2rem';
  modeOptions.forEach((option, index) => {
    const optionElement = document.createElement('option');
    optionElement.value = index;
    optionElement.text = option;
    modeSelect.appendChild(optionElement);
  });

  
  editor.style.fontFamily = 'monospace';
  editor.style.fontSize = '0.8rem';

  document.body.appendChild(wrapDiv);
  wrapDiv.appendChild(modeSelect);
  wrapDiv.appendChild(message);
  wrapDiv.appendChild(editor);
  wrapDiv.appendChild(canvasDiv);

  //wrapDiv.style.display = 'grid';
  //wrapDiv.gridTemplateRows = 'auto 1fr';
  message.style.height = '2rem';
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
*/
let currentMode = Fragmen.MODE_CLASSIC; // 現在の Fragmen モード
let currentSource = ''; // 直近のソースコード

// fragmen.js 用のオプションの雛形
const FRAGMEN_OPTION = {
  target: null,
  eventTarget: null,
  //mouse: true,
  mouse: false,
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
editor.textContent = currentSource;

canvasDiv.addEventListener('touchmove', (event) => {
  //event.preventDefault();
});

/**
 * シェーダのソースを更新
 */
function update(source) {
  if (fragmen == null) {
    return;
  }
  fragmen.render(source);
}

// モード変更時の処理
modeSelect.addEventListener(
  'change',
  () => {
    const defaultSourceInPrevMode = fragmenDefaultSource[currentMode];

    const source = editor.textContent;
    currentMode = parseInt(modeSelect.value);
    fragmen.mode = currentMode;

    // 既定のソースと同じならモードに応じた既定のソースに書き換える
    if (source === defaultSourceInPrevMode) {
      const defaultSource = fragmenDefaultSource[currentMode];
      editor.textContent = defaultSource;
      /*
      setTimeout(() => {
        editor.gotoLine(1);
      }, 100);
      */
    } else {
      // ソースを置き換えないとしてもビルドはしなおす
      update(editor.textContent);
    }
  },
  false
);
