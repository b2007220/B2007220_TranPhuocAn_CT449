import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBM64JaXUrP1BIHBdBqIGxW4yuR3bNxOn4',
	authDomain: 'store-216c0.firebaseapp.com',
	projectId: 'store-216c0',
	storageBucket: 'store-216c0.appspot.com',
	messagingSenderId: '345491664263',
	appId: '1:345491664263:web:08b89b86f28cb9309df722',
	measurementId: 'G-M8W99YTXZN',
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);
