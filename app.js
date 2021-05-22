
const express=require('express');
const app=express();
const port=process.env.PORT || 9800;
const mongo=require('mongodb');
const MongoClient=mongo.MongoClient;
const mongourl="mongodb+srv://knyhago:kenny@cluster0.2kzve.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let db;
const cors=require('cors');
const bodyParser=require('body-parser');
const { urlencoded } = require('express');
let limit=100;
  
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.send(`Health Done`)
})

app.get('/empDetails',(req,res)=>{

    var condition={}; 

if(req.query.id){
   

    condition={"_id":req.query.id}

}else if(req.query.name){

    condition={"firstName":req.query.name}

}

 else if(req.query.dept){

    condition={"department":req.query.dept}

}

    db.collection('empDetails').find(condition).toArray((err,result)=>{
        if (err) throw err
        res.send(result)
    })
})

app.post('/adddetails',(req,res)=>{
    db.collection('empDetails').insert(req.body,(err,result)=>{
        if (err) throw err;
        res.status(200).send("Data Added")
    })
})



MongoClient.connect(mongourl,(err,connection)=>{
    if (err) console.log(err);
    db=connection.db('EDMS');
  
    app.listen(port,(err)=>{
      if (err) throw err
      console.log(`server is running in ${port}`)
    
    })
  
})
