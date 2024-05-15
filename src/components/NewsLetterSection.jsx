import { useState } from "react";
import toast from "react-hot-toast";

const NewsLetterSection = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement your logic for submitting the email here, such as sending it to a backend server or API
    console.log("Email submitted:", email);
    // Reset the email input field after submission
    setEmail("");
    toast.success("You Subscribed Successfully");
  };
  return (
    <div className="py-10">
      <section className="flex flex-col max-w-5xl mx-auto overflow-hidden h-full w-full bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100  rounded-lg shadow-lg  md:flex-row ">
        <div className="md:flex md:items-center md:justify-center p-10 ">
          <div className="px-6 py-6 md:px-8 md:py-0">
            <h2 className="text-lg font-bold ">
            Subscribe For{" "}
              <span className="text-blue-600">
              Our deals and exclusive offers
              </span>{" "}
              Updates!
            </h2>

            <p className="mt-2 text-sm ">
              Stay in the loop! Dont miss out on our latest updates, exclusive
              deals, and special offers. Subscribe to our newsletter today and
              be the first to know about exciting news, promotions, and more.
              Join our community of subscribers and unlock access to insider
              information and exclusive perks. Sign up now to stay informed and
              take advantage of all the benefits our newsletter has to offer!
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center  p-10  dark:bg-gray-800">
          <form onSubmit={handleSubmit}>
            <label className="text-white " htmlFor="">
              Enter Your Email For Register
            </label>
            <div className="flex flex-col overflow-hidden border rounded-lg dark:border-gray-600 lg:flex-row dark:focus-within:border-blue-300 focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                value={email}
                onChange={handleChange}
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none dark:bg-gray-800 dark:placeholder-gray-400 focus:placeholder-transparent dark:focus:placeholder-transparent"
                type="text"
                name="email"
                placeholder="Enter your email"
                aria-label="Enter your email"
              />
              <button
                type="submit"
                className="px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
              >
                subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewsLetterSection;
