const express=require('express')
const app=express()
app.use(express.urlencoded({extended:false}))
const mongoose=require('mongoose')
const userRouter=require('./routers/user')
const adminRouter=require('./routers/admin')

mongoose.connect('mongodb://127.0.0.1:27017/project1')



app.use(userRouter)
app.use('/admin',adminRouter)
app.set('view engine','ejs')
app.use(express.static('public'))

app.listen(5000)