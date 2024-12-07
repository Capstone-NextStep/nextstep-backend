require('dotenv').config();

const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub({ keyFilename: process.env.PUBSUB_CREDENTIALS });

exports.getPrediction = async (req, res) => {
	try {
        const inputData = req.body;

		const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2,9)}`;

		const topic = pubsub.topic("ml-prediction-request");
		await topic.publishMessage({
            data: Buffer.from(JSON.stringify({
                request_id: requestId,
                input_data: inputData.skills
            })) 
		});

		const result = await waitForPrediction(requestId);
		return res.json(result)
		
	} catch (error) {
		console.error('Error while predicting the data:', error);
		res.status(500).json({ error: "Internal server error" });
	}
}

async function waitForPrediction(requestId) {
    return new Promise((resolve, reject) => {
        const subscription = pubsub.subscription('ml-result');

        const messageHandler = (message) => {
            try {
                const data = JSON.parse(message.data.toString());

                if (data.request_id === requestId) {
                    subscription.removeListener('message', messageHandler);
                    message.ack();
                    resolve(data);
                }
            } catch (error) {
                reject(error);
            }
        };

        subscription.on('message', messageHandler);
        subscription.on('error', (error) => {
            console.error('Subscription error:', error);
            reject(error);
        });

        setTimeout(() => {
            subscription.removeListener('message', messageHandler);
            reject(new Error('Prediction timeout'));
        }, 30000);
    });
}

