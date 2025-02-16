import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import { Heart, MessageCircle, Share2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Reel {
  video: string;
  thumbnail: string;
  title: string;
  author: { name: string };
  likes: number;
  comments: number;
  shares: number;
}

export const ReelPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(120);
  const [commentsCount, setCommentsCount] = useState(45);
  const [sharesCount, setSharesCount] = useState(30);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play();
    }
  }, [isPlaying]);

  const reel: Reel = {
    video: 'https://www.youtube.com/watch?v=G6aRok8tcXk', // Example food video (Pasta Recipe)
    thumbnail: 'https://img.youtube.com/vi/G6aRok8tcXk/maxresdefault.jpg',
    title: 'Delicious Pasta Recipe!',
    author: { name: 'ChefJohn' },
    likes: likesCount,
    comments: commentsCount,
    shares: sharesCount,
  };

  const isYouTubeVideo = reel.video.includes('youtube.com') || reel.video.includes('youtu.be');

  return (
    <div className="relative aspect-[9/16] bg-black overflow-hidden">
      {isYouTubeVideo ? (
        <YouTube
          videoId={new URL(reel.video).searchParams.get('v') || 'G6aRok8tcXk'}
          opts={{
            height: '100%',
            width: '100%',
            playerVars: {
              autoplay: 1,
              mute: isMuted ? 1 : 0,
            },
          }}
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.thumbnail}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          onClick={() => setIsPlaying(!isPlaying)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-end justify-between">
          <div className="text-white">
            <h3 className="font-bold text-lg">{reel.title}</h3>
            <p className="text-sm opacity-90">@{reel.author.name}</p>
          </div>
          <div className="flex flex-col gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsLiked(!isLiked);
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
              }}
              className="flex flex-col items-center gap-1"
            >
              <div className="bg-black/40 p-2 rounded-full">
                <Heart className={cn('w-6 h-6', isLiked && 'fill-red-500 text-red-500')} />
              </div>
              <span className="text-white text-sm">{likesCount}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setCommentsCount(commentsCount + 1)}
              className="flex flex-col items-center gap-1"
            >
              <div className="bg-black/40 p-2 rounded-full">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-sm">{commentsCount}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSharesCount(sharesCount + 1)}
              className="flex flex-col items-center gap-1"
            >
              <div className="bg-black/40 p-2 rounded-full">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-sm">{sharesCount}</span>
            </motion.button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="bg-black/40 text-white hover:bg-black/60"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
