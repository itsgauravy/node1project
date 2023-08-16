const Banner=require('../models/banner')

exports.adminbannerpage=async(req,res)=>{
    const record=await Banner.findOne()
    res.render('admin/banner.ejs',{record})
}

exports.adminbannerupdate=async(req,res)=>{
    // console.log(req.params.id)
     const id=req.params.id
     const record=await Banner.findById(id)
     res.render('admin/bannerform.ejs',{record})
 }

exports.adminpostbupdate=async(req,res)=>{
            
    //console.log(req.file)
    // console.log(req.body)
const{title,desc,ldesc}=req.body
          //console.log(req.params.id)
const id=req.params.id
if(req.file){
const filename=req.file.filename
await Banner.findByIdAndUpdate(id,{title :title,desc:desc,ldesc:ldesc,img:filename})
}else{
await Banner.findByIdAndUpdate(id,{title :title,desc:desc,ldesc:ldesc})
}
res.redirect('/admin/banner')

}

exports.Banner=async(req,res)=>{
    const Brecord= await Banner.findOne()
                                               //console.log(Brecord)
     res.render('banner.ejs',{Brecord})
    }