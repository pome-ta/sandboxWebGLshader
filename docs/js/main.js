import { Fragmen } from './fragmen.js';

const canvasDiv = document.createElement('div');
const cxtCanvas = document.createElement('canvas');
canvasDiv.appendChild(cxtCanvas);
document.body.appendChild(canvasDiv);
canvasDiv.style.width = '100%';
cxtCanvas.style.width = '100%';

// fragmen.js 用のオプションの雛形
const FRAGMEN_OPTION = {
  target: null,
  eventTarget: null,
  mouse: true,
  resize: true,
  escape: false,
};

const fragmenDefaultSource = Fragmen.DEFAULT_SOURCE;
