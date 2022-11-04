import { useForm } from "react-hook-form";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const AddCard = ({ marker }) => {

  const { data: session } = useSession();

  const router = useRouter();

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    if (session) {
      const body = {
        title: data.title,
        coordinates: marker,
        userEmail: session.user.email
      }
      fetch("/api/markers/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      }).then((data) => {
        console.log(data);
        router.reload(window.location.pathname);
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="absolute z-10 bottom-0 w-80 m-2 p-2 bg-blue-100 rounded-md w-fit"
    >
      <h1 className="text-2xl text-left mb-4">Add Marker</h1>
      <div className="flex flex-row items-center">
        <label className="mr-2" htmlFor="title">
          Title
        </label>
        <input
          {...register("title")}
          name="title"
          className="p-2 bg-white rounded-md w-10/12"
          type="text"
        />
      </div>
      <div className="flex flex-col my-4">
        <span>Lat: {marker?.lat ? marker.lat : 0}</span>
        <span>Lng: {marker?.lng ? marker.lat : 0}</span>
      </div>
      <div className="">
        <button className="py-2 px-4 bg-blue-300 rounded-md" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddCard;
