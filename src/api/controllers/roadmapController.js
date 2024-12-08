const admin = require("firebase-admin");
const db = admin.firestore();

exports.setRoadmap = async (req, res) => {
    try {
        const userId  = req.params.id;
        const career = req.body.career; // Ensure correct field name

        if (!userId || !career) {
            return res.status(400).json({ error: 'Missing userId or career' });
        }

        const userRef = db.collection('users').doc(userId);
        const roadmapsRef = db.collection('roadmaps');

        // Update user's career
        await userRef.update({ career });

        // Find matching roadmap
        const matchingRoadmapSnapshot = await roadmapsRef
            .where('career', '==', career)
            .get();

        if (matchingRoadmapSnapshot.empty) {
            return res.status(404).json({ error: 'No matching roadmap found' });
        }

        const matchingRoadmap = matchingRoadmapSnapshot.docs[0];
        const roadmapDict = matchingRoadmap.data();

        const roadmapProgress = (roadmapDict.steps || []).map(step => ({
            step,
            isDone: false
        }));

        await userRef.update({ roadmapProgress });
        res.status(201).json({ message: 'User Career and Roadmap progress updated successfully' });

    } catch (error) {
        console.error('Error in setRoadmap:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.postRoadmap = async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ error: 'Request body must be an array' });
        }

        for (const roadmap of req.body) {
            if (!roadmap.id || !roadmap.career || !roadmap.overview || !Array.isArray(roadmap.steps)) {
                return res.status(400).json({ error: 'Missing or Invalid Fields in one of the roadmaps' });
            }
        }

        // Add all roadmaps
        const results = await Promise.all(req.body.map(async (roadmap) => {
            const newRoadmap = {
                id: roadmap.id,
                career: roadmap.career,
                overview: roadmap.overview,
                steps: roadmap.steps,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            };
            const docRef = await db.collection('roadmaps').add(newRoadmap);
            return { id: docRef.id, career: roadmap.career };
        }));

        res.status(201).json({ 
            message: 'Roadmaps created successfully', 
            roadmaps: results 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRoadmapById = async (req, res) => {
    try {
        const roadmapId = String(req.params.id);         
        const querySnapshot = await db.collection('roadmaps').where('id', '==', roadmapId).get();

        if (querySnapshot.empty) {
            console.log(`No roadmap found with ID: ${roadmapId}`);
            return res.status(404).json({ error: 'Roadmap Not Found', id: roadmapId });
        }

        const doc = querySnapshot.docgets[0];
        const roadmap = doc.data();

        res.status(200).json({
            roadmap: roadmap,
        });
    } catch (error) {
        console.error('Error fetching roadmap:', error);
        res.status(500).json({ error: error.message });
    }
};


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