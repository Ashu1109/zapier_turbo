import express from 'express';
import {prisma} from "@repo/db/src"
const app = express();
app.use(express.json())

app.post('/hooks/catch/:userId/:zapId',async (req, res) => {
    try {
        const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body
    if(body.action==="created"){
        const comment = JSON.parse(body.comment.body)
        console.log(comment)
        await prisma.$transaction(async (tx :any)=> {
            const run  = await tx.zapRun.create({
                data:{
                    zapId:zapId,
                    matadata:comment
                } 
            })
            await tx.zapRunOutbox.create({
                data:{
                    zapRunId: run.id,
                }
            }) 
        });
    }

    return res.json({
        message:"Captured"
    })
    } catch (error) {
        console.log(error)
    }
});




app.listen(3002, () => {
  console.log('Example app listening on port http://localhost:3002');
});