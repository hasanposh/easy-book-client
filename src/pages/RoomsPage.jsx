import RoomCard from "../components/RoomCard";
import useRooms from "../hooks/useRooms";

const RoomsPage = () => {
  const rooms = useRooms();

  return (
    <div>
      <h2>Rooms page{rooms.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-4 md:gap-10 ">
        {
            rooms.map((room) => (
             <RoomCard room={room} key={room._id}/>
            ))
        }
      </div>
    </div>
  );
};

export default RoomsPage;
