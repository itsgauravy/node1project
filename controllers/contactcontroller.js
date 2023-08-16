const Contact=require('../models/contact.js')

exports.admincontact=async(req,res)=>{
    const record=await Contact.findOne()
                                    // console.log(record)
    res.render('admin/contact.ejs',{record})
}

exports.admincontactuform=async(req,res)=>{
                                    // console.log(req.params.id)
    const id=req.params.id
    const record=await Contact.findById(id)
    res.render('admin/contactuform',{record})
}

exports.postadmincontactuform=async(req,res)=>{
                                //console.log(req.body)
                                //console.log(req.params.id)
        const{add,mob,gmail,linkedin,twitter,snap,insta}=req.body
        const id=req.params.id
        await Contact.findByIdAndUpdate(id,{address:add,mob:mob,gmail:gmail,linkedin:linkedin,twitter:twitter,snapchat:snap,insta:insta})
        res.redirect('/admin/contact')
}