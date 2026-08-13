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
            x: 15,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: 15,
            scale: 0.95,
          }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="
            absolute
            right-full
            bottom-0
            mr-3
            w-[200px]
            rounded-2xl
            border
            border-orange-500/20
            bg-[#111111]/95
            backdrop-blur-2xl
            p-4
            shadow-2xl
            shadow-orange-500/10
            overflow-visible
          "
        >
          {/* Speech Tail */}
          <div
            className="
              absolute
              -right-2
              bottom-6
              h-4
              w-4
              rotate-45
              border-r
              border-t
              border-orange-500/20
              bg-[#111111]
            "
          />

          <h3 className="text-sm font-semibold text-white">
            👋 Hi! I&apos;m VIVI
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-gray-300">
            How can I help you?
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
