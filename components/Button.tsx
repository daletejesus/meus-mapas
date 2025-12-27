import { FaCheck, FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

type Props = {
    text: string,
    onClick: () => void;
}

export function PrimaryButton({ text, onClick }: Props) {
    return (
        <button className="w-full py-4 rounded-md bg-[#00ffa2] text-black font-bold flex items-center justify-center" onClick={onClick}><FaPlus /></button>
    )
}

export function ConfirmButton({ text, onClick }: Props) {
    return (
        <button className="w-full h-[50px] flex items-center justify-center gap-4 py-4 rounded-md bg-[#00ffa2] text-black font-bold" onClick={onClick}><FaCheck /> {text}</button>
    )
}

export function CancelButton({ text, onClick }: Props) {
    return (
        <button className="w-full h-[50px] flex items-center justify-center gap-2 py-4 rounded-md bg-[#4a5662] " onClick={onClick}><IoIosClose className="text-3xl"/> {text}</button>
    )
}