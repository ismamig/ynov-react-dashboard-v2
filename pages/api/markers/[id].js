import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  const session = await getSession({ req })

  const id = req.query.id

  if (req.method === "DELETE") {

    if (session) {
      const markers = await prisma.Marker.delete({
        where: {
          id: id
        }
      })
      res.status(200).json({ result: markers, status: "200" })
    } else {
      res.status(400).json({ message: "Not Authorized"} )
    }
    

  } else if (req.method === "GET") {
    const markers = await prisma.Marker.findMany({
      where: {
        user: {
          email: id
        }
      }
    })
    res.status(200).json({ result: markers, status: "200" })
    
  } else {
    res.status(400).json({ message: "Not Authorized" })
  }
}