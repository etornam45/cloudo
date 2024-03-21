import { DashIcon, HomeIcon, QuestionMarkCircledIcon, GearIcon, AvatarIcon, BoxIcon, StarIcon, ClockIcon, TrashIcon, Share1Icon, FileMinusIcon, FileIcon, DiscIcon } from "@radix-ui/react-icons";
import { ComponentMapItem, NavGroupProps, Routes } from "./types";
import { Button } from "@/components/ui/button";

export const NavBarItems: NavGroupProps[] = [
    {
        icon: <></>,
        label: "Overview",
        children: [{
            icon: <BoxIcon />,
            label: "Overview",
            renderId: "",
        }]
    },
    {
        icon: <DashIcon />,
        label: "File Manager",
        children: [
            {
                label: "Storage",
                icon: <DiscIcon />,
                renderId: "Storage"
            },
            {
                label: "Recents",
                renderId: "Recents",
                icon: <ClockIcon />,
            },
            {
                label: "Favorites",
                renderId: "Favorites",
                icon: <StarIcon />,
            },
            {
                label: "Trash",
                renderId: "Trash",
                icon: <TrashIcon />,
            },
        ],
    },
    {
        label: "Shared Files",
        icon: <Share1Icon />,
        children: [
            {
                icon: <FileMinusIcon />,
                label: "Folders",
                renderId: "Folders",
            },
            {
                icon: <FileIcon />,
                label: "Files",
                renderId: "Files"
            }
        ]
    },
    {
        icon: <GearIcon />,
        label: "Settings",
        children: [
            {
                renderId: "settings",
                label: "General",
                icon: <GearIcon />,
            },
            {
                renderId: "profile",
                label: "Profile",
                icon: <AvatarIcon />,
            },
        ],
    },
];




/**
 * Map of page component IDs to their corresponding React components.
 */
export const ComponentsMap: Record<Routes, ComponentMapItem> = {
    // Overview Section 
    "": {
        title: "Overview",
        component: <>Overiew</>
    },


    // File Manager Section
    "Storage": {
        title: "File Manager",
        component: <Button variant="outline"> A botton </Button> 
    },


    "Recents": {
        title: "File Manager",
        component: <>Recent Files</>
    },

    "Favorites": {
        title: "File Manager",
        component: <>Favorite Items</>
    },

    "Trash": {
        title: "File Manager",
        component: <>Trash </>
    },


    // Shared Files Section 
    "Folders": {
        title: "Shared Files",
        component: <>Shared Folders</>
    },
    "Files": {
        title: "Shared Files",
        component: <>Shared Files</>
    },
    Overview: {
        title: "Overview",
        component: <>Overview</>
    }
};
