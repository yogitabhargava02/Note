const mongoose=require("mongoose");
const DB="mongodb+srv://node-server:Ecommerce@cluster0.sdxuqbn.mongodb.net/Technote?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser: true
}).then(()=>console.log("Database Connected")).catch((error)=>{
    console.log(error);
})