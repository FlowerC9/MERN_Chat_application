import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([]);
    const [notification, setNotification] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            setUser(userInfo);
            if (!userInfo) {
                navigate('/');
            }
        } catch (error) {
            console.error("Error parsing user info:", error);
            navigate('/');
        }
    }, [navigate]);

    return (
        <ChatContext.Provider value={{
            user, setUser, selectedChat, setSelectedChat,
            chats,
            setChats, notification, setNotification
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
