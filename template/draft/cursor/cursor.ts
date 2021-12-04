export const getCursortPosition=(textDom)=>{
  let cursorPos=0;
  if((<any>document).selection){// IE Support
    textDom.focus();
    const selectRange=(<any>document).selection.createRange();
    // selectRange.moveStart('character',-textDom.value.length);
    // cursorPos=selectRange.text.length;
    selectRange.moveStart('character',-textDom.innerHTML.length);
    cursorPos=selectRange.text.length;
  }else if (textDom.selectionStart||textDom.selectionStart=='0'){// Firefox support
    cursorPos=textDom.selectionStart;
  }
  return cursorPos;
};
export const setCaretPosition=(textDom,pos)=>{
  if(textDom.setSelectionRange){// IE Support
    textDom.focus();
    textDom.setSelectionRange(pos,pos);
  }else if(textDom.createTextRange){// Firefox support
    const range=textDom.createTextRange();
    range.collapse(true);
    range.moveEnd('character',pos);
    range.moveStart('character',pos);
    range.select();
  }
};
export const setCursorPosition=(elem,index)=>{
  const val=elem.value;
  const len=val.length;
  // 超过文本长度直接返回
  if(len<index){
    return;
  }
  setTimeout(function(){
    elem.focus();
    if(elem.setSelectionRange){ // 标准浏览器
      elem.setSelectionRange(index,index);
    }else{ // IE9-
      const range=elem.createTextRange();
      range.moveStart('character',-len);
      range.moveEnd('character',-len);
      range.moveStart('character',index);
      range.moveEnd('character',0);
      range.select();
    }
  },10);
};
// 获取选中文字
export const getSelectText=()=>{
  let userSelection;
  let text;
  if(window.getSelection){// Firefox support
    userSelection=window.getSelection();
  }else if((<any>document).selection){// IE Support
    userSelection=(<any>document).selection.createRange();
  }
  if(!(text=userSelection.text)){
    text=userSelection;
  }
  return text;
};
export const setSelectText=(textDom,startPos,endPos)=>{
  startPos=parseInt(startPos);
  endPos=parseInt(endPos);
  const textLength=textDom.value.length;
  if(textLength){
    if(!startPos){
      startPos=0;
    }
    if(!endPos){
      endPos=textLength;
    }
    if(startPos>textLength){
      startPos=textLength;
    }
    if(endPos>textLength){
      endPos=textLength;
    }
    if(startPos<0){
      startPos=textLength+startPos;
    }
    if(endPos<0){
      endPos=textLength+endPos;
    }
    if(textDom.createTextRange){// IE Support
      const range=textDom.createTextRange();
      range.moveStart('character',-textLength);
      range.moveEnd('character',-textLength);
      range.moveStart('character',startPos);
      range.moveEnd('character',endPos);
      range.select();
    }else{// Firefox support
      textDom.setSelectionRange(startPos,endPos);
      textDom.focus();
    }
  }
};
export const insertAfterText=(textDom,value)=>{
  let selectRange,range,node,savedRange;
  if((<any>document).selection){// IE Support
    textDom.focus();
    selectRange=(<any>document).selection.createRange();
    selectRange.text=value;
    textDom.focus();
    // selectRange.select();
  }else if(textDom.selectionStart||textDom.selectionStart=='0') {// Firefox support
    const startPos=textDom.selectionStart;
    const endPos=textDom.selectionEnd;
    const scrollTop=textDom.scrollTop;
    textDom.value=textDom.value.substring(0,startPos)+value+textDom.value.substring(endPos,textDom.value.length);
    // textDom.innerHTML=textDom.innerHTML.substring(0,startPos)+value+textDom.innerHTML.substring(endPos,textDom.innerHTML.length);
    textDom.focus();
    textDom.selectionStart=startPos+value.length;
    textDom.selectionEnd=startPos+value.length;
    textDom.scrollTop=scrollTop;
  }else{
    textDom.value+=value;
    // textDom.innerHTML+=value;
    textDom.focus();
  }
};






/*
window.getSelection
window.getSelection().getRangeAt
(<any>document).selection
(<any>document).selection.createRange
document.createRange
document.body.createTextRange
 */
// console.log(1,window.getSelection);
// console.log(11,window.getSelection().rangeCount);
// console.log(2,window.getSelection().getRangeAt);
// console.log(3,document.createRange);

// console.log(4,(<any>document).selection);
// console.log(5,(<any>document).selection.createRange);
// console.log(6,(<any>document).body.createTextRange);

// 对选定的文字进行加粗
// document.selection.createRange().execCommand('Bold')
// 获取选定的文本
// document.selection.createRange().text
// 获取选定的html
// document.selection.createRange().htmlText
// 在光标处插入html代码
// document.execCommand('insertHTML','false','<br/>')
// 复制选定文本到剪切板
// document.execCommand('Copy','false',null);
// window.getSelection().rangeCount // 获取选定区数量
const findParent=(ele,tag)=>{
  if(ele.tagName===tag){
    return ele;
  }
  const parent=ele.parentNode;
  if(parent){
    return findParent(parent,tag);
  }
  return null;
};
const findIndex=(ele)=>{
  const parent=ele.parentNode;
  const items=Array.prototype.slice.call(parent.childNodes);
  const index=items.indexOf(ele);
  return index;
};
export const insertHtmlAtCursor=(ele,node)=>{
  ele.focus();
  if(window.getSelection){
    const selection=window.getSelection();
    if(selection.rangeCount===0){
      return;
    }
    // const range=document.createRange();
    let range=selection.getRangeAt(0);
    let anchorNode:any=selection.anchorNode;
    let anchorOffset=selection.anchorOffset;
    let parent=anchorNode;
    let index=anchorOffset;
    if(anchorNode.tagName!=='DIV'&&anchorNode.tagName!=='I'){
      let item=findParent(anchorNode,'SPAN');
      parent=item.parentNode;
      index=findIndex(item)+1;
      if(anchorNode.parentNode.tagName==='I'&&anchorOffset===1&&anchorNode.nodeValue!==')'){
        index-=1;
      }else{
        selection.collapse(parent,index);
        range=selection.getRangeAt(0);
      }
    }
    node=typeof node==='object'?node:range.createContextualFragment(node);
    range.insertNode(node);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    range.setStart(parent,index+1);
    range.setEnd(parent,index+1);
  }else if((<any>document).selection&&(<any>document).selection.createRange){
    const range=(<any>document).selection.createRange();
    node=typeof node==='object'?node.nodeType===3?node.data:node.outerHTML:node;
    node=range.pasteHTML(node);
    // const range=ele.createTextRange();
    range.moveToElementText(ele);
    range.collapse(true);
    range.select();
  }
};








































