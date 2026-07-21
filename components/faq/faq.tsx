"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { faqs } from "@/data/faqs";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-black text-white py-20">
      <Container>

        <div className="text-center max-w-4xl mx-auto mb-14">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            FAQ
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Frequently Asked Questions
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mt-4 text-base text-gray-400 leading-7 max-w-3xl mx-auto">
            Everything you need to know before starting your Sports Science journey.
          </p>

        </div>

        <div className="max-w-4xl mx-auto mt-14 space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <h3 className="text-xl font-semibold">
                  {faq.question}
                </h3>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-gray-400 leading-8">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}