import { Kafka } from "kafkajs";
const kafkajs = new Kafka({
  clientId: "worker",
  brokers: ["pkc-4j8dq.southeastasia.azure.confluent.cloud:9092"],
  ssl: true,
  sasl: {
      mechanism: "plain",
      username: "7DQWCM6PPJYFYKCW",
      password: "z0SlEtxsitWUrawVyHVgZwaklgJLP5cu8bKvUFI5mPp8UI81Td+MpnT3I6CctaHC"
   },
});

const consumer = kafkajs.consumer({ groupId: "workers" });
const main = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "zap-events", fromBeginning: true });
  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }:any) => {
      console.log({
        message: message.value.toString(),
      });
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
