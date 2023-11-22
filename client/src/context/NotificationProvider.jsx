import { createContext, useState } from "react";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "error",
  });

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const updateNotification = (type, message) => {
    setNotification({ open: true, message, type });
  };

  
  const CustomNotification = () => {
   
    return (
      <div
        style={{
          position: "fixed",
          top: "10vh",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px",
          background: notification.type === "error" ? "red" : "green",
          color: "white",
        }}
      >
        {notification.message}
      </div>
    );
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
     
      {notification.open && <CustomNotification />}
    </NotificationContext.Provider>
  );
}
