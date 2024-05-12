import axios from "axios";
import { useEffect, useState } from "react";

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  //   useEffect(() => {
  //     getData();
  //   }, []);

  // //   const getData = async () => {
  // //     const data = await axios(`${import.meta.env.VITE_API_URL}/rooms}`);
  // //     console.log(data);
  // //     setRooms(data);
  // //   };
  return rooms;
};

export default useRooms;
