import React, { useState, useEffect, useRef } from 'react';
import { TextObject } from '../../utils/types/textObject.ts';

type TypewriterProps = {
  texts: TextObject[];
  typingDelay?: number;
  onTypingStart?: () => void;
  onTypingEnd?: () => void;
  onLetterTyped?: () => void;
};

const Typewriter: React.FC<TypewriterProps> = ({ texts, typingDelay = 100, onTypingStart, onTypingEnd, onLetterTyped }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const hasStartedTyping = useRef(false);

  const skipTyping = () => {
    if (!texts[currentTextIndex]) {
      return;
    }
    // Get the unwritten part of the current text
    const unwrittenPartOfCurrentText = texts[currentTextIndex].text.slice(currentCharIndex);

    // Get the entire remaining texts after the current text
    const remainingTexts = texts
      .slice(currentTextIndex + 1)
      .map(t => t.text)
      .join('\n');

    // Update the displayedText with the unwritten part of the current text and the remaining texts
    setDisplayedText(prevText => prevText + unwrittenPartOfCurrentText + remainingTexts);

    // Update indices to indicate completion
    setCurrentTextIndex(texts.length);
    setCurrentCharIndex(0);

    // Remove event listeners
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('click', handleClick);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      skipTyping();
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (e.button === 0) {
      // Left mouse button
      skipTyping();
    }
  };

  // every time displayed text changes invoke onLetterTyped
  useEffect(() => {
    onLetterTyped && onLetterTyped();
  }, [displayedText]);

  useEffect(() => {
    // Add event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClick);

    return () => {
      // Cleanup: remove event listeners
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClick);
    };
  }, [currentTextIndex, currentCharIndex]);

  useEffect(() => {
    if (currentTextIndex >= texts.length) {
      hasStartedTyping.current = false;
      onTypingEnd && onTypingEnd();
      return;
    }

    const currentTextObject = texts[currentTextIndex];
    const currentText = currentTextObject.text;

    if (!hasStartedTyping.current) {
      onTypingStart && onTypingStart();
      hasStartedTyping.current = true;
    }

    if (currentTextObject.type) {
      if (currentCharIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(prevText => prevText + currentText[currentCharIndex]);
          setCurrentCharIndex(prevIndex => prevIndex + 1);
        }, typingDelay);

        return () => clearTimeout(timeout);
      } else {
        setDisplayedText(prevText => prevText); // Append a newline character
        setCurrentTextIndex(prevIndex => prevIndex + 1);
        setCurrentCharIndex(0);
      }
    } else {
      setDisplayedText(prevText => prevText + currentText + '\n'); // Append a newline character
      setCurrentTextIndex(prevIndex => prevIndex + 1);
    }
  }, [currentTextIndex, currentCharIndex, typingDelay, texts, onTypingEnd]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
