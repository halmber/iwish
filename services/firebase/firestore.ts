import { addDoc, collection } from "firebase/firestore";
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
