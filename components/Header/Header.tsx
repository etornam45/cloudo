import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UserControls from "./UserControls";

export default function Header({pageTitle}: {pageTitle: string}){
    return(
        <div className="flex p-3 gap-3 justify-between items-center">
            <h2 className="font-bold">{pageTitle}</h2>
            <div className="search flex gap-2 ">
                <Input placeholder="Search" />
                <Button>Search here</Button>
            </div>
            <UserControls />
        </div>
    )
}