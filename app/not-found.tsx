import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">

      <Image src="/not-found.png" alt="Not Found" width={400} height={400} />
      <p className="text-xl">
        Mapa não encontrado!
      </p>
    </div>
  );
}