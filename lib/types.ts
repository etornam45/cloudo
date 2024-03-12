import { ReactNode } from "react";

interface NavItemProps {
    renderId: Routes;
    label: Routes ;
    icon: ReactNode;
    // parent: Routes
}

export interface NavGroupProps {
    icon: ReactNode; // Add this line
    renderId?: Routes;
    label: RouteGroups;
    children: NavItemProps[];
}


export type RouteGroups = 
    | "Overview"
    | "File Manager"
    | "Shared Files"
    | "Settings"
    | "Team Storage"
    ;

export type Routes = 
    | ""
    | "Overview"
    | "Storage"
    | "Recents"
    | "Favorites"
    | "Trash"
    | "Folders"
    | "Files"
    ;

export interface ComponentMapItem {
    title: RouteGroups;
    component: ReactNode;
}