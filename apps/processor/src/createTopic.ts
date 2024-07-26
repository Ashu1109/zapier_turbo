import { Kafka } from "kafkajs";

const kafkajs = new Kafka({
    clientId: "processor",
    brokers: ["localhost:9092"],
});

const admin = kafkajs.admin();
const topic = "zap-events";

const createTopic = async () => {
    await admin.connect();

    const topicMetadata = await admin.fetchTopicMetadata({ topics: [topic] });
    const topicExists = topicMetadata.topics.length > 0;

    if (!topicExists) {
        await admin.createTopics({
            topics: [{ topic }],
        });
        console.log(`Topic '${topic}' created successfully.`);
    } else {
        console.log(`Topic '${topic}' already exists.`);
    }

    await admin.disconnect();
};

createTopic();