import { useLoaderData } from "react-router-dom";
import ImageSwiper from "../components/ImageSwiper";

const RoomDetails = () => {
  const room = useLoaderData();
  const {
    name,
    price_per_night,
    room_size,
    images,
    special_offers,
    availability,
    reviews,
    description,
    _id,
  } = room;
  return (
    <section>
      <div
        className=" h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
         shadow-lg"
      >
        {/* <img
          src={images[0]}
          alt=""
          className="w-5/6 mx-auto translate-y-12  rounded-lg shadow-md "
        /> */}
        <ImageSwiper images={images} />
        <div className=" container flex flex-col  px-4  mx-auto lg:pb-56 md:py-32 md:px-10 lg:px-32 ">
          <h1 className="md:text-5xl font-bold leading-none text-3xl xl:max-w-3xl font-Playfair">
            {name}
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12  ">{description}</p>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="">
              <h3 className="text-3xl font-Playfair">Price Per Night</h3>
              <h2 className="text-xl">${price_per_night}</h2>
            </div>
            <div className="">
              <h3 className="text-3xl font-Playfair">Room Size</h3>
              <h2 className="text-xl">${room_size}</h2>
            </div>
            {special_offers && (
              <div className="">
                <h3 className="text-3xl font-Playfair">Special Offers</h3>
                <h2 className="text-xl">${special_offers}</h2>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center">
            <button
              onClick={() => document.getElementById("my_modal_2").showModal()}
              type="button"
              className="px-8 py-3 m-8 text-lg border rounded  hover:bg-blue-400 hover:text-white"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="card w-96 bg-neutral text-neutral-content">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{name}</h2>
            <p>{description.slice(0,100)}..</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accept</button>
              
            </div>
          </div>
        </div>
        {/* <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form> */}
      </dialog>
    </section>
  );
};

export default RoomDetails;
<h2>room</h2>;
