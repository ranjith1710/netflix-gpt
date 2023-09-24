const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen aspect-video text-white pt-[20%] md:pt-52 md:pl-16 pl-4  pb-5 bg-gradient-to-r from-black opacity-70">
      <h1 className=" text-lg md:text-4xl font-bold">{title}</h1>
      <p className="hidden md:inline-block w-1/4">{overview}</p>
      <div className="pt-0 md:pt-4">
        <button className="bg-white  py-1 md:py-2 px-3 md:px-10 rounded-md mr-2 text-black hover:opacity-90">
          Play
        </button>
        <button className=" hidden md:inline-block bg-slate-500 py-2 px-10 rounded-md mr-2 text-white">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
