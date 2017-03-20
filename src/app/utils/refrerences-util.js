/**
 * Created by mgradob on 3/19/17.
 */
import * as Firebase from "firebase";

//region Labs
/**
 * Returns a reference to the labs root.
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
export function getLabsReference() {
    return Firebase.database().ref().child('labs');
}

/**
 * Returns a reference to the specified lab.
 * @param labId
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
export function getLabReference(labId) {
    return getLabsReference().child(labId);
}

/**
 * Returns a reference to the specified lab categories.
 * @param labId
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
export function getLabCategoriesReference(labId) {
    return getLabReference(labId).child('categories');
}

/**
 * Returns a reference to the specified lab category.
 * @param labId
 * @param categoryId
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
export function getCategoryReference(labId, categoryId) {
    return getLabCategoriesReference(labId).child(categoryId);
}

/**
 * Returns a reference to the specified category items.
 * @param labId
 * @param categoryId
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
export function getCategoryItemsReference(labId, categoryId) {
    return getCategoryReference(labId, categoryId).child('items');
}

/**
 * Returns a reference to the specified item in a category.
 * @param labId
 * @param categoryId
 * @param itemId
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
export function getItemReference(labId, categoryId, itemId) {
    return getCategoryItemsReference(labId, categoryId).child(itemId);
}
//endregion

//region Users
/**
 * Returns a reference to the users root.
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
export function getUsersReference() {
    return Firebase.database().ref().child('users');
}

/**
 * Returns a reference to a specific user.
 * @param userId
 * @returns {firebase.database.Reference|!firebase.database.Reference}
 */
export function getUserReference(userId) {
    return getUsersReference().child(userId);
}
//endregion