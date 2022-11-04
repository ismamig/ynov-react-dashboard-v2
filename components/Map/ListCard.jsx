import { useForm } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const ListCard = ({ markers }) => {

  const router = useRouter()

  const deleteMarker = (id) => {
    fetch(`/api/markers/${id}`, {
      method: "DELETE",
    }).then((data) => {
      console.log(data);
      router.reload(window.location.pathname);
    });
  }

  return (
    <div className="absolute z-10 top-40 w-80 m-2 p-2 bg-blue-100 rounded-md w-fit">
      <h1 className="text-2xl text-left mb-4">My markers</h1>
      <ul>
        {markers &&
          markers.map((elem) => (
            <li
              key={elem.id}
              className="flex items-center justify-between my-4"
            >
              <span className="p-2 rounded-md">{elem.title}</span>

              <span
                onClick={() => deleteMarker(elem.id)}
                className="rounded-md p-2 bg-white ml-2 w-fit hover:bg-gray-100 hover:cursor-pointer"
              >
                Delete
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListCard;
