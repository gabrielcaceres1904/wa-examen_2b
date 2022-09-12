import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";



// GET /api/filterPosts?searchString=:searchString
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const {method, query, body} = req;



    switch (method) {

        case "POST":
            const bodyF=JSON.parse(body)

            const sistema = await prisma.sistemaSolar.create({
                data: {
                    nombre_sistema:bodyF.nombre_sistema,
                    radio_sistema:Number(bodyF.radio_sistema),
                    satelites_sistema:Number(bodyF.satelites_sistema),
                    nombre_sol:bodyF.nombre_sol,
                },
            })
            res.json(sistema)
            break;


        default:
            return res.status(400).json("Invalid Method");
    }



}
