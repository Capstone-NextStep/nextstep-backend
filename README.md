# Rest API
## Prerequisites
Before proceeding, ensure you have the following installed and set up:

- Google Cloud SDK (for managing Firebase and other Google Cloud services)
- Node.js v20.14.0
- Docker (if needed for deployment)
- Postman (for testing REST APIs)

## Set up Firebase

Before you start the setup, you'll need to configure Firebase to work with your project:

1. Set up Firebase Project
- Go to the <a href="https://console.firebase.google.com">Firebase Console</a>
- Create a new project if you haven’t done so already.
- Set up Firebase Firestore or Realtime Database, depending on your project requirements.
- Set up Firebase Authentication (if needed).
After setting up Firebase, you'll get a Firebase config object with credentials such as API Key, Project ID, etc.
2. Create a Firebase Service Account Key
- Go to the Project Settings in the Firebase console.
- Under Service Accounts, click Generate New Private Key.
- Save the downloaded JSON file securely, as it contains sensitive information.
3. Set Firebase Configuration in .env
- In your project folder, navigate to your credentials file path and copy the relative path to `.env` file
4. Additional addon for backend
- Provide Cloud Storage Bucket to contains Machine Learning models
- Create Pub/Sub Topic for both of Machine Learning model deployments

Example `.env`:
```
STORAGE_CREDENTIALS=path-to-google-cloud-storage-credentials-file
PUBSUB_CREDENTIALS=path-to-pubsub-credentials-file
FIREBASE_CREDENTIALS=path-to-firebase-credentials
GCS_BUCKET_NAME=name-of-google-storage-bucket
```
## Build and run project
`npm run start`
Navigate to localhost:5000

## API Documentation
We published our API documentation, you can view it here <a href="https://docs.google.com/spreadsheets/d/1BYoo-XEQEeblnRURM9D6arKkrMlwVrhtl_2smJiRXio/edit?gid=0#gid=0">Documentation</a>

## Cloud Architecture 
<img src="https://photos.fife.usercontent.google.com/pw/AP1GczMjVBTux437dkIHQvhEMEWqNcOhSOxzowzVG43Am01vuYLijc0uUqLB9g=w960-h540-s-no-gm?authuser=0">