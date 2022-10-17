const fixEle = list => Value => {
  if (typeof Value === 'function' || typeof Value?.render === 'function') {
    return <Value />;
  }
  if (typeof Value === 'string') {
    const Comp = list?.[Value];
    return Comp ? <Comp /> : <i className={Value} />;
  }
  return Value ?? null;
};

export default fixEle;
