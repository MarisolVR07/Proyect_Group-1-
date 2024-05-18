import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import Header from "@/components/header/Header";
import MantSelfAssessment from "@/components/maintenance/self_assessment/MantSelfAssessment";

export default function Page() {
  return (
    <>
      <DebugModeToggle>
        <Header />
        <MantSelfAssessment />
      </DebugModeToggle>
    </>
  );
}
