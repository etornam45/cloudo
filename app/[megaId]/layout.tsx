import Header from "@/components/Header/Header";
import { Separator } from "@/components/ui/separator";
import { Routes } from "@/lib/types";
import { ComponentsMap } from "@/lib/ui.constants";
import { ReactNode } from "react";

export default function LeftPageLayout({ params, children }: { children: ReactNode, params: { megaId: Routes } }) {
    return <>
        <div className="min-h-screen">
            <Header pageTitle={ComponentsMap[params.megaId].title} />
            <Separator />
            <div className="p-3"> 
                {children}
            </div>
        </div>
    </>
} 