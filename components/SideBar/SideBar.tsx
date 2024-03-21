"use client";

import { NavGroupProps } from "@/lib/types";
import { Separator } from "../ui/separator";
import NavGroup from "./NavGroup";
import { AvatarIcon, DashIcon, GearIcon, HomeIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { NavBarItems } from "@/lib/ui.constants";
import { logggedInUserAtom } from "@/lib/store.jotai";
import { useAtom } from "jotai";

//  I added auth check to the sidebar component
//  to prevent unauthorized access to the dashboard
//  if the user is not logged in.
//  which by default causes a glitch in the UI (showing the sidebar) 


const SideBar = () => {

    const items: NavGroupProps[] = NavBarItems
    const [user, setUser] = useAtom(logggedInUserAtom)

    return (
        <>
            {
                user ? (
                    <>
                        <div className=" w-full h-full" >
                            <h1 className="text-2xl items-center flex font-bold text-blue-600 m-4 my-5">Cloudo</h1>
                            <Separator />
                            <ul>
                                {items.map((item, i) => {
                                    return (<span key={i}>
                                        <NavGroup item={item} />
                                        <Separator />
                                    </span>);
                                })}
                            </ul>
                        </div >
                    </>) : <>
                </>}
        </>
    );
}

export default SideBar;