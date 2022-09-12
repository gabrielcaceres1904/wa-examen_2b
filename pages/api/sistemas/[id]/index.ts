import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../../lib/prisma";


// GET /api/filterPosts?searchString=:searchString
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const {method, query, body} = req;



    switch (method) {
        case 'GET':

            const resultPosts = await prisma.sistemaSolar.findMany({
                where: {
                    id: {equals: parseInt(query.id[0])},
                },
            })
            res.json(resultPosts)
            break;

        case "PUT":

            const bodyF=JSON.parse(body)

            const sistema_u = await prisma.sistemaSolar.update({
                where: {id: parseInt(query.id[0])},
                data: {
                    nombre_sistema:bodyF.nombre_sistema,
                    radio_sistema:Number(bodyF.radio_sistema),
                    satelites_sistema:Number(bodyF.satelites_sistema),
                    nombre_sol:bodyF.nombre_sol,
                },
            })
            res.json(sistema_u)
            break;

        case "DELETE":

            const planeta_d = await prisma.sistemaSolar.delete({
                where: {id: parseInt(query.id[0])},
            })
            res.json(planeta_d)
            break;

        default:
            return res.status(400).json("Invalid Method");
    }



}
