import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDdTcrw6aeWRnN-w0zmvDNrfe2gUEay4M0',
	authDomain: 'github-editor-1.firebaseapp.com',
	projectId: 'github-editor-1',
	storageBucket: 'github-editor-1.appspot.com',
	messagingSenderId: '576485856280',
	appId: '1:576485856280:web:5797f2e90ba20a54b51f6d',
	measurementId: 'G-73GRJG8CGR',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GithubAuthProvider();

export { auth, provider };
export default db;
