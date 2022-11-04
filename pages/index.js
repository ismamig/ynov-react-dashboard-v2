// import Head from 'next/head'
// import Image from 'next/image'
import Layout from "../components/Layout"
import Dashboard from '../components/Dashboard'

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSession } from "next-auth/react";

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
  // const markers = await fetch("http://localhost:3000/api/markers")
  //   .then((data) => {
  //     return data.json()
  //   })
  //   .then((data) => {
  //     return data.result
  //   })

  return {
    props: {
      session
    }
  }
}


export default function Home() {
  const router = useRouter();

  return (
    <Layout>
      <Dashboard/>
    </Layout>
  )
}