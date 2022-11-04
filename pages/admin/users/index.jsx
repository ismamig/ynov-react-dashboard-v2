import { getSession } from "next-auth/react";
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
  const users = await fetch("http://localhost:3000/api/users")
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      return data.result;
    });

  return {
    props: {
      session,
      users,
    },
  };
}

const AdminUsers = ({ users }) => {
  const router = useRouter();

  return (
    <Layout>
      <table className=" mx-auto text-center w-11/12 mt-5 border-separate border-spacing-y-2 border-spacing-x-1">
        <thead className="rounded-l-md bg-blue-400 text-white">
          <tr>
            <th className="rounded-l-md">ID</th>
            <th>Email</th>
            <th>Role</th>
            <th className="rounded-r-md">Markers</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr
                key={user.id}
                onClick={() => router.push(`/admin/users/${user.id}`)}
                className="bg-purple-100 my-5 transition-all hover:cursor-pointer hover:bg-purple-20 hover:shadow-sm"
              >
                <td className="rounded-l-md">{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="rounded-r-md">{user.markers.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default AdminUsers;
