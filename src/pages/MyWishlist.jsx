import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const MyWishlist = () => {
  const { user } = useAuth();
  console.log(user.email);
  const email = user.email;
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        let url = `${import.meta.env.VITE_API_URL}/wishlist`;
        if (email) {
          url += `?email=${email}`;
        }
        const response = await axios.get(url);
        setWishlistItems(response.data);
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
        setError("Failed to fetch wishlist items");
      }
    };

    if (email) {
      fetchWishlist();
    }
  }, [email]);
  //   console.log(wishlistItems);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/wishlist/${id}`);
      setWishlistItems(wishlistItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
      setError("Failed to delete wishlist item");
    }
  };
  return (
    <div className="container mx-auto">
      {/* <h2>Your Wishlis wishlist {wishlistItems.length}</h2> */}
      <h2 className="text-center py-4 font-Playfair text-4xl">Your Booked Room : {wishlistItems.length}</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Room</th>
                <th>Name</th>
                <th>price Per Night</th>
                <th>Availability</th>
                <th>Room Details</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {wishlistItems.map((wishlistItem) => (
                <>
                  <tr key={wishlistItem._id}>
                    <td>
                      <img
                        className="w-60"
                        src={wishlistItem.images[0]}
                        alt=""
                      />
                    </td>
                    <td>{wishlistItem.roomName}</td>
                    <td>${wishlistItem.pricePerNight}</td>
                    <td>
                      {wishlistItem.availability == true
                        ? "Available"
                        : "Not Available"}
                    </td>
                    <th>
                      <Link
                        to={`/rooms/${wishlistItem.room_id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        details
                      </Link>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDelete(wishlistItem._id)}
                        className="btn btn-ghost btn-xs bg-red-700 text-white"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
