"use client";

import { AnimatePresence, motion } from "framer-motion";

type KiboBubbleProps = {
  visible: boolean;
};

export default function KiboBubble({ visible }: KiboBubbleProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 15,
            scale: 0.95,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="
            absolute
            bottom-24
            right-2
            w-[290px]
            rounded-2xl
            border
            border-orange-500/20
            bg-[#111111]/95
            backdrop-blur-2xl
            p-5
            shadow-2xl
            shadow-orange-500/10
            overflow-visible
          "
        >
          {/* Speech Tail */}
          <div
            className="
              absolute
              -bottom-2
              right-8
              h-4
              w-4
              rotate-45
              border-r
              border-b
              border-orange-500/20
              bg-[#111111]
            "
          />

          <h3 className="text-lg font-semibold text-white">
            👋 Hi! I'm Kibo
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-300">
            I'm here to help you improve performance,
            prevent injuries, and find the right assessment.
          </p>

          <p className="mt-4 font-medium text-orange-400">
            How can I help today?
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}