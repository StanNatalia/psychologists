import { child, get, getDatabase, ref } from "firebase/database";
import { app } from "../firebase";

export const getPsychologistsFromFirebase = async () => {
  const dbRef = ref(getDatabase(app));

  try {
    const snapshot = await get(child(dbRef, "psychologists"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
