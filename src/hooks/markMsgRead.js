import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import api_client from "@/api_client";

const useMarkAsRead = (ref, message) => {
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (!ref.current) return;

    // Only mark if this message is for me and not yet read
    if (message.receiver.id !== user.id || message.is_read) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          try {
            await api_client.post(
              `https://gym-management-0fmi.onrender.com/message/${message.id}/read_message/`,
              {}
            );
            console.log("Message marked as read:", message.id);
            observer.unobserve(ref.current); // stop observing after read
          } catch (error) {
            console.error("Error marking as read:", error);
          }
        }
      },
      { threshold: 0.6 } // 60% visible before marking as read
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, message]);
};

export default useMarkAsRead;
