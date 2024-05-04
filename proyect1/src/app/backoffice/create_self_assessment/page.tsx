import Header from "@/components/header/Header";
import MantSelfAssessment from "@/components/maintenance/self_assessment/MantSelfAssessment";


export default function Page() {
    return (
        <main className="w-full h-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-100% via-violet-900  to-violet-800">
            <Header />
            <MantSelfAssessment />
        </main>
    );
}