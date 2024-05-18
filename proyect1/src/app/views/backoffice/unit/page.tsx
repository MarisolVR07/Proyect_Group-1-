import Institution from "@/components/maintenance/departments_unit/DepartmentsUnit";
import Header from "@/components/header/Header";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";

export default function Page() {
  return (
    <>
      <DebugModeToggle>
        <Header />
        <Institution />
      </DebugModeToggle>
    </>
  );
}
