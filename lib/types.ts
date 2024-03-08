import { ReactNode } from "react";

interface NavItemProps {
    path: string;
    label: string;
    icon: ReactNode;
}

export interface NavGroupProps {
    icon: ReactNode; // Add this line
    label: string;
    children: NavItemProps[];
}