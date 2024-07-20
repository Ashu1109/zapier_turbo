import { Kafka } from "kafkajs";
const kafkajs = new Kafka({
  clientId: "worker",
  brokers: ["localhost:9092"],
});

const consumer = kafkajs.consumer({ groupId: "worker" });
const main = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "zap-events", fromBeginning: true });
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }:any) => {
      console.log({
        message:message.value
      });
      console.log("before commit");
    //   await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log("After commit");
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
