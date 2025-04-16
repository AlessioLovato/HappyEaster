import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMobile } from "@/hooks/use-mobile";
import { FiSearch, FiMenu, FiVideo, FiBell, FiMic } from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const isMobile = useMobile();

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0F0F0F] flex items-center justify-between p-2 h-14 z-40 border-b border-gray-700">
      <div className="flex items-center">
        <Button 
          onClick={toggleSidebar} 
          variant="ghost" 
          size="icon" 
          className="text-white md:ml-0"
        >
          <FiMenu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center ml-2">
          <FaYoutube className="text-[#FF0000] text-3xl mr-1" />
          <span className="text-white font-medium text-xl">YouTube</span>
        </div>
      </div>

      {!isMobile && (
        <div className="flex items-center flex-grow justify-center mx-8">
          <div className="flex w-full max-w-xl">
            <Input
              type="text"
              placeholder="Search"
              className="p-2 pl-4 bg-[#272727] text-white rounded-l-full border border-gray-600 w-full focus:outline-none focus:border-blue-500"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button className="bg-gray-700 p-2 px-4 rounded-r-full border border-gray-600 border-l-0">
              <FiSearch className="text-gray-300" />
            </Button>
          </div>
          <Button className="ml-4 bg-[#272727] p-2 rounded-full" size="icon" variant="ghost">
            <FiMic className="text-white" />
          </Button>
        </div>
      )}

      <div className="flex items-center">
        {isMobile && (
          <Button className="p-2" variant="ghost" size="icon">
            <FiSearch className="text-white h-5 w-5" />
          </Button>
        )}
        <Button className="p-2" variant="ghost" size="icon">
          <FiVideo className="text-white h-5 w-5" />
        </Button>
        <Button className="p-2" variant="ghost" size="icon">
          <FiBell className="text-white h-5 w-5" />
        </Button>
        <Button className="ml-2 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center" size="icon">
          U
        </Button>
      </div>
    </header>
  );
}
