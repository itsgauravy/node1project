const router        =require('express').Router()
const Reg           =require('../models/reg')
const Banner        =require('../models/banner')
const Service       =require('../models/service')
const Testi         =require('../models/testi')
const Query         =require('../models/query')
const multer        =require('multer')
const nodemailer    =require('nodemailer')
const { attachment }= require('express/lib/response')
const bannerc       =require('../controllers/bannercontrollers')
const servicesc     =require('../controllers/servicescontroller')
const testic        =require('../controllers/testicontroller')
const queryc        =require('../controllers/querycontroller')
const regc          =require('../controllers/regcontroller')
const contactc      =require('../controllers/contactcontroller')



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
    limits:{files:1024*1024*10}
})

router.get('/',regc.adminhome)

router.post('/',regc.adminposthome)

router.get('/dashboard',regc.admindashboard)

router.get('/banner',bannerc.adminbannerpage)

router.get('/bannerupdate/:id',bannerc.adminbannerupdate)

router.post('/bannerupdate/:id',upload.single('img'),bannerc.adminpostbupdate)

router.get('/service',servicesc.adminservices)

router.get('/serviceadd',servicesc.adminservicesadd)

router.post('/serviceadd',upload.single('img'),servicesc.adminpostservicesadd)

router.get('/servicedelete/:id',servicesc.adminservicesdelete)

router.get('/servicestatusupdate/:id',servicesc.adminservicesstatusupdate)

router.get('/testi',testic.admintesti)

router.get('/testistatusupdate/:id',testic.admintestistatusupdate)

router.get('/query',queryc.adminquery)

router.get('/reply/:id',queryc.adminqueryreply)

router.post('/reply/:id',upload.single('attachment'),queryc.adminpostqueryreply)

router.get('/contact',contactc.admincontact)

router.get('/contactuform/:id',contactc.admincontactuform)

router.post('/contactuform/:id',contactc.postadmincontactuform)


module.exports=router