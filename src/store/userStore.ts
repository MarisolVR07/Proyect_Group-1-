import { create } from "zustand";
import {
  getUser,
  deleteUser,
  saveUser,
  getUsers,
  updateUser,
  getUsersByName,
  getUsersByRole,
  getUsersPerPage,
  getNewUsersPerPage
} from "@/app/controllers/rc_users/controller";
import { User } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface UserState {
  users: User[];
  currentUser: User | null;
  getUser: (id: string) => Promise<User | ErrorResponse>;
  deleteUser: (id: string) => Promise<User | ErrorResponse>;
  saveUser: (user: User) => Promise<User | ErrorResponse>;
  getUsers: () => Promise<User[] | ErrorResponse>;
  updateUser: (user: User) => Promise<User | ErrorResponse>;
  getUsersByName: (
    name: string,
    page: number
  ) => Promise<User[] | ErrorResponse>;
  getUsersPerPage: (page: number) => Promise<User[] | ErrorResponse>;
  getNewUsersPerPage: (page: number) => Promise<User[] | ErrorResponse>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  getUser: async (id: string) => {
    const user = await getUser(id);
    if ("error" in user) {
      return user;
    }
    set((state) => ({ ...state, users: [...state.users, user], currentUser: user }));
    return user;
  },
  deleteUser: async (id: string) => {
    const user = await deleteUser(id);
    if ("error" in user) {
      return user;
    }
    set((state) => ({
      ...state,
      users: state.users.filter((u) => u.USR_Email !== id),
    }));
    return user;
  },
  saveUser: async (user: User) => {
    const newUser = await saveUser(user);
    if ("error" in newUser) {
      return newUser;
    }
    set((state) => ({ ...state, users: [...state.users, newUser], currentUser: newUser }));
    return newUser;
  },
  getUsers: async () => {
    const users = await getUsers();
    if ("error" in users) {
      return users;
    }
    set((state) => ({ ...state, users }));
    return users;
  },
  updateUser: async (user: User) => {
    const updatedUser = await updateUser(user);
    console.log('Actualizando usuario:', updatedUser);
    if ("error" in updatedUser) {
      return updatedUser;
    }
    set((state) => ({
      ...state,
      users: state.users.map((u) =>
        u.USR_Email === user.USR_Email ? updatedUser : u
      ),
    }));
    return updatedUser;
  },
  getUsersByName: async (name: string, page: number) => {
    const users = await getUsersByName(name, page);
    if ("error" in users) {
      return users;
    }
    set((state) => ({ ...state, users }));
    return users;
  },
  getUsersPerPage: async (page: number) => {
    const users = await getUsersPerPage(page);
    if ("error" in users) {
      return users;
    }
    set((state) => ({ ...state, users }));
    return users;
  },
  getNewUsersPerPage: async (page: number) => {
    const users = await getNewUsersPerPage(page);
    if ("error" in users) {
      return users;
    }
    set((state) => ({ ...state, users }));
    return users;
  }

}));