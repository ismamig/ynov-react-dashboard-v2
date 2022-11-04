import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method === "GET") {

    const session = await getSession({ req })

    
    const users = await prisma.User.findMany({
      include: {
        markers: true
      }
    })
    res.status(200).json({ result: users, status: "200" })
    
    

  } else {
    res.status(400).json({ message: "unAuthorized" })
  }
}