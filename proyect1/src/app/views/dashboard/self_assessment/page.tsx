import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import Header from "@/components/header/Header";
import SelfAssessment from "@/components/self_assessment/SelfAssessment";

export default function Page() {
  return (
    <>
      <DebugModeToggle>
        <Header />
          <SelfAssessment />
      </DebugModeToggle>
    </>
  );
}
