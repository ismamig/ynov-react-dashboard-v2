import dynamic from "next/dynamic"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout"
import AddCard from "../../components/Map/AddCard";
import { getSession, useSession } from "next-auth/react"
import ListCard from "../../components/Map/ListCard";

const MapComponent = dynamic(() => import("../../components/Map"), { ssr: false })

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      }
    }
  }
  const markers = await fetch("http://localhost:3000/api/markers")
    .then((data) => {
      return data.json()
    })
    .then((data) => {
      return data.result
    })

  return {
    props: {
      session,
      markers
    }
  }
}

export default function MapPage({markers}) {
  const router = useRouter();

  // const { data: session } = useSession();
  const [marker, setMarker] = useState();
  // const [markers, setMarkers] = useState();


  console.log(markers)

  return (
    <Layout>
      <AddCard marker={marker} />
      <ListCard markers={ markers } />
      <MapComponent marker={marker} setMarker={setMarker} markers={markers} />
    </Layout>
  );
}