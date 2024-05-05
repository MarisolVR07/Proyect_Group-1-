import { create } from 'zustand';
import { getUser, deleteUser, saveUser, getUsers, updateUser } from '@/app/controllers/rc_users/controller';
import { rc_users } from "@prisma/client";
import { ErrorResponse } from "@/app/types/api";

type User = rc_users

interface UserState {
  users: User[];
  getUser: (id: string) => Promise<User | ErrorResponse>;
  deleteUser: (id: string) => Promise<User | ErrorResponse>;
  saveUser: (user: User) => Promise<User | ErrorResponse>;
  getUsers: () => Promise<User[] | ErrorResponse>;
  updateUser: (user: User) => Promise<User | ErrorResponse>;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  getUser: async (id: string) => {
    const user = await getUser(id);
    if ('error' in user) {
      return user;
    }
    set((state) => ({...state, users: [user] }));
    return user;
  },
  deleteUser: async (id: string) => {
    const user = await deleteUser(id);
    if ('error' in user) {
      return user;
    }
    set((state) => ({...state, users: state.users.filter((u) => u.USR_Email!== id) }));
    return user;
  },
  saveUser: async (user: User) => {
    const newUser = await saveUser(user);
    if ('error' in newUser) {
      return newUser;
    }
    set((state) => ({...state, users: [...state.users, newUser] }));
    return newUser;
  },
  getUsers: async () => {
    const users = await getUsers();
    if ('error' in users) {
      return users;
    }
    set((state) => ({...state, users }));
    return users;
  },
  updateUser: async (user: User) => {
    const updatedUser = await updateUser(user);
    if ('error' in updatedUser) {
      return updatedUser;
    }
    set((state) => ({
     ...state,
      users: state.users.map((u) => (u.USR_Email === user.USR_Email? updatedUser : u)),
    }));
    return updatedUser;
  },
}));