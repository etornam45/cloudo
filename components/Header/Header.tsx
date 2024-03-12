import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UserControls from "./UserControls";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function Header({ pageTitle }: { pageTitle: string }) {
    return (
        <div className="flex p-3 gap-3 justify-between items-center">
            <h2 className="font-bold">{pageTitle}</h2>
            <div className="search flex gap-2 ">
                <Input placeholder="Search here" />

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button>
                                <MagnifyingGlassIcon className="mr-2 h-4 w-4" /> Search
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Search for files and folders</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <UserControls />
        </div>
    )
}