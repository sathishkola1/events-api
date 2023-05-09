let mongoose=require('mongoose')
require('dotenv').config()
let url=process.env.MONGODB
mongoose.connect(url,{
    useNewUrlParser:true
}).then((res)=>{
    console.log("database connected")
}).catch((e)=>{
    console.log("error",e)
})