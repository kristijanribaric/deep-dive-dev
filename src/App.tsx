import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { PredefinedMessages } from './utils/predefined-messages.ts';
import { TextObject } from './utils/types/textObject.ts';
import DivingHelmetIcon from './components/DivingHelmetIcon';
import Typewriter from './components/Typewriter';
import { typeSound, audioKeys } from './utils/sounds.ts';

export default function App() {
  const [writing, setWriting] = useState<TextObject[]>([PredefinedMessages.Intro]);
  const [showIcon, setShowIcon] = useState(false);
  const [content, setContent] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [monitorClass, setMonitorClass] = useState('off');
  const [iconClass, setIconClass] = useState('icon-center');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (option: string) => {
    let newWindow: Window | null;
    switch (option.trim().toLowerCase()) {
      case '':
        break;
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
      case '5':
        setMonitorClass('off turn-off');
        break;
      case 'help':
        setWriting(prevState => [...prevState, PredefinedMessages.HelpIntro]);
        break;
      default:
        setWriting(prevState => [...prevState, PredefinedMessages.Unknown]);
        break;
    }
  };

  const handleKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if (isTyping) {
        return;
      }

      // if key is backspace, delete last character from stat
      if (e.key === 'Backspace') {
        setContent(prevState => prevState.slice(0, -1));
        await audioKeys[2].play();
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
        await audioKeys[3].play();
        setContent('');
        return;
      }

      // Check if the key pressed is a letter, number, symbol, or dot
      if (e.key.match(/^[a-zA-Z0-9-_.!@#$%^&*()+=,<>?/\\{}[\]~` ]$/) && content.length < 50) {
        setContent(prevState => prevState + e.key);
        await typeSound();
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

  useEffect(() => {
    const timer1 = setTimeout(() => setMonitorClass('turn-on off'), 1000);
    const timer2 = setTimeout(() => setMonitorClass('turn-on'), 1500);
    const timer3 = setTimeout(() => setShowIcon(true), 1800);
    const timer4 = setTimeout(() => setIconClass('icon-center flicker'), 2600);
    const timer5 = setTimeout(() => {
      setShowIcon(false);
      setMonitorClass('');
    }, 6800);

    // Clear all timers if the component is unmounted
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  return (
    <>
      <div className="theme-green">
        <div id="monitor" className={monitorClass}>
          <div id="screen">
            <div id="crt">
              <div className="scanline"></div>
              <div className="terminal">
                {showIcon ? (
                  <div className={iconClass}>
                    <DivingHelmetIcon />
                    <p>DeepDiveDev BIOS v1.0.3 Booting...</p>
                  </div>
                ) : (
                  !monitorClass && (
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
                        <div className="prompt">
                          <span>&gt; {content}</span>
                          <div className="cursor-wrapper">
                            <input disabled={isTyping} className="prompt-input" value={content} onChange={e => setContent(e.target.value)} />
                            <span className="cursor"></span>
                          </div>
                        </div>
                      )}
                    </>
                  )
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
