import { useEffect, useState } from "react";

const useReviews = () => {
  const [reviews, setReviews] = useState([]);

//   const fetchInitialData = () => {
//     fetch(`${import.meta.env.VITE_API_URL}/allReviews`)
//       .then((res) => res.json())
//       .then((data) => {
//         setReviews(data);
//       });
//   };
  useEffect(() => {
    // fetchInitialData();
    fetch(`${import.meta.env.VITE_API_URL}/allReviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return reviews;
};

export default useReviews;
