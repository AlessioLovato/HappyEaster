import { Card } from "@/components/ui/card";
import { recommendedVideos } from "@/data/mockData";

export default function RecommendedVideos() {
  return (
    <div className="recommended-videos px-4 mt-6">
      <h2 className="text-lg font-bold mb-4">Recommended videos</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedVideos.map((video, index) => (
          <div key={index} className="video-preview mb-6">
            <Card className="aspect-video bg-gray-800 mb-2 rounded-lg overflow-hidden relative border-0">
              <img 
                src={video.thumbnail} 
                alt={`${video.title} thumbnail`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </Card>
            <div className="flex">
              <div className={`w-8 h-8 rounded-full ${video.channelColor} mr-2 flex-shrink-0`}></div>
              <div>
                <h3 className="font-medium text-sm leading-tight">{video.title}</h3>
                <p className="text-[#AAAAAA] text-xs mt-1">{video.channel}</p>
                <p className="text-[#AAAAAA] text-xs">{video.views} • {video.uploadTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
