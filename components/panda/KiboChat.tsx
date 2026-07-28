"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, Trash2, Calendar, Sparkles, Users, Phone } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import KiboTyping from "./KiboTyping";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

const CHAT_STORAGE_KEY = "kibo-chat-history";

const quickActions = [
  { label: "Book Assessment", icon: Calendar, action: "I'd like to book an assessment" },
  { label: "Our Services", icon: Sparkles, action: "Tell me about your services" },
  { label: "Meet Experts", icon: Users, action: "Show me the experts" },
  { label: "Contact Us", icon: Phone, action: "I want to contact Sports Science India" },
];

const sections: Record<string, string> = {
  technology: "technology",
  technologies: "technology",
  services: "services",
  service: "services",
  experts: "experts",
  expert: "experts",
  contact: "contact",
  "book assessment": "booking",
  booking: "booking",
  schedule: "booking",
  ecosystem: "ecosystem",
};

export default function KiboChat({ open, onClose }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [
      { role: "assistant", content: "👋 Hi! I'm Kibo. Ask me anything about Sports Science India." },
    ];
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const navigateToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const sendMessage = useCallback(async (text?: string) => {
    const userMessage = text || input;
    if (!userMessage.trim() || loading) return;

    const lower = userMessage.toLowerCase();

    // Check if the message matches a section navigation
    for (const [keyword, sectionId] of Object.entries(sections)) {
      if (lower.includes(keyword)) {
        setMessages((prev) => [
          ...prev,
          { role: "user", content: userMessage },
          { role: "assistant", content: `🚀 Taking you to the ${keyword.charAt(0).toUpperCase() + keyword.slice(1)} section.` },
        ]);
        setInput("");
        onClose();
        setTimeout(() => navigateToSection(sectionId), 300);
        return;
      }
    }

    const history = messages.slice(1).map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || data.error || "Sorry, I couldn't process that." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now." },
      ]);
    }

    setLoading(false);
  }, [input, loading, messages, navigateToSection]);

  function clearChat() {
    const initial: Message[] = [
      { role: "assistant", content: "👋 Hi! I'm Kibo. Ask me anything about Sports Science India." },
    ];
    setMessages(initial);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(initial));
  }

  const showQuickActions = messages.length === 1 && messages[0]?.role === "assistant" && !loading;

  return (
    <AnimatePresence>
      {open && (
        <>
          <div onClick={onClose} className="fixed inset-0 z-[9997]" />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.35 }}
            className="
              fixed
              bottom-0 sm:bottom-32
              left-0 right-0 sm:left-auto sm:right-6
              z-[9998]
              sm:w-[340px]
              overflow-hidden
              rounded-t-3xl sm:rounded-3xl
              border border-orange-500/20
              bg-[#0B0B0B]/95
              backdrop-blur-2xl
              shadow-2xl shadow-orange-500/10
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
              <div>
                <h2 className="text-sm font-semibold text-white sm:text-base">🐼 Kibo</h2>
                <p className="text-[11px] text-orange-400 sm:text-xs">Sports Science AI Coach</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="rounded-full p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white sm:p-2"
                >
                  <Trash2 size={14} />
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full bg-orange-500 p-1.5 text-white transition hover:bg-orange-400 sm:p-2"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[60vh] sm:h-[420px] overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="group relative">
                  <div
                    className={`prose prose-invert prose-sm max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "assistant"
                        ? "bg-orange-500 text-white"
                        : "ml-auto bg-white/10 text-white"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                    ) : (
                      message.content
                    )}
                  </div>

                </div>
              ))}

              {loading && (
                <div className="max-w-[85%] rounded-2xl bg-orange-500 px-4 py-3 text-white">
                  <KiboTyping />
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick Actions */}
            {showQuickActions && (
              <div className="border-t border-white/10 px-4 py-3 sm:px-5">
                <p className="mb-2 text-[11px] text-gray-500">Quick actions</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.label}
                        onClick={() => sendMessage(action.action)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-gray-300 transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-300"
                      >
                        <Icon size={12} />
                        {action.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/10 p-3 sm:p-4">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                  placeholder="Ask Kibo anything..."
                  className="
                    flex-1 rounded-full border border-white/10 bg-white/5
                    px-3 py-2.5 text-sm text-white outline-none
                    placeholder:text-gray-500 sm:px-4 sm:py-3
                  "
                />
                <button
                  onClick={() => sendMessage()}
                  className="rounded-full bg-orange-500 p-2.5 transition hover:bg-orange-400 sm:p-3"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
