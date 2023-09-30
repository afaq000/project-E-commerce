const express = require("express")
const mongoDB=require("./db.js")
const cors =require("cors")



const app=express();
app.use(express.json())
app.use(cors(
    {
        origin:["https://deploy-mern-1whq.vercel.app"],
        methods:["POST":"GET"],
        credentials:true
    }
));
const port=5000;
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))

mongoDB();
app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  

app.listen(port,()=>{
    console.log(`Data Base is Concceted ${port}`)
})
