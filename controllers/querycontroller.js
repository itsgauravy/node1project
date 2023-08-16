const Query=require('../models/query')

exports.adminquery=async(req,res)=>{
    const record=await Query.find()
    res.render('admin/query.ejs',{record})
}

exports.adminqueryreply=async(req,res)=>{
    // console.log(req.params.id)

const id=req.params.id
const record= await Query.findById(id)
    //console.log(record)
res.render('admin/replyform.ejs',{record})

}

exports.adminpostqueryreply=async(req,res)=>{

    //console.log(req.params.id)
   //console.log(req.body)
const id=req.params.id
const path=req.file.path
const{emailto,emailfrom,sub,body}=req.body

let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
secure: false, // true for 465, false for other ports
auth: {
user: 'gokushubh82@gmail.com', // generated ethereal user
pass: 'htkahejvkuevstrp', // generated ethereal password
},
});
//console.log('connect to smtp server')
let info = await transporter.sendMail({
from: emailfrom, // sender address
to: emailto, // list of receivers
subject: sub, // Subject line
text: body, // plain text body
// html: "<b>Hello world?</b>", // html body
attachments:[{
path:path
}]
});
//console.log('Email Sent')
await Query.findByIdAndUpdate(id,{status:'replied'})
res.redirect('/admin/query')
}