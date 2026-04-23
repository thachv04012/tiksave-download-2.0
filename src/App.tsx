import { useState, useEffect } from 'react';
import { TikTokEmbed } from './components/TikTokEmbed';
import { WelcomePage } from './components/WelcomePage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Plus, Trash2, Video, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SavedVideo {
  id: string;
  url: string;
  title: string;
  addedAt: number;
}

export default function App() {
  const [url, setUrl] = useState('');
  const [videos, setVideos] = useState<SavedVideo[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('tiktok-videos');
    if (saved) {
      try {
        setVideos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved videos', e);
      }
    }
    
    const authStatus = localStorage.getItem('is-logged-in');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
    }

    // Force dark mode for this theme
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('tiktok-videos', JSON.stringify(videos));
  }, [videos]);

  const handleLogin = (asGuest: boolean) => {
    setIsLoggedIn(true);
    setIsGuest(asGuest);
    localStorage.setItem('is-logged-in', 'true');
    if (asGuest) {
      toast.info('Đã đăng nhập với tư cách Khách');
    } else {
      toast.success('Đăng nhập thành công');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('is-logged-in');
    toast.info('Đã đăng xuất');
  };

  const handleAddVideo = () => {
    if (!url) return;
    
    if (!url.includes('tiktok.com')) {
      toast.error('Vui lòng nhập link TikTok hợp lệ');
      return;
    }

    if (videos.some(v => v.url === url)) {
      toast.error('Video này đã có trong danh sách');
      return;
    }

    const newVideo: SavedVideo = {
      id: Math.random().toString(36).substring(7),
      url: url,
      title: 'Video TikTok',
      addedAt: Date.now(),
    };

    setVideos([newVideo, ...videos]);
    setUrl('');
    toast.success('Đã thêm video vào danh sách');
  };

  const handleDelete = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
    toast.info('Đã xóa video');
  };

  if (!isLoggedIn) {
    return (
      <>
        <WelcomePage onLogin={handleLogin} />
        <Toaster richColors closeButton />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <header className="min-h-[100px] md:h-[120px] px-4 md:px-[60px] border-b border-border flex flex-col md:flex-row justify-between items-center py-6 md:py-0 gap-6">
        <div className="flex justify-between items-center w-full md:w-auto">
          <div className="text-2xl font-extrabold tracking-tighter flex items-center gap-1">
            TIK<span className="text-primary">SAVE</span>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
              {videos.length} Videos
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="h-8 w-8 rounded-full">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-[600px]">
          <Input
            placeholder="Dán link video TikTok tại đây..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 h-12 bg-secondary border-border px-5 rounded-lg text-sm focus-visible:ring-primary"
            onKeyDown={(e) => e.key === 'Enter' && handleAddVideo()}
          />
          <Button 
            onClick={handleAddVideo} 
            className="h-12 px-6 bg-foreground text-background hover:bg-foreground/90 font-semibold rounded-lg transition-opacity uppercase text-xs tracking-wider whitespace-nowrap"
          >
            LƯU VIDEO
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="text-[11px] text-muted-foreground uppercase font-bold tracking-widest">
            {videos.length} Videos Đã Lưu
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="text-[11px] font-bold uppercase tracking-widest hover:text-destructive transition-colors"
          >
            Đăng xuất
          </Button>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-[60px]">
        <AnimatePresence mode="popLayout">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <Card className="h-[500px] flex flex-col overflow-hidden border border-border bg-card rounded-2xl shadow-none">
                <div className="flex-1 bg-black overflow-hidden">
                  <TikTokEmbed url={video.url} />
                </div>
                
                <div className="p-5 h-[140px] flex flex-col">
                  <h3 className="text-[15px] font-medium leading-snug mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground mb-4">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>@tiktok_user</span>
                  </div>
                  
                  <div className="mt-auto pt-3 border-t border-border flex justify-between items-center">
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="text-[12px] font-bold text-destructive uppercase tracking-widest hover:opacity-80 transition-opacity"
                    >
                      Xóa
                    </button>
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(video.addedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mb-6">
            <Video className="w-8 h-8 text-muted-foreground/30" />
          </div>
          <h3 className="text-xl font-bold text-muted-foreground mb-2">Chưa có video nào</h3>
          <p className="text-muted-foreground/50 max-w-xs">
            Bắt đầu bằng cách dán một liên kết TikTok vào ô tìm kiếm ở trên.
          </p>
        </div>
      )}
      
      <Toaster richColors closeButton />
    </div>
  );
}
