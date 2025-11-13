// Primary Backend
import express from "express";
import client from "./utils/redisClient";

const app = express();
app.use(express.json());

// Publishing to Redis Queue

app.post("/submit",async (req,res) => {
    const { problem_id, user_id, code, language } = req.body;
    if(!problem_id || !user_id || !code || !language ){
        res.status(400).json({
            message : "All fields are mandatory"
        })
    }
    try{
        await client.lPush("submissions",JSON.stringify({
            problem_id,
            user_id,
            code,
            language,
            timestamp : Date.now()
        }))
    }
    catch(err){
        console.log('Error pushing to submissions queue');
        res.status(500).json({
            message : "Error pushing to submissions queue",
            err
        })
    }
})

app.listen(3000, ()=>{
    console.log('Listening on port 3000')
})