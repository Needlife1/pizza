'use client';

import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Container } from './Container';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import { Slider } from './Slider';
import { calcPlayerSize } from '@/shared/services/calc';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();
  const [playerSize, setPlayerSize] = useState<{ w: number; h: number }>(() =>
    calcPlayerSize()
  );
  const scrollYRef = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    (async () => {
      const data = await Api.stories.getAll();
      setStories(data);
    })();
  }, []);

  const applyPlayerSize = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setPlayerSize(calcPlayerSize());
    });
  }, []);

  useEffect(() => {
    applyPlayerSize();
    window.addEventListener('resize', applyPlayerSize);
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', applyPlayerSize);
    };
  }, [applyPlayerSize]);

  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      const y = scrollYRef.current;
      const body = document.body;
      (document.documentElement as HTMLElement).style.scrollbarGutter =
        'stable both-edges';
      body.style.position = 'fixed';
      body.style.top = `-${y}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
      body.style.paddingRight = '0';
    } else {
      const body = document.body;
      const y = Math.abs(parseInt(body.style.top || '0', 10));
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      body.style.paddingRight = '';
      (document.documentElement as HTMLElement).style.scrollbarGutter = '';
      if (y) window.scrollTo(0, y);
    }
    return () => {
      if (document.body.style.position === 'fixed') {
        const y = Math.abs(parseInt(document.body.style.top || '0', 10));
        document.body.removeAttribute('style');
        (document.documentElement as HTMLElement).style.scrollbarGutter = '';
        if (y) window.scrollTo(0, y);
      }
    };
  }, [open]);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);
    if (story.items.length > 0) setOpen(true);
  };

  const storyItems = useMemo(
    () => selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || [],
    [selectedStory]
  );

  return (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-2 my-10',
          className
        )}
      >
        <Slider stories={stories} onStoryClick={onClickStory} />
      </Container>

      {open && (
        <div className="fixed inset-0 z-[60] sm:z-[70] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className={cn(
              'relative',
              'px-4 sm:px-6 py-6 sm:py-8',
              'pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]'
            )}
          >
            <button
              className="absolute -top-2 right-3 sm:-top-4 sm:right-4 w-10 h-10 rounded-full grid place-items-center hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
            >
              <X className="w-7 h-7 text-white/80" />
            </button>

            <div className="relative mx-auto">
              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={storyItems}
                defaultInterval={3000}
                width={playerSize.w}
                height={playerSize.h}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
