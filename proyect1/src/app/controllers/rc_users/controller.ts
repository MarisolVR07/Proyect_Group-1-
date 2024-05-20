import { User } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";
//import { getError, validateObject, validateResponse } from "@/utils/utils";*/
const currentUrl = window.location.href;
const API_URL =
  currentUrl.split("/")[0] +
  "//" +
  currentUrl.split("//")[1].split("/")[0] +
  "/api/v2/";

export async function getUser(id: string): Promise<User | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_users/${id}`);
    //validateResponse(res);
    const user: User | ErrorResponse = await res.json();

    return user;
  } catch (error: any) {
    return error;
  }
}

export async function getUsersByName(
  name: string
): Promise<User[] | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_users/findname/${name}`);
    const users: User[] | ErrorResponse = await res.json();
    return users;
  } catch (error: any) {
    return error;
  }
}


export async function deleteUser(id: string): Promise<User | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_users/${id}`, {
      method: "DELETE",
    });
    //validateResponse(res);

    const user: User | ErrorResponse = await res.json();
    //  validateObject(user);
    return user;
  } catch (error: any) {
    return error;
  }
}

export async function saveUser(user: User): Promise<User | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    //validateResponse(res);

    const newUser: User | ErrorResponse = await res.json();
    //validateObject(newUser);
    return newUser;
  } catch (error: any) {
    return error;
  }
}

export async function getUsers(): Promise<User[] | ErrorResponse> {
  try {
    console.log(process.env.API_DIRECTION);
    const res: Response = await fetch(API_URL + "rc_users");
    //validateResponse(res);

    const users: User[] | ErrorResponse = await res.json();

    return users;
  } catch (error: any) {
    return error;
  }
}

export async function updateUser(user: User): Promise<User | ErrorResponse> {
  try {
    const res = await fetch(API_URL + `rc_users/${user.USR_Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const newUser: User | ErrorResponse = await res.json();
    return newUser;
  } catch (error: any) {
    return { error: error.message };
  }
}
