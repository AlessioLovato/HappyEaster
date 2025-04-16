import { useMobile } from '@/hooks/use-mobile';
import { 
  FiHome, 
  FiCompass, 
  FiClock, 
  FiThumbsUp, 
  FiPlay, 
  FiYoutube, 
  FiMusic, 
  FiFilm, 
  FiTv, 
  FiSettings,
  FiFlag,
  FiHelpCircle
} from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const isMobile = useMobile();
  
  // Minimal sidebar shown on mobile or when the main sidebar is closed
  if (isMobile || !isOpen) {
    return (
      <div className="fixed left-0 top-14 bottom-0 w-[72px] bg-[#0F0F0F] z-40 hidden md:block">
        <div className="flex flex-col items-center py-3">
          <MenuItem icon={<FiHome />} label="Home" mini />
          <MenuItem icon={<FiCompass />} label="Explore" mini />
          <MenuItem icon={<FiYoutube />} label="Shorts" mini />
          <MenuItem icon={<FiPlay />} label="Subscriptions" mini />
          <MenuItem icon={<FiClock />} label="Library" mini />
        </div>
      </div>
    );
  }
  
  // Full sidebar
  return (
    <div className={`fixed left-0 top-14 bottom-0 w-[240px] bg-[#0F0F0F] overflow-y-auto z-40 transition-all duration-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="py-3">
        <div className="px-3 mb-2">
          <MenuItem icon={<FiHome />} label="Home" active />
          <MenuItem icon={<FiCompass />} label="Explore" />
          <MenuItem icon={<FiYoutube />} label="Shorts" />
          <MenuItem icon={<FiPlay />} label="Subscriptions" />
        </div>
        
        <hr className="border-[#272727] my-2" />
        
        <div className="px-3 mb-2">
          <MenuItem icon={<FiClock />} label="Library" />
          <MenuItem icon={<FiClock />} label="History" />
          <MenuItem icon={<FiThumbsUp />} label="Liked videos" />
        </div>
        
        <hr className="border-[#272727] my-2" />
        
        <div className="px-4 mb-2">
          <h3 className="text-sm font-medium mb-1">Subscriptions</h3>
          <ChannelItem name="RetroTech" color="bg-red-500" />
          <ChannelItem name="VintageComputing" color="bg-blue-500" />
          <ChannelItem name="OldSchoolGames" color="bg-green-500" />
          <ChannelItem name="80sMusic" color="bg-purple-500" />
          <ChannelItem name="ClassicMovies" color="bg-yellow-500" />
        </div>
        
        <hr className="border-[#272727] my-2" />
        
        <div className="px-3 mb-2">
          <h3 className="text-sm px-3 font-medium mb-1">Explore</h3>
          <MenuItem icon={<FiMusic />} label="Music" />
          <MenuItem icon={<FiFilm />} label="Movies" />
          <MenuItem icon={<FiTv />} label="Gaming" />
        </div>
        
        <hr className="border-[#272727] my-2" />
        
        <div className="px-3 mb-2">
          <MenuItem icon={<FiSettings />} label="Settings" />
          <MenuItem icon={<FiFlag />} label="Report history" />
          <MenuItem icon={<FiHelpCircle />} label="Help" />
        </div>
        
        <div className="px-4 py-3 text-xs text-[#AAAAAA]">
          <div className="mb-4">
            <p>About Press Copyright</p>
            <p>Contact us Creators Advertise</p>
            <p>Developers</p>
          </div>
          
          <div>
            <p>Terms Privacy Policy & Safety</p>
            <p>How RetroTube works</p>
            <p>Test new features</p>
          </div>
          
          <p className="mt-4">© 2025 RetroTube 80s</p>
        </div>
      </div>
    </div>
  );
}

// Mini menu item for collapsed sidebar
function MenuItem({ 
  icon, 
  label, 
  active = false, 
  mini = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean;
  mini?: boolean;
}) {
  if (mini) {
    return (
      <div className="flex flex-col items-center justify-center py-4 cursor-pointer hover:bg-[#272727] w-full">
        <div className={`text-lg ${active ? 'text-white' : 'text-[#AAAAAA]'}`}>{icon}</div>
        <span className="text-[10px] mt-1">{label}</span>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${active ? 'bg-[#272727]' : 'hover:bg-[#1F1F1F]'}`}>
      <div className="text-xl mr-6">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
}

// Channel item for subscriptions section
function ChannelItem({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-[#1F1F1F]">
      <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-xs mr-6`}>
        {name.charAt(0)}
      </div>
      <span className="text-sm">{name}</span>
    </div>
  );
}