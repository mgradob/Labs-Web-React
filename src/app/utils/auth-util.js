/**
 * Created by mgradob on 3/11/17.
 */
import * as Firebase from "firebase";
import * as RefUtil from "./refrerences-util";

/**
 * Signs in the user with the provided credentials.
 * @param userId
 * @param password
 * @returns {Promise}
 */
export function signInUser(userId, password) {
    return new Promise((resolve, reject) => {
        Firebase.auth().signInWithEmailAndPassword(userId + '@itesm.mx', password)
            .then(user => {
                console.log('Firebase', 'Sign in', 'Success', user.email);

                RefUtil.getUserReference(user.uid)
                    .once('value')
                    .then(userSnap => {
                        console.log('Firebase', 'Sign in', 'Found user', userSnap.val());
                        let user = userSnap.val();

                        resolve(user);
                    })
                    .catch(err => {
                        console.error('Firebase', 'Sign in', err);
                        reject(Error('Username not found'));
                    })
            })
            .catch(err => {
                console.error('Firebase', 'Sign in', err);
                switch (err.code) {
                    case 'auth/user-disabled':
                        break;
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        break;
                    default:
                        break;
                }

                reject(Error('Invalid username or password'));
            });
    });
}

/**
 * Signs out an user.
 * @returns {!firebase.Promise.<void>|firebase.Promise<any>}
 */
export function signOutUser() {
    return Firebase.auth().signOut();
}

/**
 * Gets the current signed user on the users table.
 * @returns {Promise}
 */
export function getCurrentUser() {
    return new Promise((resolve, reject) => {
        Firebase.auth().onAuthStateChanged((user) => {
            console.log('Firebase', 'Current user', user);

            if (user) {
                return RefUtil.getUserReference(user.uid)
                    .once('value')
                    .then((snap) => {
                        console.log('Firebase', 'Current user', snap.val());

                        resolve(snap.val());
                    })
                    .catch((err) => {
                        console.log(err);

                        reject(err);
                    });
            } else {
                reject(Error('User logged out'));
            }
        });
    })
}

/**
 * Monitor the status of the session, waiting for sign outs.
 * @returns {Promise}
 */
export function monitorSession() {
    return new Promise((resolve, reject) => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('Firebase', 'Session', 'Signed in', user);
            } else {
                console.log('Firebase', 'Session', 'Signed out', user);

                reject(Error('Signed out'));
            }
        })
    });
}