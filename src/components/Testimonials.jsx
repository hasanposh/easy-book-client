import { useEffect, useState } from "react";
// import useReviews from "../hooks/useReviews";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import moment from "moment";

// import './styles.css';

// import required modules

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    // fetchInitialData();
    fetch(`${import.meta.env.VITE_API_URL}/allReviews`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
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
  // console.log(reviews);
  return (
    <div
      className=" p-10 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
    "
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-bold  font-Playfair">
          Dont just take our word for it
        </h1>
        <h1 className="text-center text-xl ">
          Witness it first hand,directly from our lovely customers
        </h1>

        {
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {reviews.map((review) => {
              return (
                <SwiperSlide key={review._id}>
                  <div className="container flex flex-col  items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
                    <div className="flex flex-col mx-4 my-6 w-96 shadow-lg">
                      <div className="px-4 py-12 rounded-t-lg flex-grow">
                        <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            className="w-8 h-8 dark:text-violet-600"
                          >
                            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                          </svg>
                          {review.comment.slice(0,100)}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                            className="absolute right-0 w-8 h-8 dark:text-violet-600"
                          >
                            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                          </svg>
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-blue-500 dark:text-gray-50">
                        <img
                          src={review.userPhoto}
                          alt=""
                          className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full"
                        />
                        <p className="text-xl font-semibold leading-tight">
                        {review.userName}
                        </p>
                        <p className="text-sm uppercase">Posted {calculatePostTime(review.postTime)}</p>
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
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        }
      </div>
    </div>
  );
};

export default Testimonials;
