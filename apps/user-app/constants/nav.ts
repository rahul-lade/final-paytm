import {
    Home,
    ArrowRightLeft,
    Clock,
    Send
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ISidebarLink {
    icon: LucideIcon;
    route: string;
    label: string;
    pageTitle: string;
}

const sidebarLinks: ISidebarLink[] = [
    {
        icon: Home,
        route: "/dashboard",
        label: "Home",
        pageTitle: "Dashboard",
    },
    {
        icon: ArrowRightLeft,
        route: "/transfer",
        label: "Transfer",
        pageTitle: "Transfer Money",
    },
    {
        icon: Clock,
        route: "/transactions",
        label: "Transactions",
        pageTitle: "Transaction History",
    },
    {
        icon: Send,
        route: "/p2p",
        label: "P2P Transfer",
        pageTitle: "Send Money",
    },
];

export { sidebarLinks };
export type { ISidebarLink };
