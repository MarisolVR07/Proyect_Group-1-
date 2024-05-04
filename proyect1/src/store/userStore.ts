import { constants } from 'buffer'
import create from 'zustand';

//codigo asincrono
export interface Post { //Esto es un ejemplo; publicaciones que vienen del backend (hay usar fetch)
    id: number;
    title: string;
    body: string;
  } 

  interface UserState { //Los datos que se necesitas 
    posts: Post[];
    getPosts: () => Promise<void>; //Obtenerlo
  }

  //Todo lo que voy a devolver
export const useUserStore = create<UserState>((set) => 
({
    posts: [],
    getPosts: async () => {
        const posts = await (
          await fetch("https://jsonplaceholder.typicode.com/posts") //direccion donde pido los datos
        ).json();
        set((state) => ({ ...state, posts })) //obtengo el estado y actualizo todas
}}))


//En la pagina prinicpal se puede llamar
/*

useEffect(()=>{
    getPost()
}, [])   

*/ 