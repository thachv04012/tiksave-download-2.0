import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Video, User, LogIn } from 'lucide-react';

interface WelcomePageProps {
  onLogin: (asGuest: boolean) => void;
}

export function WelcomePage({ onLogin }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-border bg-card/50 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="pt-12 pb-10 px-8 flex flex-col items-center text-center">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="p-5 bg-primary rounded-3xl shadow-2xl shadow-primary/40 mb-8"
            >
              <Video className="w-12 h-12 text-primary-foreground" />
            </motion.div>

            <h1 className="text-4xl font-black tracking-tighter mb-3">
              TIK<span className="text-primary">SAVE</span>
            </h1>
            <p className="text-muted-foreground mb-10 font-medium">
              Chào mừng bạn đến với kho lưu trữ video TikTok cá nhân.
            </p>

            <div className="w-full space-y-4">
              <Button 
                onClick={() => onLogin(false)}
                className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <LogIn className="w-5 h-5" />
                Đăng nhập
              </Button>
              
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-bold tracking-widest">Hoặc</span>
                </div>
              </div>

              <Button 
                variant="outline"
                onClick={() => onLogin(true)}
                className="w-full h-14 rounded-2xl border-border bg-secondary/50 hover:bg-secondary text-foreground font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <User className="w-5 h-5" />
                Tiếp tục với khách
              </Button>
            </div>

            <p className="mt-8 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
              Bảo mật • Riêng tư • Tốc độ
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
