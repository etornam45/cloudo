import { NavGroupProps } from "@/lib/types";
import { Separator } from "@radix-ui/react-separator";
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
                            <li key={i} className="flex gap-3 items-center">
                                {child.icon && child.icon}
                                <a href={child.path}>{child.label}</a>
                            </li>
                        );
                    })}
                </ul>
            </li>
        </>
    );
}

export default NavGroup;