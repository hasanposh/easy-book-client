import { useEffect } from "react";
import Banner from "../components/Banner";
import FeaturedRoom from "../components/FeaturedRoom";
import HotelMap from "../components/HotelMap";
import NewsLetterSection from "../components/NewsLetterSection";
import Testimonials from "../components/Testimonials";

const HomePage = () => {
  const runModal = () => {
    document.getElementById("my_modal_3").showModal();
  };
  useEffect(() => {
    runModal();
  }, []);
  return (
    <div>
      <Banner />
      <FeaturedRoom />
      <NewsLetterSection />
      <Testimonials />
      <HotelMap />
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>open modal</button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="relative m-2 bg-blue-400 p-4 md:w-5/6 md:h-5/6 bg-cover rounded-xl bg-center bg-[linear-gradient(45deg,rgba(0,0,0,0.7),rgba(0,0,0,0.3)),url('https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg')] ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm  text-white  btn-circle btn-ghost absolute z-50 right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col w-full h-full justify-center items-center text-white">
            <h3 className="font-bold text-2xl md:text-5xl font-Playfair text-center">
              Get 30% Off on Every Rooms
            </h3>
            <p className="py-4 w-4/6 text-sm md:text-base text-center">
              Experience luxury for less with our exclusive promotion! For a
              limited time only, enjoy a fantastic 30% discount on every room
              booking. Whether you're planning a weekend getaway or an extended
              stay, this offer is available for all room types to suit your
              preferences. Simply book between May 15th and June 15th, 2024, to
              take advantage of this incredible deal.
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default HomePage;
