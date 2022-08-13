import {isTouch} from '@huxy/utils';

const eventTargets = () =>
  isTouch()
    ? {
      startEvt: 'touchstart',
      moveEvt: 'touchmove',
      endEvent: 'touchend',
    }
    : {
      startEvt: 'mousedown',
      moveEvt: 'mousemove',
      endEvt: 'mouseup',
    };

const initStart = (startEvt, ref, startEvent) => {
  ref.addEventListener(startEvt, startEvent, false);
};
const destroyStart = (startEvt, ref, startEvent) => {
  ref.removeEventListener(startEvt, startEvent, false);
};
const handleStart = (moveEvt, endEvt, ref, moveEvent, endEvent) => {
  ref.addEventListener(moveEvt, moveEvent, false);
  document.addEventListener(endEvt, endEvent, false);
};
const handleEnd = (moveEvt, endEvt, ref, moveEvent, endEvent) => {
  ref.removeEventListener(moveEvt, moveEvent, false);
  document.removeEventListener(endEvt, endEvent, false);
};

const init = (ref, startEvent, moveEvent, endEvent) => {
  const {startEvt, moveEvt, endEvt} = eventTargets();

  const start = event => {
    startEvent(event, ref);
    handleStart(moveEvt, endEvt, ref, move, end);
  };
  const move = event => moveEvent(event, ref);
  const end = event => {
    endEvent(event, ref);
    handleEnd(moveEvt, endEvt, ref, move, end);
  };

  initStart(startEvt, ref, start);

  return () => destroyStart(startEvt, ref, start);
};

export default init;
