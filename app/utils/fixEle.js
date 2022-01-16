const fixEle = (list) => (Value) => {
  if (typeof Value === 'function' || typeof Value?.render === 'function') {
    return <Value />;
  }
  if (typeof Value === 'string') {
    const Comp = list?.[Value];
    return Comp ? <Comp key={Value} /> : <i className={Value} /> /* <i>{Value}</i> */;
  }
  return Value || null;
};

export default fixEle;
