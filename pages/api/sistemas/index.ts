import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'


// GET /api/sistemas
export default async function handle(req: NextApiRequest, res: NextApiResponse) {

    const resultPosts = await prisma.sistemaSolar.findMany()
    res.json(resultPosts)



}
