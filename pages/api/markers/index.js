import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method === "GET") {

    const session = await getSession({ req })

    const markers = await prisma.Marker.findMany({
      where: {
        user: { email: session?.user?.email }
      }
    })
    res.status(200).json({ result: markers, status: "200" })
    // res.status(200).json({ title, lat, lng, userEmail, is_active })

  } else {
    res.status(400).json({ message: "unAuthorized" })
  }
}