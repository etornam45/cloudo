"use client";

import { NavGroupProps } from "@/lib/types";
import { Separator } from "../ui/separator";
import NavGroup from "./NavGroup";
import { AvatarIcon, DashIcon, GearIcon, HomeIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { NavBarItems } from "@/lib/ui.constants";

const SideBar = () => {

    const items: NavGroupProps[] = NavBarItems


    return (
        <div className=" w-full h-full">
            <h1 className="text-xl font-bold text-blue-600 m-4">Cloudo</h1>
            <Separator />
            <ul>
                {items.map((item, i) => {
                    return (<span key={i}>
                        <NavGroup item={item} />
                        <Separator />
                    </span>);
                })}
            </ul>
        </div>
    );
}

export default SideBar;