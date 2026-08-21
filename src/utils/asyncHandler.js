const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }
}
export{asyncHandler}




// //try catch method
//const asynhandler=()=>{}   
/////////    const async =(function as parameter)=>async(sending it to async )=>{callback}
// const asyncHandler=(func)=>async(req,res,next)=>{
//     try{
//         await func(req,res,next)
//     }catch(error){
//         res.status(error.code|| 500).json({
//             success:false,
//             message: err.message
//         })
//     }
// }
//export{asyncHandler}
