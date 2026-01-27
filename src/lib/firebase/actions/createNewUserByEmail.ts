import { createUserWithEmailAndPassword } from "firebase/auth";
import { serverAuth } from "../admin";

interface UserInterface {
  email: string;
  password: string;
}

export async function createUserByEmail(newUser: UserInterface) {
  serverAuth.createUser();
}
