import { useMobile } from '@/hooks/use-mobile';
import { recommendedVideos } from '@/data/mockData';

export default function RecommendedVideos() {
  const isMobile = useMobile();
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-10">
      <h2 className="text-xl font-bold mb-4">Recommended Videos</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedVideos.map((video, index) => (
          <div key={index} className="flex flex-col">
            <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden mb-2">
              <div 
                className="w-full h-full bg-cover bg-center" 
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </div>
            <div className="flex">
              <div className="w-9 h-9 rounded-full bg-blue-600 flex-shrink-0 mr-2 flex items-center justify-center font-bold text-white">
                {video.channel.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm font-medium line-clamp-2">{video.title}</h3>
                <p className="text-xs text-[#AAAAAA] mt-1">{video.channel}</p>
                <p className="text-xs text-[#AAAAAA]">{video.views} • {video.uploadTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}