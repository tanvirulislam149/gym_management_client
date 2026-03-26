import { useEffect } from "react";
import { useSelector } from "react-redux";
import api_client from "@/api_client";

const useMarkAsRead = (ref, message) => {
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (message.is_read) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          try {
            await api_client.post(
              `https://gym-management-0fmi.onrender.com/message/${message.id}/read_message/`,
              {},
            );

            console.log("Message marked as read:", message.id);

            observer.unobserve(element); // use stored element
          } catch (error) {
            console.error("Error marking as read:", error);
          }
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [message.id]);
};

export default useMarkAsRead;
