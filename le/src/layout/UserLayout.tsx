import { Footer } from "@/page/Footer";
import { Header } from "@/page/Header";
import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <div className="flex flex-col p-4  min-h-screen  w-full  bg-primary">
      <Header />
      <main className="flex-1 px-4 max-w-screen mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
