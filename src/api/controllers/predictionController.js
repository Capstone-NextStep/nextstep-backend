const { PubSub } = require("@google-cloud/pubsub");
const pubsub = new PubSub({
	keyFilename: 'credentials-pubsub.json'
});

exports.getPrediction = async (req, res) => {
	try {
		const { userId }  = req.body;
        const inputData = req.body;

		const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2,9)}`;

		const topic = pubsub.topic("ml-prediction-request");
		await topic.publishMessage({
            data: Buffer.from(JSON.stringify({
                request_id: requestId,
				user_id: userId,
                input_data: inputData
            })) 
		});

		res.status(202).json({
			message: "Prediction request received",
			requestId
		});
	} catch (error) {
		console.error('Error while predicting the data:', error);
		res.status(500).json({ error: "Internal server error" });
	}
}


