'use client';

import { useState, useEffect, useRef } from 'react';

const quotes = [
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Don't worry about failure; you only have to be right once.",
    author: "Drew Houston"
  },
  {
    text: "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
    author: "Mark Zuckerberg"
  },
  {
    text: "I knew that if I failed I wouldn't regret that, but I knew the one thing I might regret is not trying.",
    author: "Jeff Bezos"
  },
  {
    text: "The critical ingredient is getting off your butt and doing something.",
    author: "Nolan Bushnell"
  },
  {
    text: "Build your own dreams, or someone else will hire you to build theirs.",
    author: "Farrah Gray"
  },
  {
    text: "Ideas are easy. Implementation is hard.",
    author: "Guy Kawasaki"
  },
  {
    text: "Don't be afraid to give up the good to go for the great.",
    author: "John D. Rockefeller"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    text: "Whether you think you can or you think you can't, you're right.",
    author: "Henry Ford"
  },
  {
    text: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
    author: "Bill Gates"
  },
  {
    text: "The function of leadership is to produce more leaders, not more followers.",
    author: "Ralph Nader"
  },
  {
    text: "If you are not embarrassed by the first version of your product, you've launched too late.",
    author: "Reid Hoffman"
  },
  {
    text: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",
    author: "Mark Zuckerberg"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Don't let the noise of others' opinions drown out your own inner voice.",
    author: "Steve Jobs"
  },
  {
    text: "A person who never made a mistake never tried anything new.",
    author: "Albert Einstein"
  },
  {
    text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.",
    author: "Socrates"
  },
  {
    text: "Make every detail perfect and limit the number of details to perfect.",
    author: "Jack Dorsey"
  },
  {
    text: "The value of an idea lies in the using of it.",
    author: "Thomas Edison"
  },
  {
    text: "Chase the vision, not the money; the money will end up following you.",
    author: "Tony Hsieh"
  },
  {
    text: "You don't need to have a 100-person company to develop that idea.",
    author: "Larry Page"
  }
];

const CHAR_DELAY_MS = 35;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [showAuthor, setShowAuthor] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fullText = quotes[currentIndex].text;
    setDisplayedText('');
    setShowAuthor(false);

    let charIndex = 0;

    const typeNextChar = () => {
      charIndex++;
      setDisplayedText(fullText.slice(0, charIndex));

      if (charIndex < fullText.length) {
        timeoutRef.current = setTimeout(typeNextChar, CHAR_DELAY_MS);
      } else {
        timeoutRef.current = setTimeout(() => setShowAuthor(true), 150);
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, CHAR_DELAY_MS);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  const handleNextQuote = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <main className="max-w-3xl w-full flex flex-col items-center gap-12">
        <div className="text-center space-y-8">
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light leading-relaxed text-zinc-100 min-h-[1em]">
            &ldquo;{displayedText}&rdquo;
          </blockquote>
          <cite
            className="block text-lg sm:text-xl text-zinc-500 not-italic transition-opacity duration-700"
            style={{ opacity: showAuthor ? 1 : 0 }}
          >
            — {quotes[currentIndex].author}
          </cite>
        </div>

        <button
          onClick={handleNextQuote}
          className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-lg transition-colors duration-200 font-medium text-base"
        >
          Next Quote
        </button>
      </main>
    </div>
  );
}
