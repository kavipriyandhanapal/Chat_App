import NavBar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import InitialChatScreen from "../components/InitalChatScreen";
import FinalChatScreen from "../components/FinalChatScreen";

import  useChatStore  from "../store/useChatStore";

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div>
      <NavBar />
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center pt-20 px-4">
          <div className="bg-base-100 rounded-xl shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] ">
            <div className="flex h-full rounded-xl overflow-hidden">
              <Sidebar />

              {!selectedUser ? <InitialChatScreen /> : <FinalChatScreen />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
