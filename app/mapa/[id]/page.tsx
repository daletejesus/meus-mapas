'use client'
import Image from "next/image";
import { ListItemMapas, ListItemPontos } from "@/components/ListItem";
import {PrimaryButton} from "@/components/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "@/components/Modal";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

type Ponto = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type ApiResponse = {
  mapa: string;
  pontos: Ponto[];
};


export default function Home() {
  const [valor, setValor] = useState<Ponto[]>([]);
  const [mapaNome, setMapaNome] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [pontoCriado, setPontoCriado] = useState<any>(false);
  const router = useRouter(); 
  const URL=process.env["NEXT_PUBLIC_URL"]!

  const selectedItem = valor.find(item => item.id === selectedId);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`${URL}/api/ponto?idMapa=${id}`);
        
        const { mapa, pontos } = response.data;

        setMapaNome(mapa);      // 👈 nome do mapa
        setValor(pontos);       // 👈 array de pontos

        if (pontos.length > 0) {
          setSelectedId(pontos[0].id); // 👈 seleciona o primeiro
        } else {
          setSelectedId(null);
        }

      } catch (error: any) {
        if (error.response?.status === 404) {
          router.replace(`${URL}/not-found`); // 👈 redireciona
        } else {
          console.error("Erro ao buscar pontos", error);
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchUsers();
  }, [id, pontoCriado]);

  function OpenOrCloseModal() {
    setActiveModal(!activeModal);
  }

  async function CriarPontos(data: {
    nome: string;
    latitude?: string;
    longitude?: string;
  }) {
    try {

      const send = await axios.post(`${URL}/api/ponto`, {
        name: data.nome,
        idMapa: id,
        latitude: data.latitude,
        longitude: data.longitude
      })

      console.log(send.data);

      setPontoCriado(send.data)

    } catch (error) {
      console.error("Erro ao criar ponto", error);
    }
    
  }

  async function excluirPonto(id: number) {
    try {


      const send = await axios.patch(`${URL}/api/ponto`, {
        id: id,
        status: false
      })

      console.log(send.data);

      setPontoCriado(send.data)

    } catch (error) {
      console.error("Erro ao criar mapa", error);
    }
    
  }
  
  return (
    <div className="w-full h-full flex relative">
      <div className="w-[30%] flex justify-center">
        <div className="w-full flex flex-col gap-12">
          <div className="w-full h-[100px] flex items-center border-b border-[#303744] bg-[#1b2236] rounded-t-lg px-8">
            <div className="w-[85%]">
              <h1 className="font-bold text-2xl">{mapaNome}</h1>
            </div>
            <div className="w-[15%]">
              <PrimaryButton text="" onClick={() => {OpenOrCloseModal()}}/>
            </div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center">
              Carregando...
            </div>
          ) : valor.length === 0 ? (
            <div className="flex items-center justify-center text-gray-500">
              Sem dados a mostrar
            </div>
          ):(
            <div className="flex flex-col gap-2 px-4">
              {valor.map((item, index) => (
                <ListItemPontos key={index} title={item.name} isSelected={selectedId === item.id} onClick={() => setSelectedId(item.id)} exclude={() => excluirPonto(item.id)}/>
              ))}
              
            </div>
          )}
        </div>
      </div>
      <div className="w-[70%] bg-white overflow-hidden">
        <Map
          key={selectedItem?.id}
          lat={ selectedItem ? selectedItem.latitude : -15.794840100854168  }
          lng={ selectedItem ? selectedItem.longitude : -47.89206007906242 }
          nome={ selectedItem ? selectedItem.name : "" }
        />
      </div>
      <Modal visible={activeModal} type="ponto" onClose={OpenOrCloseModal} onSent={CriarPontos}/>
    </div>
  );
}
