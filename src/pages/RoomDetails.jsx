import { Link, useLoaderData } from "react-router-dom";
import ImageSwiper from "../components/ImageSwiper";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import moment from "moment";

const RoomDetails = () => {
  const { user } = useAuth();
  const userMail = user?.email;
  const room = useLoaderData();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reviews, setReviews] = useState([]);
  //   console.log(selectedDate);

  const date = selectedDate;
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const day = date.getDate();
  const formattedDate = `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;

  const {
    name,
    price_per_night,
    room_size,
    images,
    special_offers,
    availability,
    description,
    _id,
  } = room;
  // console.log(_id)
  const handleBooking = () => {
    const booking = {
      formattedDate,
      userMail,
      image: images[0],
      room_id: _id,
      room_name: name,
      price_per_night,
      //   availability: false,
    };

    fetch(`${import.meta.env.VITE_API_URL}/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          toast("Booking Successfull");
        }
      });
    fetch(`${import.meta.env.VITE_API_URL}/rooms/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ availability: false }),
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
  };

  const fetchInitialData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/rooms/${_id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  };
  useEffect(() => {
    fetchInitialData();
  }, []);
  const calculatePostTime = (postTime) => {
    const currentTime = moment();
    const postTimeMoment = moment(postTime);
    const timeDif = currentTime.diff(postTimeMoment);

    const duration = moment.duration(timeDif);

    const days = duration.asDays();
    const hours = duration.asHours();
    const minutes = duration.asMinutes();
    const seconds = duration.asSeconds();

    if (days > 1) {
      return `${Math.ceil(days)} days ago`;
    } else if (hours > 1) {
      return `${Math.ceil(hours)} hours ago`;
    } else if (minutes > 1) {
      return `${Math.ceil(minutes)} minutes ago`;
    } else if (seconds > 1) {
      return `${Math.ceil(seconds)} seconds ago`;
    } else {
      return "Just now";
    }
  };
  console.log(reviews);
  return (
    <section>
      <div
        className=" h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
         shadow-lg"
      >
        {/* <img
          src={images[0]}
          alt=""
          className="w-5/6 mx-auto translate-y-12  rounded-lg shadow-md "
        /> */}
        <ImageSwiper images={images} />
        <div className=" container flex flex-col  px-4  mx-auto  md:py-20 md:px-10 lg:px-32 ">
          <h1 className="md:text-5xl font-bold leading-none text-3xl xl:max-w-3xl font-Playfair">
            {name}
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12  ">{description}</p>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="">
              <h3 className="text-3xl font-Playfair">Price Per Night</h3>
              <h2 className="text-xl">${price_per_night}</h2>
            </div>
            <div className="">
              <h3 className="text-3xl font-Playfair">Room Size</h3>
              <h2 className="text-xl">${room_size}</h2>
            </div>
            {special_offers && (
              <div className="">
                <h3 className="text-3xl font-Playfair">Special Offers</h3>
                <h2 className="text-xl">${special_offers}</h2>
              </div>
            )}
          </div>
          {/* date picker */}
          <div className="my-4">
            <h2 className="text-2xl font-Playfair my-2">
              Confirm Your Booking Date
            </h2>
            <DatePicker
              showIcon
              toggleCalendarOnIconClick
              dateFormat="dd-MM-yyyy"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
          <div className="flex flex-wrap justify-center">
            {user ? (
              <button
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
                type="button"
                className="px-8 py-3 m-8 text-lg border rounded  hover:bg-blue-400 hover:text-white"
              >
                Book Now
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-8 py-3 m-8 text-lg border rounded  hover:bg-blue-400 hover:text-white"
              >
                Book Now
              </Link>
            )}
          </div>
        </div>
        {/* review section */}
        <h3 className="text-6xl font-Playfair  max-w-7xl mx-auto">
          Room Reviews
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10 max-w-7xl mx-auto pb-10">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="w-full flex flex-col gap-4 max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg "
            >
              <div className="flex justify-center -mt-16 md:justify-end">
                <img
                  className="object-cover w-20 h-20 border-2 border-black rounded-full "
                  alt="Testimonial avatar"
                  src={review.userPhoto}
                />
              </div>
              <div className="rating">
                <input
                  checked={parseInt(review.rating) === 1}
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked={parseInt(review.rating) === 2}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked={parseInt(review.rating) === 3}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked={parseInt(review.rating) === 4}
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                  checked={parseInt(review.rating) === 5}
                />
              </div>

              <img src="/commas.svg" className="size-10" alt="" />
              <p className="flex-1">{review.comment}</p>

              <div className="flex justify-end ">
                <img src="/commas.svg" className="size-10 " alt="" />
              </div>
              <div className="flex justify-end ">
                <p className="text-lg font-medium text-blue-600 ">
                  {review.userName}
                </p>
              </div>
              <p className=" text-sm text-gray-600 flex justify-end">
                Posted {calculatePostTime(review.postTime)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="card  bg-white ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-Playfair text-2xl ">{name}</h2>
            <p className="text-wrap">{description.slice(0, 100)}..</p>
            <div>
              <p className="text-xl font-bold">Booked For : {formattedDate}</p>
              <p className="text-xl font-bold">Price : ${price_per_night}</p>
            </div>
            <div className="card-actions justify-end">
              {availability ? (
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      className="btn bg-blue-500 text-white"
                      onClick={handleBooking}
                    >
                      Confirm Booking
                    </button>
                  </form>
                </div>
              ) : (
                <button
                  className="btn bg-red-500 text-white px-8 py-3 m-8 text-lg border rounded"
                  onClick={() => toast("Sorry This Room is Already Booked")}
                >
                  Unavailable
                </button>
              )}
            </div>
          </div>
        </div>
        {/* <form method="dialog" className="modal-backdrop">
         <button
                className="btn bg-blue-500 text-white"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
        </form> */}
      </dialog>
    </section>
  );
};

export default RoomDetails;
<h2>room</h2>;
