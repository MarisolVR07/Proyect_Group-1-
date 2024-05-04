import Institution from "@/components/maintenance/institution/Institution";
import Header from "@/components/header/Header";


export default function Page() {
    return (
        <main className=" w-full h-full flex flex-col min-h-screen bg-gradient-to-br from-black via-100% via-violet-900  to-violet-800">
                <Header />
                <Institution/>
        </main>
    );
}