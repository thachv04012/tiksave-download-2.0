import React, { useEffect, useRef } from 'react';

interface TikTokEmbedProps {
  url: string;
}

export function TikTokEmbed({ url }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load TikTok embed script if not already loaded
    const scriptId = 'tiktok-embed-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // If script is already loaded, we might need to trigger a reload
    // TikTok's script usually looks for blockquotes and transforms them.
    if (window.tiktok && typeof window.tiktok.reload === 'function') {
      window.tiktok.reload();
    }
  }, [url]);

  // Extract video ID for the blockquote cite and data-video-id
  // Example URL: https://www.tiktok.com/@user/video/123456789
  const videoId = url.split('/video/')[1]?.split('?')[0];

  return (
    <div ref={containerRef} className="w-full flex justify-center overflow-hidden rounded-xl bg-muted/20 min-h-[500px]">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={videoId}
        style={{ maxWidth: '605px', minWidth: '325px' }}
      >
        <section>
          <a target="_blank" title="TikTok Video" href={url} rel="noreferrer">
            Loading video...
          </a>
        </section>
      </blockquote>
    </div>
  );
}
