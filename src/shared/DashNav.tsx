import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface DashNavProps {
  address: string;
  name: string;
  icon: React.ReactNode;
}

const DashNav = ({ address, name, icon }: DashNavProps) => {
  return (
    <Link href={address} className="!bg-[#28a745]">
      <Button className="flex items-center justify-center gap-3  w-full text-[16px] border border-red-600 py-2 rounded-lg">
        <h1>{icon}</h1>
        <h1>{name}</h1>
      </Button>
    </Link>
  );
};

export default DashNav;
