'use client';

import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import { useEffect, useState } from 'react';
import { Container } from './Container';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import { Slider } from './Slider';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);
    
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-2 my-10',
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-50 h-62 bg-gray-200 rounded-md animate-pulse"
            />
          ))}

        <Slider
          stories={stories}
          onStoryClick={onClickStory}
        />
        {/* {stories.map((story) => (
          <img
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer"
            height={248}
            width={200}
            src={story.previewImageUrl}
          />
        ))} */}

        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative w-[520px]">
              <button
                className="absolute -top-5 -right-10 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={450}
                height={650}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
