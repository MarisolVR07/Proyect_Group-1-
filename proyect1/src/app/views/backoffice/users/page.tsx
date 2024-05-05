import Users from "@/components/maintenance/users/Users";
import Header from "@/components/header/Header";


export default function Page() {
    return (
        <main className="w-full h-full flex flex-col min-h-screen bg-gradient-to-br from-black via-100% via-violet-900  to-violet-800">
            <Header />
            <div className="items-center justify-center px-20 py-4"><Users/></div>
        </main>
    );
}