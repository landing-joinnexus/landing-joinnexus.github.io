import { toast } from "react-toastify";

export const registerNewPopup = (key: string, message: string, ms: number, link?: string, duration = 500) => {
  const storageKey = `popup_${key}`;
  const alreadyShowed = localStorage.getItem(storageKey);
  if (!alreadyShowed) {
    setTimeout(() => {
      if (!link) {
        localStorage.setItem(storageKey, "1");
      }
      const onClick = () => {
        if (link) {
          window.open(link, "_blank");
          localStorage.setItem(storageKey, "1");
        }
      };
      toast.dark(message, {
        onClick,
        autoClose: duration,
        className: 'neon'
      });
    }, ms);
  }
};
