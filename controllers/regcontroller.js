const Reg=require('../models/reg')



exports.posthome=(req,res)=>{
    //console.log(req.body )
const{email,query}=req.body
const record=new query({email:email,query:query})
record.save()
   //console.log(record)
}

exports.adminhome=(req,res)=>{
    res.render('admin/login.ejs')
}

exports.adminposthome=async (req,res)=>{
    //console.log(req.body)
const{lname,lpass}=req.body
const usercheck=await Reg.findOne({username:lname})
    // console.log(usercheck)
if(usercheck!==null){
if(usercheck.password==lpass){
res.redirect('/admin/dashboard')}
else{res.redirect('/admin/')}
}else{res.redirect('/admin/')}

}

exports.admindashboard=(req,res)=>{
    res.render('admin/dashboard.ejs')
}