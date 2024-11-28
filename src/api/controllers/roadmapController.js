const admin = require("firebase-admin");
const db = admin.firestore();


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