import { HamburgerIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-bold">Hi!</h1>
      <HamburgerIcon />
    </div>
  );
};
