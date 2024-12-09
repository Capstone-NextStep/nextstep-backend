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
- In your project folder, create or edit the .env file to add Firebase configuration. You will need to set up Firebase credentials, such as your API key, project ID, and service account credentials.

Example `.env`:
```FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
FIREBASE_PRIVATE_KEY_PATH=./path/to/your/serviceAccountKey.json
```
## Build and run project
`npm run serve`
Navigate to localhost:8080

## API Documentation
We published our API documentation, you can view it here <a href="https://docs.google.com/spreadsheets/d/1BYoo-XEQEeblnRURM9D6arKkrMlwVrhtl_2smJiRXio/edit?gid=0#gid=0">Documentation</a>

## Cloud Architecture 
<img src="https://cdn.discordapp.com/attachments/1229495124535545978/1315695875829534774/2791f83d-05b7-47ba-8850-e583993aff69.png?ex=675858c5&is=67570745&hm=c4755493b6311c900d2e002305b9b053acd11602eb69c19ccd3072063fba7448&">

## Contributors
- Muhammad Rayhan Saputra
- Bryant Firsta Agdinto
