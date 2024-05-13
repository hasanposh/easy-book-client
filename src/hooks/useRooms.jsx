import axios from "axios";
import { useEffect, useState } from "react";

const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  //   useEffect(() => {
  //     fetch("http://localhost:5000/rooms")
  //       .then((res) => res.json())
  //       .then((data) => setRooms(data));
  //   }, []);

  //   useEffect(() => {
  //     getData();
  //   }, [rooms]);

  //   const getData = async () => {
  //     const { data } = await axios(`${import.meta.env.VITE_API_URL}/rooms`);
  //     // console.log(data);
  //     setRooms(data);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/rooms`;
        if (sortBy) {
          url += `?sortBy=${sortBy}`;
        }
        const response = await axios.get(url);
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [sortBy]);

  return { rooms, setSortBy };
};

export default useRooms;
