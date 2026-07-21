"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="booking" className="bg-black py-20 text-white">
      <Container>

        <div className="text-center max-w-4xl mx-auto mb-14">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            Book Assessment
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Start Your Performance Journey
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mt-4 text-base text-gray-400 leading-7 max-w-3xl mx-auto">
            Tell us a little about your goals and our sports science team will contact you.
          </p>

        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-gray-800 bg-[#111111] p-6 sm:p-10">
          {submitted ? (
            <div className="rounded-2xl border border-orange-500/40 bg-orange-500/10 p-8 text-center">
              <p className="text-2xl font-bold">Assessment request received.</p>
              <p className="mt-3 text-gray-300">Thank you — our team will be in touch shortly.</p>
              <Button className="mt-6" onClick={() => setSubmitted(false)}>Submit another request</Button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <label className="block"><span className="sr-only">Full Name</span><input required name="name" type="text" placeholder="Full Name" className="w-full rounded-xl border border-gray-700 bg-black p-4 outline-none transition focus:border-orange-500" /></label>
              <label className="block"><span className="sr-only">Email Address</span><input required name="email" type="email" placeholder="Email Address" className="w-full rounded-xl border border-gray-700 bg-black p-4 outline-none transition focus:border-orange-500" /></label>
              <label className="block"><span className="sr-only">Phone Number</span><input required name="phone" type="tel" placeholder="Phone Number" className="w-full rounded-xl border border-gray-700 bg-black p-4 outline-none transition focus:border-orange-500" /></label>
              <label className="block"><span className="sr-only">Sport</span><select required name="sport" defaultValue="" className="w-full rounded-xl border border-gray-700 bg-black p-4 outline-none transition focus:border-orange-500"><option value="" disabled>Select Your Sport</option><option>Cricket</option><option>Football</option><option>Badminton</option><option>Running</option><option>Cycling</option><option>Other</option></select></label>
              <label className="block"><span className="sr-only">Your goals</span><textarea required name="goals" rows={5} placeholder="Tell us about your goals..." className="w-full rounded-xl border border-gray-700 bg-black p-4 outline-none transition focus:border-orange-500" /></label>
              <Button type="submit">Request Assessment</Button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
