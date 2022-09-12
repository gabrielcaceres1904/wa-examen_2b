import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../../lib/prisma";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const {method, query, body} = req;



    switch (method) {
        case 'GET':

            const resultPosts = await prisma.planeta.findMany({

                where: {
                    AND: [
                        {
                            id: {equals: parseInt(query.idPlaneta[0])}
                        },
                        {
                            sistemaId: {equals: parseInt(query.id[0])}
                        },
                    ]
                },
            })
            res.json(resultPosts)
            break;

        case "PUT":

            const bodyF=JSON.parse(body)

            const planeta_u = await prisma.planeta.update({
                where: {id: parseInt(query.idPlaneta[0])},
                data: {
                    nombre_planeta: bodyF.nombre_planeta,
                    radio_planeta: Number(bodyF.radio_planeta),
                    duracion_dia: Number(bodyF.duracion_dia),
                    lunas: Number(bodyF.lunas),
                    es_habitable: bodyF.es_habitable == "true",
                    sistemaId: parseInt(query.id as string)
                },
            })
            res.json(planeta_u)
            break;

        case "DELETE":

            const planeta_d = await prisma.planeta.delete({
                where: {id: parseInt(query.idPlaneta[0])},
            })
            res.json(planeta_d)
            break;

        default:
            return res.status(400).json("Invalid Method");
    }
}
