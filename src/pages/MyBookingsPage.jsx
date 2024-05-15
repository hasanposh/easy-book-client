import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import moment from "moment";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const MyBookingsPage = () => {
  const { user } = useAuth();
  const currentDate = moment();
  const axiosSecure = useAxiosSecure();

  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // console.log(currentDate._d);
  //   {updated date}
  const date = selectedDate;
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const day = date.getDate();
  const updatedFormattedUDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  const handleOpenModal = (bookingId, modalNumber) => {
    const modal = document.getElementById(modalNumber);
    setSelectedBookingId(bookingId); // Set selected booking id
    modal.showModal();
  };

  const handleUpdateDate = () => {
    if (!selectedBookingId) return; // Check if a booking id is selected

    // Update date logic using selectedBookingId
    fetch(`${import.meta.env.VITE_API_URL}/bookings/${selectedBookingId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ updatedFormattedUDate }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        fetchInitialData();
        if (data.insertedId) {
          toast("Date Updated Successfully");
        }
      });
  };
  const handleCancelBooking = (id, bookedDate, roomId) => {
    // console.log(bookedDate);
    const dbMomentDate = moment(bookedDate, "DD-MM-YYYY");
    dbMomentDate.endOf("day");
    // console.log(dbMomentDate);
    const timeDif = dbMomentDate.diff(currentDate);
    // console.log(timeDif);
    const miliSecondDiff = moment.duration(timeDif).asMilliseconds();
    const daysDiff = miliSecondDiff / (1000 * 3600 * 24);
    // console.log(daysDiff);

    if (daysDiff > 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.deletedCount > 0) {
                toast("deleted successful");
                const remaining = bookings.filter(
                  (booking) => booking._id !== id
                );
                setBookings(remaining);
              }
            });
          fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ availability: true }),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error("Failed to update room availability");
              }
              return res.json();
            })
            .then((data) => {
              console.log(data.message); // Log the server response
            })
            .catch((error) => {
              console.error("Error updating room availability:", error);
            });
        }
      });
    } else {
      toast("You can not cancel booking before 1 day");
    }
  };

  const handleReviews = (e) => {
    // e.preventDefault();
    const postTime = currentDate._d;
    const userPhoto = user.photoURL;
    const roomId = selectedBookingId;
    const userName = e.target.name.value;
    const rating = e.target.rating.value;
    const comment = e.target.comment.value;

    const review = {
      userName,
      userPhoto,
      rating,
      comment,
      postTime,
      roomId,
    };
    console.log(review);

    fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast("Review Done Successfully");
        }
      });
  };

  const url = `/bookings?email=${user?.email}`;

  // const fetchInitialData = () =>{
  //   fetch(`${import.meta.env.VITE_API_URL}/bookings?email=${user?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBookings(data);
  //     });
  // }

  const fetchInitialData = () => {
    axiosSecure.get(url).then((res) => setBookings(res.data));

    // fetch(`${import.meta.env.VITE_API_URL}/bookings?email=${user?.email}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setBookings(data);
    //   });
  };
  useEffect(() => {
    fetchInitialData();
    // eslint-disable-next-line
  }, [user, axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto min-h-screen">
      <h2 className="text-center py-4 font-Playfair text-4xl">Your Booked Room : {bookings.length}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="card h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
          shadow-lg"
          >
            <figure>
              <img src={booking.image} alt="Room image" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{booking.room_name}</h2>
              <p>Booking date : {booking.formattedDate}</p>
              <p>Price: ${booking.price_per_night}</p>
              <div className="card-actions ">
                <button
                  onClick={() => handleOpenModal(booking._id, "my_modal_1")}
                  className="btn  text-white bg-blue-500"
                >
                  Update Date
                </button>
                <button
                  onClick={() =>
                    handleCancelBooking(
                      booking._id,
                      booking.formattedDate,
                      booking.room_id
                    )
                  }
                  className="btn  text-white bg-red-500"
                >
                  Cancel Booking
                </button>
              </div>
              <div className="card-actions mt-2">
                <Link
                  to={`/rooms/${booking.room_id}`}
                  className="btn text-blue-500"
                >
                  Room Details
                </Link>
                <button
                  onClick={() => handleOpenModal(booking.room_id, "my_modal_2")}
                  className="btn bg-gray-700 text-white"
                >
                  Give a Review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* update modal */}
      <dialog id="my_modal_1" className="modal ">
        <div className="flex flex-col bg-white p-10 rounded-xl">
          <h3 className="font-bold text-lg font-Playfair">Update</h3>
          <p className="py-4">You Can Update The Booking Date</p>
          <div className="my-2 flex-grow">
            <DatePicker
              showIcon
              toggleCalendarOnIconClick
              dateFormat="dd-MM-yyyy"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
          <div className="text-center">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                onClick={handleUpdateDate}
                className="btn text-white bg-blue-500"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
      {/* review modal */}
      <dialog id="my_modal_2" className="modal">
        <div className="flex flex-col bg-white p-10 rounded-xl modal-action">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700 capitalize md:text-3xl font-Playfair">
              Give Us A Review on This Room
            </h2>
            <form onSubmit={handleReviews} method="dialog">
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="text-gray-700 " htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="name"
                    defaultValue={user.displayName}
                    readOnly
                    className="block w-full  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>

                <div className="flex flex-col ">
                  <label className="text-gray-700 " htmlFor="rating">
                    Your Rating
                  </label>
                  <select
                    className="appearance-none  text-center  leading-tight   block w-full  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    name="rating"
                  >
                    <option value="1">1 </option>
                    <option value="2">2 </option>
                    <option value="3">3 </option>
                    <option value="4">4 </option>
                    <option value="5">5 </option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-gray-700 " htmlFor="comment">
                    Write Your Comment
                  </label>
                  <input
                    id="comment"
                    name="comment"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6 ">
                <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                  Post
                </button>
              </div>
              {/* if there is a button in form, it will close the modal */}
              {/* <button className="btn">Close</button> */}
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MyBookingsPage;
