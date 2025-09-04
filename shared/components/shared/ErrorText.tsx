import { cn } from "@/shared/lib/utils";

interface Props{
    text: string;
    className?: string;
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
    return (
        <p className={cn('text-red-500 text-xs md:text-sm', className)}>{text}</p>
    )
}