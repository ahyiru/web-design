import {isTouch} from '@huxy/utils';

const eventTargets = () =>
  isTouch()
    ? {
      startEvt: 'touchstart',
      moveEvt: 'touchmove',
      endEvt: 'touchend',
    }
    : {
      startEvt: 'mousedown',
      moveEvt: 'mousemove',
      endEvt: 'mouseup',
    };

const initStart = (startEvt, startFn, ref) => {
  ref.addEventListener(startEvt, startFn, false);
};
const destroyStart = (startEvt, startFn, ref) => {
  ref.removeEventListener(startEvt, startFn, false);
};
const handleStart = (moveEvt, endEvt, moveFn, endFn, ref) => {
  ref.addEventListener(moveEvt, moveFn, false);
  document.addEventListener(endEvt, endFn, false);
};
const handleEnd = (moveEvt, endEvt, moveFn, endFn, ref) => {
  ref.removeEventListener(moveEvt, moveFn, false);
  document.removeEventListener(endEvt, endFn, false);
};

const init = (startEvent, moveEvent, endEvent, ref = document) => {
  const {startEvt, moveEvt, endEvt} = eventTargets();

  const startFn = event => {
    startEvent(event, ref);
    handleStart(moveEvt, endEvt, moveFn, endFn, ref);
  };
  const moveFn = event => moveEvent(event, ref);
  const endFn = event => {
    endEvent(event, ref);
    handleEnd(moveEvt, endEvt, moveFn, endFn, ref);
  };

  initStart(startEvt, startFn, ref);

  return () => destroyStart(startEvt, startFn, ref);
};

export default init;
