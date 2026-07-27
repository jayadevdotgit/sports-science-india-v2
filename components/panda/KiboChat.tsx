"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function KiboChat({ open, onClose }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Kibo. Ask me anything about Sports Science India.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || data.error || "Sorry, I couldn't process that.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.35 }}
          className="
            fixed
            bottom-32
            right-6
            z-[9998]
            w-[380px]
            overflow-hidden
            rounded-3xl
            border
            border-orange-500/20
            bg-[#0B0B0B]/95
            backdrop-blur-2xl
            shadow-2xl
            shadow-orange-500/10
          "
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">

            <div>
              <h2 className="font-semibold text-white">
                🐼 Kibo
              </h2>

              <p className="text-xs text-orange-400">
                Sports Science AI Coach
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 transition hover:bg-white/10"
            >
              <X size={18} />
            </button>

          </div>

          {/* Messages */}

          <div className="h-[420px] overflow-y-auto p-5 space-y-4">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  message.role === "assistant"
                    ? "bg-orange-500 text-white"
                    : "ml-auto bg-white/10 text-white"
                }`}
              >
                {message.content}
              </div>

            ))}

            {loading && (

              <div className="max-w-[85%] rounded-2xl bg-orange-500 px-4 py-3 text-white">

                Kibo is thinking...

              </div>

            )}

            <div ref={bottomRef} />

          </div>

          {/* Input */}

          <div className="border-t border-white/10 p-4">

            <div className="flex items-center gap-2">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask Kibo anything..."
                className="
                  flex-1
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-gray-500
                "
              />

              <button
                onClick={sendMessage}
                className="
                  rounded-full
                  bg-orange-500
                  p-3
                  transition
                  hover:bg-orange-400
                "
              >
                <Send size={18} />
              </button>

            </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}