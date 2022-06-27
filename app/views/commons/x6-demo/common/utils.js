export {unescapeHTML} from '@huxy/utils';
export class Deferred {
  resolve;
  reject;
  promise;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
export const safeJson = (jsonStr = '{}', defaultVal = {}) => {
  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    console.warn(`${jsonStr} is not valid json`);
    return defaultVal;
  }
};
export class CodeName {
  static parse(codeName = '') {
    return codeName.replace(/_\d+$/, '').toLocaleLowerCase();
  }
  static equal(c1, c2) {
    return CodeName.parse(c1) === CodeName.parse(c2);
  }
  static some(list, c2) {
    return list.some((c1) => CodeName.equal(c1, c2));
  }
  static getFromNode(node = {}) {
    const {codeName = ''} = node;
    return CodeName.parse(codeName);
  }
}
export const isPromise = (obj) => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
