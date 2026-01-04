import { prisma } from "@/lib/index";

export async function POST(req: Request) {

    try {
        
        const { id, name } = await req.json() as {id?: string, name: string};
        console.log(id, name)
        
        if (!name) {
            return Response.json({ error: "Name é obrigatório" }, { status: 400 });
        }

        let mapas
        if (id) {
            mapas = await prisma.mapa.create({
                data: {
                    id: id,
                    name: name,
                    status: true
                }
            })
        } else {
            mapas = await prisma.mapa.create({
                data: {
                    name: name,
                    status: true
                }
            })
        }

        

        return Response.json(mapas);

    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json() as {
      id: string;
      status: boolean;
    };

    if (id === undefined || status === undefined) {
      return Response.json(
        { error: "id e status são obrigatórios" },
        { status: 400 }
      );
    }

    const mapa = await prisma.mapa.update({
      where: { id },
      data: { status },
    });

    return Response.json(mapa);

  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {

    try {

        // FindMany retorna todos os mapas com status true
        const mapas = await prisma.mapa.findMany({ 
            where: {
                status: true
            },
            include: {
                _count: {
                    select: {
                        ponto:  {
                            where: {
                                status: true
                            }
                        }
                    }
                }
            }
        })

        const mapasFormatados = mapas.map((mapa:any) => {
        const { _count, ...resto } = mapa;

            return {
                ...resto,
                pontos: _count.ponto
            };
        });

        return Response.json(mapasFormatados);

    } catch (error) {
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}