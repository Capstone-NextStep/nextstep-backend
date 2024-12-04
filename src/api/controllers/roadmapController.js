const admin = require("firebase-admin");
const db = admin.firestore();

exports.postRoadmap = async (req, res) => {
	try {
		const { id, career, steps } = req.body;

		if (!id || !career || !Array.isArray(steps)) {
			return res.status(400).json({error: 'Missing or Invalid Fields' });
		}

		const newRoadmap = {
			id,
			career,
			steps,
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		};

		const docRef = await db.collection('roadmaps').add(newRoadmap);
		res.status(201).json({ message: 'Roadmap created successfully', id: docRef.id})
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getRoadmapById = async (req, res) => {
	try {
		const roadmapId = req.params.id;
		const roadmapDoc = await db.collection('roadmaps').doc(roadmapId).get();

		if (!roadmapDoc.exists) {
			return res.status(404).json({ error: 'Roadmap Not Found'});
		}
		res.status(200).json({ roadmap: roadmapDoc.data() });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

exports.getAllRoadmaps = async (req, res) => {
	try {
		const roadmapSnapshot = await db.collection('roadmaps').get();
		const roadmaps = [];

		roadmapSnapshot.forEach(doc => {
			roadmaps.push({
				id: doc.id,
				...doc.data()
			});
		});

		res.status(200).json({ roadmaps });
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};