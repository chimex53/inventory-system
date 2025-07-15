const errorHandler=(err,req,res,next)=>{
    const statusCode =res.statusCode === 200 ? 500 : res.statusCode;
    res.statusCode = statusCode;
    res.json ({
        message: err.message, 
        stac: process.env.NODE_ENV ==='development' ? err.stack: null
    })
}

export default errorHandler;