import { Link } from "react-router-dom";

const FeaturedRoomCard = ({room}) => {
    const {
        name,
        price_per_night,
        room_size,
        images,
        special_offers,
        availability,
        reviews,
        description,
        _id
      } = room;
  return (
    <div
      to={`/rooms/${_id}`}
      className=" overflow-hidden relative  bg-cover bg-no-repeat
        h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
         shadow-lg text-black"
    >
      <div className="px-4 py-2">
        <h1 className="text-xl font-bold text-gray-800 uppercase font-Playfair">
          {name}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {description.slice(0, 200)}...
        </p>
      </div>

      <img
        className="object-cover w-full h-48 mt-2 transition duration-300 ease-in-out hover:scale-110"
        src={images[0]}
        alt=""
      />

      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 className="text-lg font-bold text-white">${price_per_night}</h1>
        <Link to={`/rooms/${_id}`} className="btn bg-blue-500 text-white border-none" >Book Now</Link>
      </div>
    </div>
  );
};

export default FeaturedRoomCard;
