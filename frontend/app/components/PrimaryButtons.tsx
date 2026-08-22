import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export const PrimaryButtons = ({ children, onClick, className }: {
    children :React.ReactNode,
    onClick : () => void,
    className?: string
}) => (
    <Button className={cn("hover:cursor-pointer w-fit min-w-36 min-h-11 px-5 text-base bg-white text-slate-950 hover:bg-slate-950 hover:text-white", className)} type="button" onClick={onClick} id="font">
        {children}
    </Button>
);






