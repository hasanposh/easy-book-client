import { useLoaderData } from "react-router-dom";
import ImageSwiper from "../components/ImageSwiper";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const RoomDetails = () => {
  const { user } = useAuth();
  const userMail = user?.email;
  const room = useLoaderData();
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    reviews,
    description,
    _id,
  } = room;
// console.log(_id)
  const handleBooking = () => {
    const booking = {
      formattedDate,
      userMail,

      room_id: _id,
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
        <div className=" container flex flex-col  px-4  mx-auto lg:pb-56 md:py-32 md:px-10 lg:px-32 ">
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
          {availability ? (
               <button
               onClick={() => document.getElementById("my_modal_2").showModal()}
               type="button"
               className="px-8 py-3 m-8 text-lg border rounded  hover:bg-blue-400 hover:text-white"
             >
               Book Now
             </button>
              ) : (
                <button
                  className="btn bg-red-500 text-white px-8 py-3 m-8 text-lg border rounded"
                  onClick={()=>toast('Sorry This Room is Already Booked')}
                >
                  Unavailable
                </button>
              )}
          </div>
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
              <button
                className="btn bg-blue-500 text-white"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
        {/* <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form> */}
      </dialog>
    </section>
  );
};

export default RoomDetails;
<h2>room</h2>;
