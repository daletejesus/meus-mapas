import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

type Props = {
    title: string;
    pontos?: number;
    isSelected: boolean;
    onClick: () => void;
    exclude: () => void;
}

export function ListItemMapas({title, pontos, onClick, exclude}: Props) {
    return (
        <div className={`w-full h-[70px] flex bg-[#121724] rounded-md px-8`} onClick={onClick}>
            <div className="w-[95%] flex flex-col justify-center">
                <label className="text-lg font-bold">{title}</label>

                {pontos == 0 ? <label className="text-md">Nenhum ponto disponivel</label> : <label className="text-md">{pontos} pontos disponiveis</label>}
            </div>
            <div className="z-0 w-[5%] flex items-center justify-center items-right">
                <FaTrashAlt onClick={(e) => { 
                    e.stopPropagation(); // Evita que o clique no ícone dispare o onClick do item pai
                    exclude()
                }}/>
            </div>
        </div>
    ) 
}

export function ListItemPontos({title, isSelected, onClick, exclude}: Props) {
    return (
        <motion.div className={`w-full h-[70px] flex bg-[#121724] rounded-xl px-8 ${isSelected ? "border-2 border-[#00ffa2]" : ""}`} onClick={onClick} 
            initial={false}
            animate={{
                borderColor: isSelected ? "#00ffa2" : "rgba(0,0,0,0)",
                borderWidth: isSelected ? 2 : 0
            }}
            transition={{
                duration: 0.2,
                scale: { type: "spring", visualDuration: 0.4, bounce: 1 },
            }}
        >
            <div className="w-[95%] flex flex-col justify-center">
                <label className="text-lg font-bold">{title}</label>
            </div>
            <div className="w-[5%] flex items-center justify-center items-right">
                <FaTrashAlt onClick={(e) => { 
                    e.stopPropagation(); // Evita que o clique no ícone dispare o onClick do item pai
                    exclude()
                }}/>
            </div>
        </motion.div>
    )
}