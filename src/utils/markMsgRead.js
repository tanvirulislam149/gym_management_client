import api_client from "@/api_client";

const markMessageAsRead = async (messageId) => {
  try {
    await api_client.post(
      `http://127.0.0.1:8000/message/${messageId}/read_message/`,
      {}
    );
    console.log(`Message ${messageId} marked as read`);
  } catch (error) {
    console.error("Error marking message as read:", error);
  }
};

export default markMessageAsRead;
