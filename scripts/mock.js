// const test=require('./test');
const mock=app=>{
  app.get('/some/path',(req,res)=>{
    // res.send({data:''});
    res.json({data:''});
  });
};

module.exports=mock;