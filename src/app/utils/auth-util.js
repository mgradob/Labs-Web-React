/**
 * Created by mgradob on 3/11/17.
 */
import * as Firebase from "firebase";

/**
 * Gets the current signed user on the users table.
 * @returns {Promise}
 */
export function getCurrentUser() {
    this.usersRef = Firebase.database().ref().child('users');

    return new Promise((resolve, reject) => {
        Firebase.auth().onAuthStateChanged((user) => {
            console.log('Firebase', 'Current user', user.email.split('@', 1)[0].toUpperCase());

            if (user) {
                let userId = user.email.split('@', 1)[0].toUpperCase();

                return this.usersRef.child(userId)
                    .once('value')
                    .then((snap) => {
                        console.log('Firebase', 'Labs', snap.val());

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