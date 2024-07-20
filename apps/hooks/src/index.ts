import express from 'express';
import {prisma} from "@repo/db/src"
const app = express();
app.use(express.json())

app.get('/hooks/catch/:userId/:zapId',async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body
    //store in db a new trigger
    await prisma.$transaction(async (tx :any)=> {
        const run  = await tx.zapRun.create({
            data:{
                zapId:zapId,
                matadata:body
            } 
        })
        await tx.zapRunOutbox.create({
            data:{
                zapRunId: run.id,
            }
        }) 
    });
    return res.json({
        message:"Captured"
    })
});




app.listen(3003, () => {
  console.log('Example app listening on port http://localhost:3000');
});