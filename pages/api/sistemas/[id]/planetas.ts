import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../../lib/prisma";


// GET /api/filterPosts?searchString=:searchString
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const {method, query, body} = req;

    console.log(query.id)

    const resultPosts = await prisma.planeta.findMany({
        where: {
            sistemaId: {equals: Array.isArray(query.id) ? parseInt(query.id[0]) : parseInt(query.id)},
        },
    })
    res.json(resultPosts)
}
