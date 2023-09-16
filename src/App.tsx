import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { PredefinedMessages } from './utils/predefined-messages.ts';
import { TextObject } from './utils/types/textObject.ts';
import DivingHelmetIcon from './components/DivingHelmetIcon';
import Typewriter from './components/Typewriter';
import { typeSound, audioKeys } from './utils/sounds.ts';

export default function App() {
  const [writing, setWriting] = useState<TextObject[]>([PredefinedMessages.Intro]);

  const [showIcon, setShowIcon] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (option: string) => {
    let newWindow: Window | null;
    switch (option.trim()) {
      case '1':
        setWriting(prevState => [...prevState, PredefinedMessages.About]);
        break;
      case '2':
        setWriting(prevState => [...prevState, PredefinedMessages.Portfolio]);
        break;
      case '2.1':
        setWriting(prevState => [...prevState, PredefinedMessages.PortifolioExternal]);
        break;
      case '2.2':
        newWindow = window.open('https://github.com/kristijanribaric', '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Pop-up was blocked
          setWriting(prevState => [...prevState, PredefinedMessages.FailedGithubRedirect]);
        } else {
          // Pop-up was not blocked
          setWriting(prevState => [...prevState, PredefinedMessages.SuccessfulRedirect]);
        }
        break;
      case '3':
        setWriting(prevState => [...prevState, PredefinedMessages.Skills]);
        break;
      case '4':
        setWriting(prevState => [...prevState, PredefinedMessages.Contact]);
        break;
      case '4.1':
        newWindow = window.open('https://www.linkedin.com/in/kristijan-ribaric', '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Pop-up was blocked
          setWriting(prevState => [...prevState, PredefinedMessages.FailedLinkedInRedirect]);
        } else {
          // Pop-up was not blocked
          setWriting(prevState => [...prevState, PredefinedMessages.SuccessfulRedirect]);
        }
        break;
      case '4.2':
        newWindow = window.open('https://github.com/kristijanribaric', '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          // Pop-up was blocked
          setWriting(prevState => [...prevState, PredefinedMessages.FailedGithubRedirect]);
        } else {
          // Pop-up was not blocked
          setWriting(prevState => [...prevState, PredefinedMessages.SuccessfulRedirect]);
        }
        break;
      case 'help':
        setWriting(prevState => [...prevState, PredefinedMessages.HelpIntro]);
        break;
      default:
        setWriting(prevState => [...prevState, PredefinedMessages.Unknown]);
        break;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcon(false);
    }, 4000); // Hide after 3 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, []);

  const [content, setContent] = useState('');

  const [isTyping, setIsTyping] = useState(true);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isTyping) {
        return;
      }

      // if key is backspace, delete last character from stat
      if (e.key === 'Backspace') {
        setContent(prevState => prevState.slice(0, -1));
        audioKeys[2].play();
        return;
      }

      // if key is Enter, check if command is valid
      if (e.key === 'Enter') {
        const contentObj: TextObject = {
          text: `> ${content}`,
          type: false,
        };
        setWriting(prevState => [...prevState, contentObj]);
        handleLinkClick(content);
        audioKeys[3].play();
        setContent('');
        return;
      }

      // Check if the key pressed is a letter, number, symbol, or dot
      if (e.key.match(/^[a-zA-Z0-9-_.!@#$%^&*()+=,<>?/\\{}[\]~` ]$/) && content.length < 50) {
        setContent(prevState => prevState + e.key);
        typeSound();
        return;
      }
    },
    [isTyping, content],
  );

  useEffect(() => {
    // Attach the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <div className="theme-green">
        <div id="monitor">
          <div id="screen">
            <div id="crt">
              <div className="scanline"></div>
              <div className="terminal">
                {showIcon ? (
                  <div className="icon-center">
                    <DivingHelmetIcon />
                    <p>DeepDiveDev BIOS v1.0.3 Booting...</p>
                  </div>
                ) : (
                  <>
                    <Typewriter
                      typingDelay={30}
                      texts={writing}
                      onTypingStart={() => setIsTyping(true)}
                      onTypingEnd={() => setIsTyping(false)}
                      onLetterTyped={() => {
                        setTimeout(() => {
                          if (bottomRef.current) {
                            bottomRef.current.scrollIntoView({ block: 'end', behavior: 'instant', inline: 'end' });
                          }
                        }, 1);
                      }}
                    />
                    {isTyping && <span className="cursor"></span>}
                    {!isTyping && (
                      <div>
                        <span>&gt; {content}</span>
                        <div className="cursor-wrapper">
                          <input disabled={isTyping} className="prompt-input" value={content} onChange={e => setContent(e.target.value)} />
                          <span className="cursor"></span>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div ref={bottomRef}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
