import { NavGroupProps } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";



/**
 * Represents a navigation group component in the sidebar.
 * @param {Object} props - The component props.
 * @param {NavGroupProps} props.item - The navigation group item.
 * @returns {JSX.Element} The rendered navigation group component.
 */
const NavGroup = ({ item }: { item: NavGroupProps }) => {
    const [open, setOpen] = useState(false);

    /**
     * Toggles the open state of the navigation group.
     */
    const toggle = () => {
        setOpen(!open);
    };

    return (
        <>
            <li className={`${open ? "open bg-zinc-300" : ""} p-4`}>
                <a href="#!" onClick={toggle} className="flex gap-3 items-center mb-3 font-sans text-base">
                    {/* {item.icon && item.icon} */}
                    {item.label}
                </a>
                <ul className="ml-4">
                    {item.children.map((child, i) => {
                        return (
                            <Link key={i} href={`/${child.renderId}`} className="flex gap-3 p-2 rounded-sm items-center w-full hover:bg-slate-200">
                                {child.icon && child.icon}

                                {child.label}</Link>
                        );
                    })}
                </ul>
            </li>
        </>
    );
}

export default NavGroup;