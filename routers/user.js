const router    =require('express').Router()
const Banner    =require('../models/banner')
const Service   =require('../models/service')
const Testi     =require('../models/testi')
const Query     =require('../models/query')
const multer    =require('multer')
const bannerc   =require('../controllers/bannercontrollers')
const servicesc =require('../controllers/servicescontroller')
const testic    =require('../controllers/testicontroller')
const regc      =require('../controllers/regcontroller')
const queryc    =require('../controllers/querycontroller')
const contact = require('../models/contact')





let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

let upload=multer({
    storage:storage,
    limits:{files:1024*1024*5}
})

router.get('/',async(req,res)=>{
    const bannerRecord=await Banner.findOne()
                                                 //console.log(bannerRecord)
    const serviceRecord=await Service.find({status:'publish'}) 
                                                 // console.log(serviceRecord)
    const testiRecord=await Testi.find({status:'publish'})
                                                    //console.log(testiRecord)
     const contactRecord=await contact.findOne()
                                                   // console.log(contactRecord)
    res.render('index.ejs',{bannerRecord,serviceRecord,testiRecord,contactRecord})
})

router.post('/',regc.posthome)

router.get('/banner',bannerc.Banner)
    
router.get('/servicedetail/:id',servicesc.servicesdetail)

router.get('/testi',testic.testi)

router.post('/testi',upload.single('img'),testic.posttesti)







module.exports=router