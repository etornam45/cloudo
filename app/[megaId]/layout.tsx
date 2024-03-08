import { Routes } from "@/lib/types";
import { ComponentsMap } from "@/lib/ui.constants";
import { ReactNode } from "react";

export default function LeftPageLayout({ params, children }: { children: ReactNode,params: { megaId: Routes } }){
    return<>
        {ComponentsMap[params.megaId].title}
        {children}
    </>
} 