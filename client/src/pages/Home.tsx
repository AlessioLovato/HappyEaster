import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoPlayer from "@/components/VideoPlayer";
import RecommendedVideos from "@/components/RecommendedVideos";
import WatchdogsOverlay from "@/components/WatchdogsOverlay";
import ScanLine from "@/components/ScanLine";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Find the video element after the component has rendered
    videoRef.current = document.querySelector('#main-video');
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0F0F0F]">
      <Header toggleSidebar={toggleSidebar} />
      <ScanLine />
      
      <div className="flex pt-14">
        <Sidebar isOpen={sidebarOpen} />
        
        <div className="w-full md:pl-[240px] pt-2 pb-10">
          <VideoPlayer />
          <RecommendedVideos />
        </div>
      </div>
      
      <WatchdogsOverlay startDelay={3000} />
    </div>
  );
}
