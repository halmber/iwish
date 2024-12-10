import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./config";

export const addDataToCollection = async <T>(
  collectionName: string,
  data: T,
) => {
  if (!data) {
    throw new Error(
      "Error while adding to firestore: Data cannot be undefined",
    );
  }

  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return { id: docRef.id, ...data };
  } catch (error) {
    throw new Error(`Failed to add data to ${collectionName}: ${error}`);
  }
};

/**
 * Creates a new user document in the `users` collection.
 *
 * @param userId - The unique identifier for the user.
 * @param username - The name of the user.
 * @param email - The email address of the user.
 */
export const createUser = async (
  userId: string,
  username: string,
  email: string,
) => {
  const userRef = doc(db, "users", userId);
  try {
    await setDoc(userRef, {
      username,
      email,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw new Error(`Failed to add user: ${error}`);
  }
};

/**
 * Creates a new list in the `lists` subcollection for a specific user.
 *
 * @param userId - The ID of the user the list belongs to.
 * @param name - The name of the list.
 * @param type - The type of the list.
 * @param visibility - The visibility of the list.
 */
export const createList = async (
  userId: string,
  name: string,
  type: "wishlist" | "watchlist",
  visibility: "private" | "public",
) => {
  const listsCollectionRef = collection(db, `users/${userId}/lists`);
  try {
    await addDoc(listsCollectionRef, {
      name,
      type,
      visibility,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw new Error(`Failed to add list: ${error}`);
  }
};

/**
 * Creates a new item in the `items` subcollection within a specific list.
 * @param userId - ID of the user.
 * @param listId - ID of the list.
 * @param item - Item data of generic type T.
 */
export const createListItem = async <T>(
  userId: string,
  listId: string,
  item: T,
) => {
  const itemsCollectionRef = collection(
    db,
    `users/${userId}/lists/${listId}/items`,
  );

  try {
    await addDoc(itemsCollectionRef, {
      ...item,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    throw new Error(`Failed to add item: ${error}`);
  }
};
