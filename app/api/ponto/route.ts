import { prisma } from "@/lib/index";

export async function POST(req: Request) {  // Função assincrona para o metodo POST

    try { // Estrutura try-catch para tratamento de erros
        
        // Recebe exatamente os dados enviados no corpo da requisição
        
        const { name, idMapa, latitude, longitude } = await req.json() as {name: string, idMapa: number, latitude: string, longitude: string}; 

        // Caso o corpo não tenha esses nomes, retorna erro 400 (bad request)
        if (!name || !idMapa || !latitude || !longitude) {
            return Response.json({ error: "Name, idMapa, latitude e logitude são obrigatórios" }, { status: 400 });
        }

        
        console.log(name, idMapa, latitude, longitude);

        // Utilizamos o prisma para criar um novo ponto no banco de dados
        const pontos = await prisma.ponto.create({
            data: {
                name,
                idPonto: idMapa, // Valor do mapa para relacionar com o ponto
                latitude,
                longitude,
                status: true
            }
        })

        return Response.json(pontos); // Retornamos como as informacoes de criacao do ponto em caso de sucesso

    } catch (error) { // Estrutura `Catch` para capturar erros inesperados
        return Response.json({ error: "Internal Server Error" }, { status: 500 }); // Retorna erro 500 em caso de falha
    }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json() as {
      id: number;
      status: boolean;
    };

    if (id === undefined || status === undefined) {
      return Response.json(
        { error: "id e status são obrigatórios" },
        { status: 400 }
      );
    }

    const ponto = await prisma.ponto.update({
      where: { id },
      data: { status }
    });

    return Response.json(ponto);

  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {

    try {
        
        const { searchParams } = new URL(req.url);
        const idMapa = Number(searchParams.get("idMapa"));

        if (!idMapa) {
            return Response.json({ error: "O Id do mapa é obrigatório" }, { status: 400 });
        }

        const mapa = await prisma.mapa.findUnique({
            where: {
                id: idMapa,
            },
            select: {
                name: true,
                ponto: {
                where: {
                    status: true,
                },
                },
            },
        });

        if (!mapa) {
            return Response.json({ error: "Mapa não encontrado" }, { status: 404 });
        }
            
        const pontos = await prisma.ponto.findMany({
            where: {
                idPonto: idMapa,
                status: true
            }
        })

        return Response.json({
            mapa: mapa.name,
            pontos: pontos
        });

    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}