import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method === "DELETE") {

    const session = await getSession({ req })

    const id = req.query.id

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
    

  } else {
    res.status(400).json({ message: "Not Authorized" })
  }
}