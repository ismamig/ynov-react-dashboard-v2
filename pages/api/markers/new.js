// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
  const { title, coordinates, userEmail } = req.body
  if (req.method === "POST") {

    const { lat, lng } = coordinates

    const marker = await prisma.Marker.create({
      data: {
        title: title,
        lat: lat.toString(),
        lng: lng.toString(),
        user: {
          connect: {
            email: userEmail
          }
        }
      }
    })
    res.status(200).json({ message: "Added successfully !", status: "200", "?": marker })
    // res.status(200).json({ title, lat, lng, userEmail, is_active })
    
  } else {
    res.status(400).json({message: "unAuthorized"})
  }
}