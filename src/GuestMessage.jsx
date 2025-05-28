import React, { useState, useEffect } from "react";
import { funnySentences } from "./funnySentences.js";

const GuestMessage = () => {
    const [fullMessage, setFullMessage] = useState("");
    const [typedMessage, setTypedMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const generateMessage = () => {
        const filteredSentences = funnySentences.filter(
            (msg) => typeof msg === "string" && msg.trim() !== ""
        );

        if (filteredSentences.length === 0) {
            setFullMessage("😓 কোনো মেসেজ পাওয়া যায়নি।");
            setTypedMessage("");
            setIsTyping(false);
            return;
        }

        const randomIndex = Math.floor(Math.random() * filteredSentences.length);
        const message = filteredSentences[randomIndex];

        setTypedMessage("");
        setFullMessage(message);
        setIsTyping(true);
    };

    // Typing animation
    useEffect(() => {
        if (!fullMessage) return;

        let index = 0;
        setTypedMessage("");
        const interval = setInterval(() => {
            const nextChar = fullMessage.charAt(index);
            if (index < fullMessage.length && nextChar !== undefined) {
                setTypedMessage((prev) => prev + nextChar);
                index++;
            } else {
                clearInterval(interval);
                setIsTyping(false);
            }
        }, 40);

        return () => clearInterval(interval);
    }, [fullMessage]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-100 to-yellow-200 p-6">
            <h1 className="text-4xl font-bold mb-8 text-purple-800 text-center drop-shadow">
                আপনার ভাগ্য নির্ণয়
            </h1>

            <button
                onClick={generateMessage}
                className="cursor-pointer bg-purple-600 text-white px-10 py-4 rounded-2xl hover:bg-purple-800 transition-all duration-300 text-lg font-semibold shadow-lg"
            >
                মেসেজ দাও
            </button>

            {typedMessage && (
                <div className="mt-10 p-6 bg-white rounded-2xl shadow-xl text-xl text-center text-gray-800 whitespace-pre-wrap max-w-2xl relative min-h-[120px]">
                    {typedMessage}
                    {isTyping && <span className="animate-pulse">|</span>}
                </div>
            )}
        </div>
    );
};

export default GuestMessage;
