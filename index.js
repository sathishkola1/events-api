let express=require('express')
let app=express()
let event = require('./model/events')
require('./db/mongoose')
require('dotenv').config()
let port=process.env.PORT

app.use(express.json())

app.get('/api/v3/app/events/:id', async (req,res)=>{
    try{
        let eventFound = await event.findById(req.params.id)
        res.send(eventFound)
    }
    catch(err){
        res.status(404).send({status:"Event Not found!"})
    }
})

app.get('/api/v3/app/events', async (req,res)=>{
    const pageNum = ((req.query.page) - 1) * (req.query.limit)
    
    try{
        const order = req.query.type === 'latest' ? -1 : 1
        let events = await event.find().sort({"_id": order}).limit(req.query.limit).skip(pageNum)
        res.send(events)
    }
    catch(err){
        res.status(404).send({status:"Error"})
    }
})

app.post('/api/v3/app/events', async (req,res)=>{
    let newEvent = new event(req.body)
    try{
        await newEvent.save()
        res.send({status:"success",id:newEvent._id})
    }
    catch(err){
        res.status(404).send({status:"Error",err})
    }
})

app.put('/api/v3/app/events/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const validUpdates = ['name','tagline','schedule','description','rigor_rank','category','sub_category','moderator','image']
    const isValid = updates.every((update)=> validUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({error:"Invalid update!"})
    }
    try{
        const eventFound = await event.findById(req.params.id)
        if(!eventFound){
            return res.status(404).send({status:"Not found"})
        }
        updates.forEach((update)=> eventFound[update]=req.body[update])
        await eventFound.save()
        res.send(eventFound)
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.delete('/api/v3/app/events/:id', async (req,res)=>{
    try{
        await event.findByIdAndDelete(req.params.id)
        res.send({status:"Deleted Successfully"})
    }
    catch(err){
        res.status(400).send({status:"Error",err})
    }
})

app.listen(port,()=>{
    console.log("Server started")
}) 