

const registerUser= ((req,res)=>{
if(!req.body.email ){
return res.status(400).send("Email is required")

}
 res.send("Register a user")
})

export default registerUser;