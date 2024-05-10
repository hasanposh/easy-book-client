const Banner = () => {
  return (
    <div className="relative h-[600px] max-w-7xl mx-auto">
      <video
        autoPlay
        muted
        loop
        src="bannerVideo.mp4"
        className="w-full h-full object-cover"
        controlsList="nodownload"
      ></video>
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <h1 className="text-white text-center font-Playfair text-2xl md:text-4xl  font-bold">
          Unlock Your Next Adventure: <br /> Book Your Stay  with Ease Today!
        </h1>
      </div>
    </div>
  );
};

export default Banner;
