import PropTypes from "prop-types";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles from the swiper package
import "swiper/css";

const ImageSwiper = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      // pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log('slide change')}
    >
      {images.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <img
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className="w-5/6 md:h-[700px] mx-auto translate-y-12 object-cover rounded-lg shadow-md "
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSwiper;

ImageSwiper.propTypes = {
  images: PropTypes.object,
};
