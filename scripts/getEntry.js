const getHtmls=filePaths=>{
  // const filePaths=path.resolve(__dirname,'../demo/views/content/components/*/index.tsx');
  const files=glob.sync(filePaths);
  const htmls=[];
  for(let i=0,file;file=files[i++];){
    // file=path.resolve(file);
    const pathArr=file.split(path.sep);
    const filename=pathArr[pathArr.length-2];
    const opt={
      filename:filename+'.html',
      template:file,
    };
    htmls.push(new HtmlWebpackPlugin(opt));
  }
  return htmls;
};

const getEntries=entryPaths=>{
  // const entryPaths=path.resolve(__dirname,'../demo/views/content/components/*/index.tsx');
  const files=glob.sync(entryPaths);
  const entries={};
  for(let i=0,file;file=files[i++];){
    file=path.resolve(file);
    const pathArr=file.split(path.sep);//path.sep:win:'\\',unix:'/'
    const filename=pathArr[pathArr.length-2];
    entries[filename]=file;
  }
  return entries;
};



































