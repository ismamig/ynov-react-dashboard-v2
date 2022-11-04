import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== "ROLE_ADMIN") {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const user = await fetch(`http://localhost:3000/api/users/${context.params.pid}`)
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      return data.result;
    });

  return {
    props: {
      session,
      user,
    },
  };
}

const AdminUserDetails = ({user}) => {
  
  const router = useRouter();
  const { pid } = router.query;
  return (
    <Layout>
      <h1 className="text-lg font-semibold">User</h1>
      <div>{user.name} </div>
      <div>{user.email} </div>
      <div>
        <h1 className="text-lg font-semibold">Markers</h1>
        {user.markers.map((marker) => (
          <div className="flex justify-left gap-10  ">
            <div>{marker.title}</div>
            <div>Lat: {marker.lat}</div>
            <div>Lng: {marker.lng}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default AdminUserDetails;