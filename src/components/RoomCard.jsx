const RoomCard = ({room}) => {
    const {name,price_per_night,room_size,images,special_offers,availability,reviews,description}    = room
  return (
    <div
      className=" overflow-hidden 
        h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
         shadow-lg text-black"
    >
      <div className="px-4 py-2">
        <h1 className="text-xl font-bold text-gray-800 uppercase font-Playfair">
          {name}
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {description.slice(0,200)}...
        </p>
      </div>

      <img
        className="object-cover w-full h-48 mt-2"
        src={images[0]}
        alt=""
      />

      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <h1 className="text-lg font-bold text-white">${price_per_night}</h1>
        <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
        See details
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
