import { useEffect, useRef, useState } from "react";
import { 
  FiPlay, 
  FiPause, 
  FiVolume2, 
  FiVolumeX, 
  FiSettings, 
  FiMaximize, 
  FiMessageSquare,
  FiShare2,
  FiDownload,
  FiMoreHorizontal,
  FiThumbsUp,
  FiThumbsDown
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const current = Math.floor(video.currentTime);
      const minutes = Math.floor(current / 60);
      const seconds = current % 60;
      setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    const handleLoadedMetadata = () => {
      const totalDuration = Math.floor(video.duration);
      const minutes = Math.floor(totalDuration / 60);
      const seconds = totalDuration % 60;
      setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      
      // Auto play when loaded
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Autoplay prevented:", error);
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="video-container w-full max-w-6xl mx-auto">
      <div className="aspect-video relative bg-black mb-3">
        <video 
          id="main-video"
          ref={videoRef} 
          className="w-full h-full" 
          autoPlay 
          muted
          playsInline
        >
          <source src="https://archive.org/download/DaddyLongLegs/Daddy%20Long%20Legs.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white mr-4 text-2xl" 
              onClick={togglePlay}
            >
              {isPlaying ? <FiPause /> : <FiPlay />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white mr-4" 
              onClick={toggleMute}
            >
              {isMuted ? <FiVolumeX /> : <FiVolume2 />}
            </Button>
            <span className="text-white text-sm">{currentTime} / {duration}</span>
          </div>
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white ml-3"
            >
              <FiMessageSquare />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white ml-3"
            >
              <FiSettings />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white ml-3"
            >
              <FiMaximize />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="px-4">
        <h1 className="text-xl font-bold mb-1">ATTENZIONE! Virus di Pasqua si Diffonde: Come Proteggersi</h1>
        <div className="flex justify-between items-start flex-wrap">
          <div className="text-[#AAAAAA] text-sm mb-4">
            1.2M visualizzazioni • 6 ore fa
          </div>
          <div className="flex items-center space-x-4 mb-4 flex-wrap">
            <Button variant="ghost" size="sm" className="flex items-center">
              <FiThumbsUp className="mr-2" />
              <span>12K</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center">
              <FiThumbsDown className="mr-2" />
              <span>NON MI PIACE</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center">
              <FiShare2 className="mr-2" />
              <span>CONDIVIDI</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center">
              <FiDownload className="mr-2" />
              <span>SALVA</span>
            </Button>
            <Button variant="ghost" size="icon">
              <FiMoreHorizontal />
            </Button>
          </div>
        </div>
        
        <Separator className="my-4 bg-gray-700" />
        
        <div className="flex items-start mb-4 flex-wrap md:flex-nowrap">
          <div className="w-10 h-10 rounded-full bg-red-600 mr-3 flex-shrink-0 flex items-center justify-center font-bold">
            T
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">TechItalia</h3>
              <span className="ml-2 text-xs bg-gray-600 rounded px-1">✓</span>
            </div>
            <p className="text-sm text-[#AAAAAA]">542K iscritti</p>
            <p className="mt-2 text-sm">
              AVVISO URGENTE: Un nuovo virus sta si sta diffondendo tramite auguri di Pasqua online. Questo video mostra come riconoscerlo e proteggersi da questo pericoloso attacco informatico.
            </p>
            <Button variant="ghost" size="sm" className="mt-2 text-sm font-medium hover:text-[#AAAAAA] p-0">
              MOSTRA ALTRO
            </Button>
          </div>
          <Button className="bg-[#FF0000] text-white rounded-full px-4 py-2 font-medium ml-auto mt-2 md:mt-0">
            ISCRIVITI
          </Button>
        </div>
      </div>
    </div>
  );
}
