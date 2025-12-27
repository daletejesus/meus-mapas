import { TextBox } from "./TextBox";
import { ConfirmButton, CancelButton } from "./Button";
import { useState } from "react";

type MapaPayload = {
  nomeMapa: string;
};

type PontoPayload = {
  nomePonto: string;
  latitude: string;
  longitude: string;
};

type Props = {
  visible: boolean;
  type: "mapa" | "ponto";
  onClose: () => void;
  onSent: (data: {
    nome: string;
    latitude?: string;
    longitude?: string;
  }) => void;
};


export function Modal({ visible, type, onClose, onSent }: Props) {
  const [nome, setNome] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  function CloseModal() {
    
    onClose();

    // (opcional) limpa os campos
    setNome("");
    setLatitude("");
    setLongitude("");
  }


  function handleSubmit() {
    if (type === "mapa") {
      onSent({ nome });
    } else {
      onSent({
        nome,
        latitude: latitude,
        longitude: longitude,
        });
    }

    // fecha o modal corretamente
    onClose();

    // (opcional) limpa os campos
    setNome("");
    setLatitude("");
    setLongitude("");
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      <div className="relative w-[50%] h-[70%] bg-[#181e2e] rounded-lg z-10">
        <div className="h-[80px] flex items-center border-b border-[#303744] bg-[#1b2236] rounded-t-lg px-8">
          <h1 className="font-bold text-2xl">
            {type === "ponto" ? "Criar um novo ponto" : "Criar um novo mapa"}
          </h1>
        </div>

        <div className="flex flex-col gap-4 px-8 py-6">
          {type === "ponto" ? (
            <>
              <TextBox
                id="txtPonto"
                nome="Nome do ponto"
                placeholder="nome"
                value={nome}
                onChange={setNome}
              />

              <div className="w-full flex gap-4">
                <div className="w-1/2">
                  <TextBox
                    id="txtLatitude"
                    nome="Latitude"
                    placeholder="latitude"
                    value={latitude}
                    onChange={setLatitude}
                  />
                </div>

                <div className="w-1/2">
                  <TextBox
                    id="txtLongitude"
                    nome="Longitude"
                    placeholder="longitude"
                    value={longitude}
                    onChange={setLongitude}
                  />
                </div>
              </div>
            </>
          ) : (
            <TextBox
              id="txtMapa"
              nome="Nome do mapa"
              placeholder="Nome do mapa"
              value={nome}
              onChange={setNome}
            />
          )}
        </div>

        <div className="absolute h-[80px] bottom-0 flex justify-end w-full bg-[#303843] rounded-b-lg">
          <div className="w-2/4 flex gap-4 items-center px-8">
            <CancelButton text="cancelar" onClick={CloseModal} />
            <ConfirmButton text="criar" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
