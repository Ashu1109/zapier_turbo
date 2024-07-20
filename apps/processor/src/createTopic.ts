import { Kafka } from "kafkajs";
const kafkajs = new Kafka({
    clientId: "processor",
    brokers: ["localhost:9092"],
    });
const admin = kafkajs.admin();
const topic = "zap-events";
const createTopic = async () => {
    await admin.connect();
    await admin.createTopics({
        topics: [{ topic }],
    });
    await admin.disconnect();
};
createTopic();