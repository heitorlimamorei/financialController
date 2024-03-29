import { db } from "../../firebase/config";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
interface userProps {
  id: string;
  sheetIds: string[];
  name: string;
  email: string;
}
interface newUser {
  name: string;
  email: string;
}
async function getAllUsers() {
  let normalizado = [];
  const usersRef = collection(db, `users`);

  const users = await getDocs(usersRef);

  users.forEach((user) => {
    normalizado.push({ id: user.id, ...user.data() });
  });
  return normalizado;
}
async function getUserById(userId: string) {
  const userRef = doc(db, `users/${userId}`);
  const user: any = await getDoc(userRef);
  return { id: user.id, ...user.data() };
}
async function getUserByEmail(email: string) {
  let normalizado = [];
  const usersRef = collection(db, `users`);
  const userQuery = query(usersRef, where("email", "==", email));
  const users = await getDocs(userQuery);
  if (users.size > 0) {
    users.forEach((user) => {
      normalizado.push({ id: user.id, ...user.data() });
    });
    return normalizado[0];
  } else {
    return false;
  }
}
async function createUser(newUser: newUser) {
  const usersRef = collection(db, `users`);
  const userRef = await addDoc(usersRef, { sheetIds: [], ...newUser });
  return await getUserById(userRef.id);
}
async function updateSheetList(id: string, sheetIdsUpdated: string[]) {
  const userRef = doc(db, `users/${id}`);
  const docRef = await updateDoc(userRef, {
    sheetIds: sheetIdsUpdated,
  });
  return await getUserById(id);
}
async function updateUser(updateUser: userProps) {
  const userRef = doc(db, `users/${updateUser.id}`);
  const docRef = await updateDoc(userRef, {
    name: updateUser.name,
    email: updateUser.email,
    sheetIds: updateUser.sheetIds,
  });
  return await getUserById(updateUser.id);
}
async function deleteUser(id: string) {
  const userRef = doc(db, `user/${id}`);
  const docRef = await deleteDoc(userRef);
}

async function userExistsByEmail(email: string) {
  return (await getUserByEmail(email)) ? true : false;
}

export default {
  getUserByEmail,
  getAllUsers,
  createUser,
  updateSheetList,
  updateUser,
  deleteUser,
  userExistsByEmail
};
