import Image from "next/image";
import Login from "@/app/components/Login";
import Register from "@/app/components/Register";
export default function Home() {

  return (

  <main className="w-full h-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-100% via-violet-900  to-violet-800">
  <div>
    <Login/>
  </div>
  </main>
 
 );
}
