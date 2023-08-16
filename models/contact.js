const mongoose=require('mongoose')

 const contactSchema=mongoose.Schema({
    address:String,
    mob:Number,
    gmail:String,
    linkedin:String,
    twitter:String,
    snapchat:String,
    insta:String
})

module.exports=mongoose.model('contact',contactSchema)