
module.exports=(theFunc)=>(req,res,next)=>{
  Promise.resolve(theFunc(req,res,next)).catch(next);  //it will help in async not need try catch blocjk its hwndle the error its benefit not crash server
}

