import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./config";
import { List } from "@/features/lists/types";
import { Wish } from "@/features/wishes/types";

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
  description: string,
) => {
  const listsCollectionRef = collection(db, `users/${userId}/lists`);
  try {
    const newListData = {
      name,
      type,
      visibility,
      description,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(listsCollectionRef, newListData);

    return { id: docRef.id, items: [] as Wish[], ...newListData };
  } catch (error) {
    throw new Error(`Failed to add list: ${error}`);
  }
};

/**
 * Updates the data of a specific list for a given user.
 *
 * @param userId - The ID of the user the list belongs to.
 * @param listId - The ID of the list to update.
 * @param updatedData - An object containing the fields to update.
 * @returns The updated list data.
 */
export const updateList = async (
  userId: string,
  listId: string,
  updatedData: Partial<{
    name: string;
    visibility: "private" | "public";
    description: string;
  }>,
) => {
  const listDocRef = doc(db, `users/${userId}/lists/${listId}`);

  try {
    await updateDoc(listDocRef, {
      ...updatedData,
    });

    return { id: listId, ...updatedData };
  } catch (error) {
    throw new Error(`Failed to update the list: ${error}`);
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
    const docRef = await addDoc(itemsCollectionRef, {
      ...item,
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, ...item };
  } catch (error) {
    throw new Error(`Failed to add item: ${error}`);
  }
};

/**
 * Deletes a list and its associated items for a specific user.
 * @todo Degug and Optimize as nedded. See https://firebase.google.com/docs/firestore/manage-data/delete-data
 * @param userId - The ID of the user.
 * @param listId - The ID of the list to delete.
 */
export async function deleteList(userId: string, listId: string) {
  const listDocRef = doc(db, `users/${userId}/lists/${listId}`);
  const itemsCollectionRef = collection(
    db,
    `users/${userId}/lists/${listId}/items`,
  );

  try {
    // Delete all items in the list
    const itemsSnapshot = await getDocs(itemsCollectionRef);
    const itemDeletePromises = itemsSnapshot.docs.map((itemDoc) =>
      deleteDoc(itemDoc.ref),
    );
    await Promise.all(itemDeletePromises);

    // Delete the list itself
    await deleteDoc(listDocRef);
  } catch (error) {
    throw new Error(`Failed to delete the list. ${error}`);
  }
}

/**
 * Deletes a specific wish from a given list in Firestore.
 *
 * @param userId - ID of the user.
 * @param listId - ID of the list containing the wish.
 * @param wishId - ID of the wish to delete.
 */
export const deleteWish = async (
  userId: string,
  listId: string,
  wishId: string,
) => {
  const wishDocRef = doc(db, `users/${userId}/lists/${listId}/items/${wishId}`);

  try {
    await deleteDoc(wishDocRef);
  } catch (error) {
    throw new Error(`Failed to delete the wish: ${error}`);
  }
};

/**
 * Fetches all lists of a specific user.
 * @param userId - ID of the user.
 */
export const getUserLists = async (userId: string) => {
  const listsCollectionRef = collection(db, `users/${userId}/lists`);
  const listsSnapshot = await getDocs(listsCollectionRef);
  const lists = listsSnapshot.docs.map((doc) => ({
    id: doc.id,
    items: [] as Wish[],
    ...doc.data(),
  })) as List[];
  return lists;
};

/**
 * Fetches all items of a specific list for a user.
 * @param userId - ID of the user.
 * @param listId - ID of the list.
 */
export const getListItems = async <T>(userId: string, listId: string) => {
  const itemsCollectionRef = collection(
    db,
    `users/${userId}/lists/${listId}/items`,
  );
  const itemsSnapshot = await getDocs(itemsCollectionRef);
  const items = itemsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as (T & { id: string; createdAt: string })[];
  return items;
};

/**
 * Updates a specific wish in a given list in Firestore.
 *
 * @param userId - ID of the user.
 * @param listId - ID of the list containing the wish.
 * @param wishId - ID of the wish to update.
 * @param updatedData - Object containing the updated fields and their values.
 */
export const updateWish = async (
  userId: string,
  listId: string,
  wishId: string,
  updatedData: Partial<Wish>,
) => {
  const wishDocRef = doc(db, `users/${userId}/lists/${listId}/items/${wishId}`);

  try {
    await updateDoc(wishDocRef, updatedData);

    return { id: wishId, ...updatedData };
  } catch (error) {
    throw new Error(`Failed to update the wish: ${error}`);
  }
};
