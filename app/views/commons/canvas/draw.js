import {getRelative, dlfile, cacheData} from '@huxy/utils';
import initStart from '@app/utils/handleEvts';
import drawText from './drawText';

const {record, undo, redo} = cacheData();

const cfgStore = defCfg => {
  const configs = {...defCfg};
  const getCfg = key => configs[key];
  const setCfg = ({...confs}) =>
    Object.keys(confs).map(key => {
      configs[key] = confs[key];
    });
  return {getCfg, setCfg};
};

const {getCfg, setCfg} = cfgStore({type: 'draw'});

const loadImg = (imgCanvas, imgUrl, canvas) => {
  const {width, height} = canvas;
  imgCanvas.width = width;
  imgCanvas.height = height;
  // createImg(imgCanvas,imgUrl);
  // const ctx = canvas.getContext('2d');
  const ctx = imgCanvas.getContext('2d');
  const img = new Image();
  img.src = imgUrl;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, height);
    saveData(canvas);
  };
};
const createImg = (canvas, url) => {
  const {width, height} = canvas;
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = url;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, height);
    // ctx.drawImage(img,0,0,img.width,img.height,0,0,width,height);
  };
  return img;
};
const downloadImg = (imgCanvas, canvas, name) => {
  const {width, height} = canvas;
  const tempUrl = imgCanvas.toDataURL();
  const ctx = imgCanvas.getContext('2d');
  const img = new Image();
  img.src = canvas.toDataURL();
  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, height);
    dlfile(imgCanvas.toDataURL(), name);
    resetImg(imgCanvas, canvas, tempUrl);
  };
};

const resetImg = (imgCanvas, canvas, tempUrl) => {
  const {width, height} = canvas;
  const ctx = imgCanvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  const img = new Image();
  img.src = tempUrl;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, width, height);
  };
};

const saveData = canvas => record(canvas.toDataURL());

const clearRect = canvas => {
  const {width, height} = canvas;
  const ctx = canvas.getContext('2d');
  // ctx.fillStyle='#c5c5c5';
  ctx.clearRect(0, 0, width, height);
};

const startEvent = (evt, canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.beginPath();
  const {x, y} = getRelative(evt, canvas);
  ctx.moveTo(x, y);
};
const moveEvent = (evt, canvas) => {
  evt.preventDefault();
  const ctx = canvas.getContext('2d');
  const {x, y} = getRelative(evt, canvas);
  const type = getCfg('type');
  const size = getCfg('size');
  if (type === 'draw') {
    const color = getCfg('color');
    ctx.lineWidth = size;
    ctx.strokeStyle = color;
    ctx.lineTo(x, y);
    // ctx.shadowColor=color;
    // ctx.shadowBlur=1;
    ctx.stroke();
  } else if (type === 'eraser') {
    //ctx.beginPath();
    ctx.lineWidth = size;
    // ctx.strokeStyle='#fff';
    ctx.clearRect(x - size * 10, y - size * 10, size * 20, size * 20);
  }
};
const endEvent = (evt, canvas) => {
  evt.stopPropagation();
  saveData(canvas);
  if (getCfg('type') === 'text') {
    drawText(evt, canvas);
  }
};

const prev = canvas => {
  clearRect(canvas);
  const {data} = undo();
  data && createImg(canvas, data);
};
const next = canvas => {
  clearRect(canvas);
  const {data} = redo();
  data && createImg(canvas, data);
};

const init = (ref, defCfg, imgRef, imgUrl) => {
  setCfg({...defCfg, imgRef});
  if (imgUrl) {
    loadImg(imgRef, imgUrl, ref);
  } else {
    clearRect(imgRef);
  }
  const destroy = initStart(ref, startEvent, moveEvent, endEvent);
  return {
    destroy,
    color: value => setCfg({color: value, type: 'draw'}),
    size: value => setCfg({size: value, type: 'draw'}),
    eraser: () => setCfg({type: 'eraser'}),
    text: () => setCfg({type: 'text'}),
    clean: () => {
      clearRect(ref);
      setCfg({type: 'draw'});
      saveData(ref);
    },
    undo: () => prev(ref),
    redo: () => next(ref),
    save: name => downloadImg(imgRef, ref, name),
  };
};

export default init;
