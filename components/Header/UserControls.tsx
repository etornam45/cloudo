"use client";
// import { useAtom } from "jotai";
import { Button } from "../ui/button";
import { logggedInUserAtom } from "@/lib/store.jotai";
// import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAtom } from "jotai";

export default function UserControls() {

  const [user, setUser] = useAtom(logggedInUserAtom);
  const router = useRouter();

  function signOut() {

    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        setUser(null);
        window.location.href = "/auth/login";
      }
    }).catch((error) => {
      toast("Error signing out", {
        icon: <CrossCircledIcon color="red" />,
        description: "Please try again",
      })
    })
  }

  if (user) {
    return <div className="flex gap-2 items-center hover:bg-slate-500/10 cursor-pointer p-1 rounded-md" >
      <Avatar>
        <AvatarImage className="rounded-full" width={35} height={35} src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>{user.username.split("")[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <h3 className="font-bold">{user.username}</h3>
        <p className="text-xs">{user.email}</p>
      </div>
      <Button variant={"outline"} onClick={signOut}>Sign Out</Button>
    </div>;
  }

  return <div className="flex gap-4">
    <Button variant={"outline"}>Sign In</Button>
    <Button>Sign Up</Button>
  </div>;
}