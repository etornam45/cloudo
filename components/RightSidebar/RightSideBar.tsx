"use client"
import { openedRightSideBarAtom } from "@/lib/store.jotai";
import { atom, useAtom } from "jotai"




export default function RightSideBar() {
    const [RSOpened, setRSOpened] = useAtom(openedRightSideBarAtom);
    return (
        <>{RSOpened ? (<>
            <div className="w-[300px]">
                {header("Selected Folder")}
            </div>
        </>) : (<></>)
        }</>
    )
}

const header = (title: string) => {
    return (
        <div className="flex items-center gap-3 p-4">
            <h1 className="text-lg font-semibold">{title}</h1>
        </div>
    )
}