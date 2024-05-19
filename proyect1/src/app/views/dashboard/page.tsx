import Dashboard from "@/components/dashboard/Dashboard";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";




export default function Page() {
  return (
    <>
      <DebugModeToggle>
        <Header />
        <Dashboard />
        <Footer />
      </DebugModeToggle>
    </>
  );
}
