import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method === "GET") {

    const session = await getSession({ req })

    const id = req.query.id

    
    const user = await prisma.User.findUnique({
      where: {
        id: id
      },
      include: {
        markers: true
      }
    })
    res.status(200).json({ result: user, status: "200" })
  


  } else {
    res.status(400).json({ message: "Not Authorized" })
  }
}