import { Kafka } from "kafkajs";

const kafkajs = new Kafka({
    clientId: "processor",
    brokers: ["kafka-2b0b5831-aayushkumarhigh20021109-5587.d.aivencloud.com:20336"],
    ssl: true,
    sasl: {
        mechanism: "plain",
        username: "avnadmin",
        password: "AVNS_7IGDx3TvxNwV-s1flPh",
    },
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