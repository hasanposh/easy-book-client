import useRooms from "../hooks/useRooms";
import RoomCard from "./RoomCard";

const FeaturedRoom = () => {
  const { rooms } = useRooms();
  // sixRooms = rooms
  return (
    <div className="  max-w-7xl mx-auto">
        <h2 className="text-6xl font-Playfair py-8">Our Featured Rooms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 ">
        {rooms.slice(0, 6).map((room) => (
          <RoomCard room={room} key={room._id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRoom;
