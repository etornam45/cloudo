"use client";
import Header from "@/components/Header/Header";
import { Separator } from "@/components/ui/separator";
import Overiew from "@/pages/overview/overview";
import { logggedInUserAtom } from "@/lib/store.jotai";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { toast } from "sonner";
import { UserI } from "@/lib/prisma";

export default function Home() {
  const [user, setUser] = useAtom(logggedInUserAtom);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("user") as string) as UserI | null;
    if (!activeUser) {
      window.location.href = "/auth/login";
    }
  }, [])

  // console.log(user)
  return (
    <>
      {user ? (<div className="min-h-screen">
        <Header pageTitle="Overview" />
        <Separator />
        <Overiew />
      </div>) : <>
        <div className="absolute h-screen w-screen bg-black">
          loading...
        </div>
      </>}
    </>
  );
}
