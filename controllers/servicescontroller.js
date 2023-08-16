const Service=require('../models/service')

exports.adminservices=async(req,res)=>{
    const record=await Service.find().sort({postedDate:-1})
    const totalService=await Service.count()
    const publishCount= await Service.count({status:'publish'})
    const unpublishCount=await Service.count({status:'unpublish'})
                                                                    //console.log(unpublishCount)
    res.render('admin/service.ejs',{record,totalService,publishCount,unpublishCount})
}

exports.adminservicesadd=(req,res)=>{
    res.render('admin/serviceform.ejs')
}

exports.adminpostservicesadd=(req,res)=>{
    const filename=req.file.filename                                            
                                    // console.log(req.file)
                                                //console.log(req.body)
const{sname,sdesc,sldesc}=req.body
let currentDateTime=new Date()
const record =new Service({name:sname,desc:sdesc,ldesc:sldesc,postedDate:currentDateTime,img:filename})
record.save()
                                                    //console.log(record)
res.redirect('/admin/service')
}

exports.adminservicesdelete=async(req,res)=>{
    //console.log(req.params.id)
const id=req.params.id
await Service.findByIdAndDelete(id)
res.redirect('/admin/service')
}

exports.adminservicesstatusupdate=async(req,res)=>{
    // console.log(req.params.id)
const id=req.params.id
const record=await Service.findById(id)
        //  console.log(record)    
let currentstatus=null
if(record.status=='unpublish'){
currentstatus='publish'
} else{
currentstatus='unpublish'
}                     
await Service.findByIdAndUpdate(id,{status:currentstatus})
res.redirect('/admin/service')
}

exports.servicesdetail=async(req,res)=>{
    // console.log(req.params.id)
const id=req.params.id
const record=await Service.findById(id)
res.render('servicedetail.ejs',{record}) 
}