"use client"
import { PrimaryButton } from "@/components/Button";
import { ListItemMapas } from "@/components/ListItem";
import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Home() {
  const [valor, setValor] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [mapaCriado, setMapaCriado] = useState<any>(false);
  
  const router = useRouter();
 

  useEffect(() => {
    async function retornarMapas() {
      try {
        const response = await axios.get(`/api/mapa`);
        setValor(response.data);

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    retornarMapas();
  }, [mapaCriado]);

  function OpenOrCloseModal() {
    setActiveModal(!activeModal);
  }

  async function CriarMapas(data: {
    nome: string;
  }) {
    try {

      const send = await axios.post(`/api/mapa`, {
        name: data.nome,
      })

      console.log(send.data);

      setMapaCriado(send.data)

    } catch (error) {
      console.error("Erro ao criar mapa", error);
    }
    
  }

  async function excluirMapa(id: number) {
    try {

      console.log(id);

      const send = await axios.patch(`/api/mapa`, {
        id: id,
        status: false
      })

      console.log(send.data);

      setMapaCriado(send.data)

    } catch (error) {
      console.error("Erro ao criar mapa", error);
    }
    
  }

  function Redirect(id: number) {
    router.push(`/mapa/${id}`);
  }
  
  return (
    <div className="flex items-center justify-center h-full bg-[#0c101a]">
      <div className="h-[80%] w-[60%] bg-[#181e2e] rounded-xl shadow-xl ">
        <div className="w-full flex pb-6 mb-4">
          <div className="w-full h-[100px] flex items-center border-b border-[#303744] bg-[#1b2236] rounded-t-lg px-8">
            <div className="w-[85%]">
              <h1 className="text-3xl font-bold text-white">Mapas disponíveis</h1>
            </div>
            <div className="w-[15%]">
              <PrimaryButton text="Criar Mapa" onClick={() => {OpenOrCloseModal()}}/>
            </div>
            
          </div>
        </div>
        <div className="w-full flex flex-col gap-2">
          {loading ? (
            <div className="h-full flex items-center justify-center text-white">
              Carregando...
            </div>
          ) : valor.length === 0 ? (
            <div className="h-full flex items-center justify-center text-white">
              Sem dados a mostrar
            </div>
          ):(
            <div className="px-10 flex flex-col gap-2">
              {valor.map((item, index) => (
                <ListItemMapas key={index} title={item.name} pontos={item.pontos} isSelected={selectedId === item.id} onClick={() => Redirect(item.id)} exclude={() => excluirMapa(item.id)}/>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal type="mapa" visible={activeModal} onClose={OpenOrCloseModal} onSent={CriarMapas}/>
    </div>
  );
}
