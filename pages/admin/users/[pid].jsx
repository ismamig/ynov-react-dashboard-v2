import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
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
      <Link href="/admin/users">
        <a className="underline"> {"<"} Back to users list</a>
      </Link>
      <h1 className="mt-4 mb-2 text-lg font-semibold">User</h1>
      <div>{user.id} </div>
      <div>{user.name} </div>
      <div>{user.email} </div>
      <div>{user.role} </div>
      <div>
        <h1 className="text-lg font-semibold mb-2 mt-4">Markers</h1>
        {user.markers.map((marker) => (
          <div className="flex justify-left gap-10  ">
            <div>{marker.title}</div>
            <div>Lat: {marker.lat}</div>
            <div>Lng: {marker.lng}</div>
          </div>
        ))}
      </div>
      <div className="flex my-4 gap-5 mt-4">
        <button className="p-2 bg-red-500 text-white rounded-md">
          Delete account
        </button>
        <button className="p-2 bg-blue-500 text-white rounded-md">
          Change role
        </button>
      </div>
    </Layout>
  );
}

export default AdminUserDetails;