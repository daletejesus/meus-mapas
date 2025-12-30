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
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                duration: 0.4,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        
        className={`w-full h-[70px] flex bg-[#121724] rounded-md px-8`} onClick={onClick}>
            <div className="w-[95%] flex flex-col justify-center">
                <label className="text-lg font-bold text-white">{title}</label>

                {pontos == 0 ? <label className="text-md text-white">Nenhum ponto disponivel</label> : <label className="text-md text-white">{pontos} pontos disponiveis</label>}
            </div>
            <div className="z-0 w-[5%] flex items-center justify-center items-right">
                <FaTrashAlt onClick={(e) => { 
                    e.stopPropagation(); // Evita que o clique no ícone dispare o onClick do item pai
                    exclude()
                }}/>
            </div>
        </motion.div>
    ) 
}

export function ListItemPontos({title, isSelected, onClick, exclude}: Props) {
    return (
        <motion.div className={`w-full h-[70px] flex bg-[#121724] rounded-xl px-8 ${isSelected ? "border-2 border-[#00ffa2]" : ""}`} onClick={onClick} 
             initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                duration: 0.4,
                ease: [0, 0.71, 0.2, 1.01],
            }}
        >
            <div className="w-[95%] flex flex-col justify-center">
                <label className="text-lg font-bold text-white">{title}</label>
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