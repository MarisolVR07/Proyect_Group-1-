import Reports from "@/components/reports/Reports";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";

export default function Page() {
  return (
    <>
      <DebugModeToggle>
        <Header />
        <Reports />
        <Footer />
      </DebugModeToggle>
    </>
  );
}
