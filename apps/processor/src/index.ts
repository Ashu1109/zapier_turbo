
import {prisma } from "@repo/db/src"
import { Kafka } from "kafkajs";
const kafkajs = new Kafka({
    clientId: "processor",
    brokers: ["pkc-4j8dq.southeastasia.azure.confluent.cloud:9092"],
    ssl: true,
    sasl: {
        mechanism: "plain",
        username: "7DQWCM6PPJYFYKCW",
        password: "z0SlEtxsitWUrawVyHVgZwaklgJLP5cu8bKvUFI5mPp8UI81Td+MpnT3I6CctaHC"
     }
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


