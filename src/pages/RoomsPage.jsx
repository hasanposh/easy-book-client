import { Helmet } from "react-helmet-async";
import RoomCard from "../components/RoomCard";
import useRooms from "../hooks/useRooms";
import { useEffect, useState } from "react";

const RoomsPage = () => {
  const { rooms, setSortBy } = useRooms();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    // fetchInitialData();
    fetch(`${import.meta.env.VITE_API_URL}/allReviews`)
      .then((res) => res.json())
      .then((data) => {
        const finalData = {};
        for (let i = 0; i < data.length; i++) {
          if (finalData[data[i].roomId]) {
            finalData[data[i].roomId] += 1;
          } else {
            finalData[data[i].roomId] = 1;
          }
        }
        setReviews(finalData);
      });
  }, []);
  console.log(reviews)
  // console.log(rooms);
  const handleSortBy = (sortByValue) => {
    setSortBy(sortByValue);
  };
  return (
    <div>
      
      {/* <h2>Rooms page{rooms.length}</h2> */}
      <div className="flex justify-center items-center py-4">
        <div className="dropdown dropdown-hover ">
          <div tabIndex={0} role="button" className="btn m-1">
            Sort By Price
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => handleSortBy("price_asc")}>
              <a>Low to High</a>
            </li>
            <li onClick={() => handleSortBy("price_desc")}>
              <a>High to Low</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-4 md:gap-10 ">
        {rooms.map((room) => (
          <RoomCard reviews={reviews} room={room} key={room._id} />
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
