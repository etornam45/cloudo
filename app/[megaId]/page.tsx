import { Routes } from "@/lib/types";
import { ComponentsMap } from "@/lib/ui.constants";

export default function Page({ params }: { params: { megaId: Routes } }){
    return <>
        <h1>{ComponentsMap[params.megaId].component}</h1>
    </>
}