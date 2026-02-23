import {
    Home,
    ArrowRightLeft,
    Clock,
    Send
} from "lucide-react";

export const sidebarLinks = [
    {
        imgURL: Home,
        route: "/dashboard",
        label: "Home",
    },
    {
        imgURL: ArrowRightLeft,
        route: "/transfer",
        label: "Transfer",
    },
    {
        imgURL: Clock,
        route: "/transactions",
        label: "Transactions",
    },
    {
        imgURL: Send,
        route: "/p2p",
        label: "P2P Transfer",
    }
];
