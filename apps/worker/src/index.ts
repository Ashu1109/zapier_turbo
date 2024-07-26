import { Kafka } from "kafkajs";
import { prisma } from "@repo/db/src";
import fs from "fs";
import { parse } from "./parse";
import { send_email } from "./email";
import { send_solana } from "./solana";
import dotenv from "dotenv";
const kafkajs = new Kafka({
  clientId: "worker",
  brokers:["localhost:9092"],
})
dotenv.config();

const main = async () => {
  const consumer = kafkajs.consumer({ groupId: "workers" });
const producer = kafkajs.producer();
await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: "zap-events", fromBeginning: true });
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      if(!message.value){
        return
      }
      const { zapRunId, stage } = JSON.parse(message.value.toString());
      const zapRunDetails = await prisma.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include:{
          zap:{
            include:{
              action:{
                include:{
                  type:true
                }
              }
            }
          }
        }
      })
      const currentAction = zapRunDetails?.zap?.action.find(x=>x.sortingOrder === stage);
      if(!currentAction){
        console.log("No action found")
        return
      }
      const zapMetadata = zapRunDetails?.matadata;
      if (currentAction.type.id === "email") {
        const body = parse((currentAction.metadata as any)?.body as string, zapMetadata);
        const to = parse((currentAction.metadata as any)?.email as string, zapMetadata);
        let email = ""
        if(to[0]==='['){
          email = to.split('[')[1].split(']')[0];
        }else{
          email = to;
        }
        console.log(`Sending out email to ${email} body is ${body}`)
        await send_email(email, body);
        console.log("sending email to", email);
      }
      if(currentAction.type.id==="sol"){
        const amount =  parse((currentAction.metadata as any).amount,zapMetadata);
        const address = parse((currentAction.metadata as any).address,zapMetadata);
        await send_solana(amount,address)
         console.log("Sending",amount,"sol to",address)
      }
      new Promise((resolve) => setTimeout(resolve, 5000));
      const lastStage = (zapRunDetails?.zap?.action.length || 1 ) -1;
      if (stage !== lastStage) {
        try {
          await producer.send({
            topic: "zap-events",
            messages: [{
              value: JSON.stringify({
                zapRunId,
                stage: stage + 1
              })
            }]
          });
        } catch (error) {
          console.error("Failed to send message to zap-events topic", error);
        }
      }
      await consumer.commitOffsets([
        {
          topic: "zap-events",
          partition: 0,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
};
main();
