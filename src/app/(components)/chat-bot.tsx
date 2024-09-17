'use client';

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MessageSquareIcon, SendIcon, XIcon } from "lucide-react";

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm processing your request. Please wait.", sender: "ai" },
        ]);
      }, 1000);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {isOpen ? (
        <Card
          className="w-80 h-96 flex flex-col bg-[#2A2D3A] border-none shadow-lg"
        >
          <CardHeader
            className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600"
          >
            <CardTitle
              className="flex items-center text-white text-lg"
            >
              <MessageSquareIcon className="mr-2 h-5 w-5" />
              AI Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleChat}
              className="text-white hover:bg-blue-700"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent
            className="flex-grow flex flex-col p-4 overflow-hidden"
          >
            <div
              className="flex-grow overflow-y-auto mb-4 p-2 border rounded bg-[#1E2029] border-gray-600"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
                >
                  <span
                    className={`inline-block p-2 rounded ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow mr-2 bg-[#1E2029] text-white border-gray-600"
              />

              <Button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center"
        >
          <MessageSquareIcon className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
}
