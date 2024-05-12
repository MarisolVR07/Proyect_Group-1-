import Users from "@/components/maintenance/users/Users";
import Header from "@/components/header/Header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="items-center justify-center px-20 py-4">
        <Users />
      </div>
    </>
  );
}
