"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { testimonials } from "@/data/testimonials";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const testimonial = testimonials[current];

 const next = () => {
  setCurrent((prev) => (prev + 1) % testimonials.length);
};

const previous = () => {
  setCurrent((prev) =>
    prev === 0 ? testimonials.length - 1 : prev - 1
  );
};

useEffect(() => {
  const interval = setInterval(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, 5000);

  return () => clearInterval(interval);
}, []);
  

  return (
    <section className="bg-black text-white py-28">
      <Container>

        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Athletes Say"
          description="Real stories from athletes who trusted Sports Science India."
        />

        <div className="max-w-4xl mx-auto mt-20">

          <Card
             key={testimonial.id}
             className="animate-fadeIn"
>
            <div className="flex justify-center mb-6">
            <Quote
            size={72}
            className="text-orange-500/30"
            strokeWidth={1}
            />
        </div>

            <div className="flex justify-center mb-6">
              {[...Array(testimonial.rating)].map((_, index) => (
                <Star
                  key={index}
                  size={24}
                  className="fill-orange-500 text-orange-500"
                />
              ))}
            </div>

            <p className="text-2xl italic text-center leading-10 text-gray-300">
              "{testimonial.review}"
            </p>

            <div className="mt-10 text-center">

              <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center mx-auto text-3xl font-bold text-black">
                {testimonial.name.charAt(0)}
              </div>

              <h3 className="text-2xl font-bold mt-6">
                {testimonial.name}
              </h3>

              <p className="text-orange-500">
                {testimonial.sport}
              </p>

            </div>

          </Card>

          <div className="flex justify-center items-center gap-6 mt-10">

            <button
              onClick={previous}
              className="bg-[#111111] p-4 rounded-full hover:bg-orange-500 transition"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                 key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                current === index
                ? "bg-orange-500 scale-125"
                 : "bg-gray-600 hover:bg-orange-400"
                }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="bg-[#111111] p-4 rounded-full hover:bg-orange-500 transition"
            >
              <ChevronRight />
            </button>

          </div>

        </div>

      </Container>
    </section>
  );
}