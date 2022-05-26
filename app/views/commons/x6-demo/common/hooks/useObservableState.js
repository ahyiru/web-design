import { useEffect, useMemo, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
export const useObservableState = (source$, initialState) => {
  const source = useMemo(() => {
    if (typeof source$ === 'function') {
      return source$();
    }
    return source$;
  }, [source$]);
  const [state, setState] = useState(() => {
    if (source instanceof BehaviorSubject) {
      return source.getValue();
    }
    return initialState;
  });
  useEffect(() => {
    const sub = source.subscribe((v) => {
      setState(v);
    });
    return () => {
      sub.unsubscribe();
    };
  }, [source]);
  return [state, setState];
};
