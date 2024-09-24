import { ReactNode } from "react";
import { Globe, ChefHat, PartyPopper } from "lucide-react";

interface iAppProps {
    name: string;
    title: string;
    image: ReactNode;
    id: number
}

export const categoryItems: iAppProps[] = [
    {
        id: 0,
        name: 'template',
        title: 'TEMPLATE',
        image: <Globe />,
    },
    {
        id: 1,
        name: 'uikit',
        title: 'UIKIT',
        image: <ChefHat />
    },
    {
        id : 2,
        name: "icon",
        title: "ICON",
        image: <PartyPopper />
    }
]