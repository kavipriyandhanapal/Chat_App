import Lottie from "lottie-react";
import Chatbubble from "../assets/Chatbubble.json";

const Chatbubblelottie = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center  bg-base-200 p-12">
      <div className="max-w-md text-center">
        <h2 className="text-2xl text-slate-50/80 font-bold mb-4">{title}</h2>
        <p className="text-base-content/60 mb-4">{subtitle} </p>
        &nbsp;&nbsp;
        <Lottie loop={true} animationData={Chatbubble} />
      </div>
    </div>
  );
};

export default Chatbubblelottie;
