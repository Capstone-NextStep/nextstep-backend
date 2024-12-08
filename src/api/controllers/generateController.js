const admin = require("firebase-admin");
const db = admin.firestore();
const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub({ keyFilename: process.env.PUBSUB_CREDENTIALS });

exports.getGenerateTemplate = async (req, res) => {
    try {
        const userId = req.params.id;
        
        const userDoc = await db.collection('users').doc(userId).get();
        
        if (!userDoc.exists) {
            console.log(`No user found with ID: ${userId}`);
            return res.status(404).json({ error: 'User Not Found', id: userId });
        }

        const userData = userDoc.data();
        const career = userData.career;

        if (!career) {
            console.log(`No career found for user: ${userId}`);
            return res.status(404).json({ error: 'Career Not Found', id: userId });
        }

		const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2,9)}`;

		const topic = pubsub.topic("ml-generate-request");
		await topic.publishMessage({
            data: Buffer.from(JSON.stringify({
                request_id: requestId,
				career: career
            })) 
		});

        const result = await waitForGenerate(requestId);
		return res.json(result)

    } catch (error) {
        console.error('Error fetching generated template:', error);
        res.status(500).json({ error: error.message });
    }
};

async function waitForGenerate(requestId) {
    return new Promise((resolve, reject) => {
        const subscription = pubsub.subscription('ml-generate-result-sub');

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