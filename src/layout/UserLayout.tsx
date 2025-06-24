import { Outlet } from "react-router-dom";

export const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen  w-full  bg-gray-100 ">
      <main className="flex-1 max-w-screen mx-auto w-full ">
        <Outlet />
      </main>
    </div>
  );
};
