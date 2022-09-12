import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../../lib/prisma";



// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const {method, query, body} = req;



    switch (method) {
        case 'POST':

            const bodyF=JSON.parse(body)

            const result = await prisma.planeta.create({
                data: {
                    nombre_planeta: bodyF.nombre_planeta,
                    radio_planeta: Number(bodyF.radio_planeta),
                    duracion_dia: Number(bodyF.duracion_dia),
                    lunas: Number(bodyF.lunas),
                    es_habitable: bodyF.es_habitable == "true",
                    sistemaId: parseInt(query.id as string)
                },
            })
            res.json(result)
            break;

        default:
            return res.status(400).json("Invalid Method");
    }
}
