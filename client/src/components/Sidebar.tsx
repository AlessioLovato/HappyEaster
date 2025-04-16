import { ScrollArea } from "@/components/ui/scroll-area";
import { FiHome, FiTrendingUp, FiPlayCircle, FiFilm, FiClock, FiThumbsUp, FiClock as FiHistory } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const sidebarItems = [
    { icon: <FiHome className="mr-6 text-lg" />, label: "Home", active: true },
    { icon: <FiTrendingUp className="mr-6 text-lg" />, label: "Trending" },
    { icon: <FiPlayCircle className="mr-6 text-lg" />, label: "Subscriptions" },
  ];

  const libraryItems = [
    { icon: <FiFilm className="mr-6 text-lg" />, label: "Library" },
    { icon: <FiHistory className="mr-6 text-lg" />, label: "History" },
    { icon: <FiClock className="mr-6 text-lg" />, label: "Watch Later" },
    { icon: <FiThumbsUp className="mr-6 text-lg" />, label: "Liked Videos" },
  ];

  const subscriptions = [
    { color: "bg-red-500", name: "Tech Channel" },
    { color: "bg-blue-500", name: "Gaming Channel" },
    { color: "bg-green-500", name: "Music Channel" },
    { color: "bg-yellow-500", name: "Retro Computing" },
  ];

  const sidebarClass = isOpen
    ? "fixed left-0 top-14 w-[240px] bg-[#0F0F0F] h-screen overflow-y-auto z-30 md:translate-x-0 transition-transform duration-300"
    : "fixed left-0 top-14 w-[240px] bg-[#0F0F0F] h-screen overflow-y-auto z-30 -translate-x-full md:translate-x-0 transition-transform duration-300";

  return (
    <div id="sidebar" className={sidebarClass}>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="p-3">
          <div className="flex flex-col">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center p-2 rounded-lg hover:bg-[#272727] mb-1 ${
                  item.active ? "bg-gray-700" : ""
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <hr className="border-gray-700 my-2" />

          <div className="flex flex-col">
            {libraryItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center p-2 rounded-lg hover:bg-[#272727] mb-1"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>

          <hr className="border-gray-700 my-2" />

          <h3 className="px-2 py-1 text-sm text-gray-400 font-medium">
            SUBSCRIPTIONS
          </h3>

          {subscriptions.map((sub, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center p-2 rounded-lg hover:bg-[#272727] mb-1"
            >
              <div className={`w-6 h-6 rounded-full ${sub.color} mr-6`}></div>
              <span>{sub.name}</span>
            </a>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
