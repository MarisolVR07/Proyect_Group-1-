import Header from "@/components/header/Header";
import SelfAssessment from "@/components/self_assessment/SelfAssessment";


export default function Page() {
    return (
        <main className="w-full h-full flex flex-col min-h-screen bg-gradient-to-br from-black via-100% via-violet-900  to-violet-800">
           <Header/>
            <div className="px-32 py-4">
                <SelfAssessment/>
            </div>
        </main>
    );
}