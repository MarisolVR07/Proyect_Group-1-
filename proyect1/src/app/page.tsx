import Image from "next/image";
import Login from "@/components/Login";
import Register from "@/components/Register";
export default function Home() {

  return (

    <main className="w-full h-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-black   to-violet-900">
      <Login />
    </main>

  );
}
