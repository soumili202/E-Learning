const catchAsync = fn => (req, res, next) => {
  //fix this

    Promise.resolve(fn(req, res, next)).catch(err => next(err));
    
  };
  
  
  module.exports = catchAsync;