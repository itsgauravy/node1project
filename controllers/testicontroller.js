const Testi=require('../models/testi')

exports.testi=(req,res)=>{
    res.render('testiform.ejs')
}

exports.posttesti=(req,res)=>{
            
    //console.log(req.body)
const{quotes,name}=req.body
if(req.file){
const filename=req.file.filename
const record=new Testi({quotes:quotes,name:name,img:filename})
record.save()
}else{

const record=new Testi({quotes:quotes,name:name,img:'man logo..png'})
record.save()
}
    //console.log(record)
res.redirect('/')
}

exports.admintesti=async(req,res)=>{
    const record=await Testi.find()
    const totalTesti=await Testi.count()
    const publishCount= await Testi.count({status:'publish'})
    const unpublishCount=await Testi.count({status:'unpublish'})
    //console.log(record)
    res.render('admin/testi.ejs',{record,totalTesti,publishCount,unpublishCount})
}

exports.admintestistatusupdate=async(req,res)=>{
    //console.log(req.params.id)
const id=req.params.id
const record=await Testi.findById(id)
let newstatus=null
if(record.status=='unpublish'){
newstatus='publish'
}else{
newstatus='unpublish'
}
await Testi.findByIdAndUpdate(id,{status:newstatus})
res.redirect('/admin/testi')
    //console.log(record)
}