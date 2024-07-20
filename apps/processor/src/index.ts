
import {prisma } from "@repo/db/src"
import { Kafka } from "kafkajs";
const kafkajs = new Kafka({
    clientId: "processor",
    brokers: ["localhost:9092"],
     });
(async()=>{
    const producer = kafkajs.producer();
    await producer.connect();
     while(1){
        const pendingRows = await prisma.zapRunOutbox.findMany({
            take:10
        })
        await producer.send({
            topic: "zap-events",
            messages: pendingRows.map((row:any) => ({
                value: row.zapRunId,
            })),
        });
        await prisma.zapRunOutbox.deleteMany({
            where:{
                id:{
                    in:pendingRows.map((row:any) => row.id)
                }
            }
        })
     }
})()
