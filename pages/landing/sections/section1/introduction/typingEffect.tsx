import { useEffect, useState } from "react";

enum State {
  Typing,
  Pausing,
  Deleting
}

export const TypingEffect = (subtitles: Array<string>) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [state, setState] = useState(State.Typing);
  const [typedSubtitle, setTypedSubtitle] = useState('')
  useEffect(() => {

    switch (state) {
      case State.Deleting: {
        if (!typedSubtitle) {
          const timeoutDeleting = setTimeout(() => {
            const nextIndex = selectedIndex + 1;
            setSelectedIndex(subtitles[nextIndex] ? nextIndex : 0);
            setState(State.Typing);
          }, 100)
          return () => clearTimeout(timeoutDeleting)
        }

        const nextRemainingSubtitle = subtitles[selectedIndex].slice(0, typedSubtitle.length - 1);

        const timeout = setTimeout(() => {
          setTypedSubtitle(nextRemainingSubtitle);
        }, 100);

        return () => clearTimeout(timeout);
      }
      case State.Typing: {
        const nextTypedSubtitle = subtitles[selectedIndex].slice(0, typedSubtitle.length + 1);

        if (nextTypedSubtitle === typedSubtitle) {
          setState(State.Pausing)
          return;
        }

        const timeoutTyping = setTimeout(() => {
          setTypedSubtitle(nextTypedSubtitle);
        }, 120);

        return () => clearTimeout(timeoutTyping);
      }
      case State.Pausing:
      default:
        const timeoutPausing = setTimeout(() => {
          setState(State.Deleting)
        }, 120)

        return () => clearTimeout(timeoutPausing)
    }

  }, [subtitles, typedSubtitle, selectedIndex, state]);

  return typedSubtitle;
}