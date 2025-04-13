import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import Sidebar from "./sidebar/Sidebar";

type Props = {};

const Home = ({}: Props) => {
  return (
    <div className="h-screen w-screen flex p-0">
      {/* Header */}
      <Sidebar />

      <div className="flex flex-col w-full">
        {/* Sidebar */}
        <TopBar />

        {/* Main Content Area */}
        <div
          className="main-content h-[calc(100vh-60px] overflow-y-auto"
          style={{ flex: 1, padding: "1rem" }}
        >
          <Outlet /> {/* Render nested routes here */}
        </div>
      </div>
    </div>
  );
};
export default Home;
