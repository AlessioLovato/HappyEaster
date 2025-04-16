import { useState } from 'react';
import { FiMenu, FiSearch, FiMic, FiBell, FiUser, FiVideo, FiGrid } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0F0F0F] flex items-center justify-between px-4 z-50 border-b border-[#272727]">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-4 text-xl"
        >
          <FiMenu />
        </Button>
        <div className="hidden sm:flex items-center">
          <span className="font-bold text-xl">RetroTube</span>
          <span className="ml-1 text-xs text-[#AAAAAA]">Italia</span>
        </div>
      </div>
      
      <div className={`flex-1 max-w-[700px] mx-4 ${searchFocused ? 'md:mx-0' : ''}`}>
        <div className="flex">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search"
              className="bg-[#121212] border-[#303030] rounded-l-full h-10 pl-4 pr-10 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          <Button 
            variant="ghost" 
            className="bg-[#222222] h-10 px-5 rounded-r-full border border-l-0 border-[#303030]"
          >
            <FiSearch />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-2 bg-[#181818] rounded-full h-10 w-10 hidden sm:flex"
          >
            <FiMic />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="hidden sm:flex"
        >
          <FiVideo />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="hidden sm:flex"
        >
          <FiGrid />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
        >
          <FiBell />
        </Button>
        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold ml-2">
          U
        </div>
      </div>
    </header>
  );
}