import Header from "@/components/header/Header";
import SelfAssessment from "@/components/self_assessment/SelfAssessment";

export default function Page() {
  return (
    <>
      <Header />
      <div className="px-8 py-4">
        <SelfAssessment />
      </div>
    </>
  );
}
