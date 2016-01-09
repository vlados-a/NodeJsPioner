module.exports = function(req, res, next){
  res.sendHttpError = function(error){
    console.log(error.status);
    if(res.req.headers['x-requested-with'] == 'XMLHttpRequest'){
      res.status(error.status).json(error);
    }
    else{
      res.status(error.status).render("error",{error: error});
    }
  }
  next();
};
