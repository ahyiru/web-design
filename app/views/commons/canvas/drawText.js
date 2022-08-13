import {getTouchPosition, setStyle} from '@huxy/utils';

const createNote = (x, y, right, bottom) => {
  const textarea = document.createElement('textarea');
  const styles = {
    position: 'fixed',
    zIndex: 10001,
    width: '300px',
    height: '100px',
  };
  if (x + 300 > right) {
    styles.left = `${x - 300}px`;
  } else {
    styles.left = `${x}px`;
  }
  if (y + 100 > bottom) {
    styles.top = `${y - 100}px`;
  } else {
    styles.top = `${y}px`;
  }
  setStyle(textarea, styles);
  document.body.appendChild(textarea);
  return textarea;
};
const removeNote = note => {
  document.body.removeChild(note);
};

const drawText = (evt, canvas) => {
  const ctx = canvas.getContext('2d');
  const {touchX, touchY} = getTouchPosition(evt);
  const {left, top, right, bottom} = canvas.getBoundingClientRect();
  const textArea = createNote(touchX, touchY, right, bottom);
  textArea.focus();
  textArea.addEventListener(
    'blur',
    event => {
      const txt = textArea.value;
      ctx.font = '12px 微软雅黑';
      ctx.fillStyle = 'red';
      ctx.fillText(txt, touchX - left, touchY - top);
      removeNote(textArea);
      // setCfg({type:'draw'});
    },
    false,
  );
};

export default drawText;
