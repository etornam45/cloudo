import { DashIcon, HomeIcon, QuestionMarkCircledIcon, GearIcon, AvatarIcon } from "@radix-ui/react-icons";

export const NavBarItems = [
    {
        icon:  <DashIcon />,
        label: "Dashboard",
        children: [
            {
                path: "/",
                label: "Home",
                icon: <HomeIcon />,
            },
            {
                path: "/about",
                label: "About",
                icon: <QuestionMarkCircledIcon />,
            },
        ],
    },
    {
        icon: <GearIcon />,
        label: "Settings",
        children: [
            {
                path: "/settings",
                label: "General",
                icon: <GearIcon />,
            },
            {
                path: "/settings/profile",
                label: "Profile",
                icon: <AvatarIcon />,
            },
        ],
    },
];
