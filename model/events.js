let mongoose=require('mongoose')
const validator = require('validator')

let eventSchema = new mongoose.Schema({
    name:{
        type:String
    },
    tagline:{
        type:String
    },
    schedule:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String,
        validate(value){
            if(!validator.isURL(value,{ protocols: ['http','https','ftp'], require_tld: true, require_protocol: true })){
                throw new Error("Invalid url")
            }
        }
    },
    moderator:{
        type:String
    },
    category:{
        type:String
    },
    sub_category:{
        type:String
    },
    rigor_rank:{
        type:Number
    }
})

let events = mongoose.model('Events',eventSchema)

module.exports = events