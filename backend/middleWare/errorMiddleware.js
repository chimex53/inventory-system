const errorHandler=(err,req,res,next)=>{
    res.status(404).json({
        message: 'Route not found',
        status: 404
    });
}