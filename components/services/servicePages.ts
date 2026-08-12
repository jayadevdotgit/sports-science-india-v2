import type { ServiceDetail } from "@/components/ecosystem/serviceDetails";

// Rich page content for the "Elite Performance Solutions" services section.
// Overlapping slugs (sports-medicine, strength-conditioning) are merged so the
// page serves both the Human Performance body area and the services card.
export const serviceSectionDetails: ServiceDetail[] = [
  {
    slug: "sports-medicine",
    overview: [
      "Sports Medicine is the medical backbone of athletic care — the diagnosis, treatment and prevention of injuries, alongside keeping athletes healthy and performing throughout the season.",
      "Our doctors combine clinical expertise with an understanding of sport-specific demands, so every consultation is practical, actionable and focused on getting you back to full function safely.",
    ],
    whoItsFor: [
      "Athletes of every level wanting expert medical care",
      "Anyone with pain or an injury that isn't improving on its own",
      "Athletes preparing for competition who need a medical clearance",
      "Teams looking for on-field medical support and monitoring",
    ],
    whatToExpect: [
      "A detailed medical history and focused examination",
      "Clear diagnosis and a practical treatment plan",
      "On-field support and injury prevention guidance where relevant",
    ],
    benefits: [
      "Accurate diagnosis and faster recovery",
      "Injury prevention through expert screening",
      "Confidence to train and compete safely",
    ],
    faq: [
      {
        q: "When should I see a sports medicine doctor?",
        a: "If pain limits your training, an injury isn't settling within a week or two, or you want a professional screening before a season or big event.",
      },
    ],
  },
  {
    slug: "sports-surgery",
    overview: [
      "When injuries need surgical correction, Sports Surgery uses minimally invasive techniques to repair damaged tissue and restore function with the shortest possible downtime.",
      "Our focus is arthroscopic and minimally invasive procedures, performed with precision and followed by a structured rehab pathway so you return stronger.",
    ],
    whoItsFor: [
      "Athletes with structural injuries that require surgery",
      "Those with persistent joint pain or instability not improving with treatment",
      "Athletes who want minimal scarring and faster recovery",
      "Anyone seeking a clear surgical plan and rehab roadmap",
    ],
    whatToExpect: [
      "A thorough evaluation to decide if surgery is truly needed",
      "A minimally invasive procedure when appropriate",
      "A structured post-surgery rehab and recovery plan",
    ],
    benefits: [
      "Minimally invasive, faster recovery",
      "Precise, joint-sparing surgical techniques",
      "A complete care pathway from operation to return to sport",
    ],
    faq: [
      {
        q: "Is surgery always the answer?",
        a: "No. We exhaust conservative options first and only recommend surgery when it genuinely offers the best outcome for your goals.",
      },
    ],
  },
  {
    slug: "ligament-surgery",
    overview: [
      "Ligament injuries — especially the ACL — are among the most common serious injuries in sport. Ligament Surgery restores joint stability so you can return to cutting, pivoting and landing safely.",
      "We specialise in ACL reconstruction and ligament repair, using techniques that protect your cartilage and meniscus while rebuilding a stable knee or other joint.",
    ],
    whoItsFor: [
      "Athletes with a torn ACL or other ligament injury",
      "Anyone with knee giving way or instability after injury",
      "Returning athletes who want to protect their long-term knee health",
      "Those considering surgery and wanting an expert opinion",
    ],
    whatToExpect: [
      "A full assessment including imaging review",
      "A personalised surgical and rehab plan",
      "Guided return-to-sport milestones after surgery",
    ],
    benefits: [
      "Restored joint stability and confidence",
      "Reduced risk of cartilage and meniscus damage",
      "A clear, structured path back to sport",
    ],
    faq: [
      {
        q: "How long until I can play again after ACL surgery?",
        a: "Typically 9–12 months with structured rehab. We progress you by milestones, not dates, so you return when your knee is truly ready.",
      },
    ],
  },
  {
    slug: "joint-preservation",
    overview: [
      "Joint Preservation focuses on treatments that delay or avoid joint replacement — keeping your own cartilage, bone and ligaments working as long as possible.",
      "From cartilage repair and injections to osteotomy, we use targeted, evidence-based techniques to protect your joints and maintain long-term mobility.",
    ],
    whoItsFor: [
      "Athletes and active people with early joint wear or damage",
      "Anyone wanting to avoid or postpone joint replacement",
      "Those with cartilage injuries or early arthritis",
      "Active adults who want to keep moving pain-free for years",
    ],
    whatToExpect: [
      "A detailed joint assessment and imaging review",
      "A personalised plan — injections, repair or realignment as needed",
      "Ongoing joint health and activity guidance",
    ],
    benefits: [
      "Delay or avoid joint replacement",
      "Preserve natural movement and function",
      "Long-term mobility and pain control",
    ],
    faq: [
      {
        q: "Can joint replacement really be avoided?",
        a: "For many people, yes. Early treatment, load management and targeted procedures can significantly extend the life of a joint.",
      },
    ],
  },
  {
    slug: "sports-science",
    overview: [
      "Sports Science uses data to understand exactly how an athlete performs — turning measurements into decisions that improve training, reduce injury risk and accelerate development.",
      "From performance testing to athlete profiling and load monitoring, we give coaches and athletes objective numbers instead of guesswork.",
    ],
    whoItsFor: [
      "Athletes who want to train smarter with data",
      "Coaches building objective athlete profiles",
      "Teams wanting load monitoring and analytics",
      "Anyone curious about their true athletic baseline",
    ],
    whatToExpect: [
      "Structured performance testing across relevant qualities",
      "A clear athlete profile and data-driven recommendations",
      "Ongoing monitoring to track improvement",
    ],
    benefits: [
      "Training based on your actual data, not guesswork",
      "Early warning of injury risk through load monitoring",
      "Measurable, trackable progress",
    ],
    faq: [
      {
        q: "What can performance testing measure?",
        a: "Strength, power, speed, agility, endurance and movement quality — the key qualities behind most sports.",
      },
    ],
  },
  {
    slug: "musculoskeletal-rehab",
    overview: [
      "Musculoskeletal Rehab treats problems in muscles, joints and soft tissue — the structures that move you every day. Whether it's a strain, tendon issue or chronic tightness, we build a targeted plan to resolve it.",
      "Our approach combines hands-on therapy with corrective exercise, so you not only feel better but move better long term.",
    ],
    whoItsFor: [
      "Anyone with muscle, joint or soft tissue pain",
      "Athletes with recurrent tightness or niggles",
      "People with posture-related discomfort",
      "Returning athletes needing to rebuild tissue resilience",
    ],
    whatToExpect: [
      "A thorough assessment of the affected area",
      "Hands-on therapy and corrective exercise",
      "A plan to prevent the problem returning",
    ],
    benefits: [
      "Reduced pain and improved function",
      "Better posture and movement quality",
      "Fewer recurring injuries",
    ],
    faq: [
      {
        q: "How is this different from physiotherapy?",
        a: "They overlap, but musculoskeletal rehab focuses on restoring the specific tissues involved through a structured, often longer-term corrective programme.",
      },
    ],
  },
  {
    slug: "sports-rehabilitation",
    overview: [
      "Sports Rehabilitation is the structured process of returning to sport after injury — safely, progressively and without shortcuts.",
      "We rebuild strength, confidence and sport-specific fitness in stages, with clear criteria that must be met before you progress to the next phase.",
    ],
    whoItsFor: [
      "Athletes recovering from injury or surgery",
      "Anyone who wants to avoid re-injury when returning",
      "Athletes who have 'cleared' medically but don't feel ready",
      "Coaches wanting a clear rehab plan for a player",
    ],
    whatToExpect: [
      "A stage-by-stage rehab programme",
      "Progressive loading and strength testing",
      "Sport-specific drills before full return",
    ],
    benefits: [
      "Safer, more confident return to sport",
      "Lower risk of re-injury",
      "Rebuilt strength and fitness, not just pain relief",
    ],
    faq: [
      {
        q: "What if I feel fine but haven't finished rehab?",
        a: "Feeling pain-free isn't the same as being strong enough to play. Rehab milestones exist to protect you from re-injury.",
      },
    ],
  },
  {
    slug: "physiotherapy",
    overview: [
      "Physiotherapy treats pain and movement problems using manual therapy, exercise and education. It's often the first step when pain or injury affects how you move.",
      "We assess the cause of your symptoms, relieve them with hands-on treatment, and give you exercises to restore strength and mobility.",
    ],
    whoItsFor: [
      "Anyone with pain, stiffness or limited movement",
      "Athletes with acute injuries or flare-ups",
      "People recovering from surgery",
      "Those who want to understand why they hurt",
    ],
    whatToExpect: [
      "A focused physical assessment",
      "Hands-on manual therapy as needed",
      "Exercises to restore pain-free movement",
    ],
    benefits: [
      "Fast pain relief and restored mobility",
      "A clear understanding of your injury",
      "Exercises to keep you pain-free",
    ],
    faq: [
      {
        q: "How many physiotherapy sessions will I need?",
        a: "It varies, but many people feel significant relief within a few sessions and are given a home exercise plan to continue progress.",
      },
    ],
  },
  {
    slug: "assessments",
    overview: [
      "Assessments give you a complete picture of your body and performance — from movement quality and strength to VO₂ max and body composition.",
      "Whether you're starting a new programme, returning from injury or chasing a PB, a comprehensive assessment is the smart first step.",
    ],
    whoItsFor: [
      "Athletes starting a new training cycle",
      "Anyone returning to sport after a break or injury",
      "People who want a full baseline of their fitness",
      "Coaches screening a new athlete",
    ],
    whatToExpect: [
      "Movement screening and strength testing",
      "VO₂ max and body composition measurement",
      "A clear report and recommendations",
    ],
    benefits: [
      "Know exactly where you stand",
      "Baseline data to measure progress against",
      "Targeted recommendations for your goals",
    ],
    faq: [
      {
        q: "What should I bring to an assessment?",
        a: "Comfortable athletic clothing, any previous reports or imaging, and details of your training and goals.",
      },
    ],
  },
  {
    slug: "strength-conditioning",
    overview: [
      "Strength & Conditioning develops the physical qualities behind performance — strength, power, speed, agility and endurance — in a structured, periodised way.",
      "Rather than generic gym work, we design programmes around your sport and goals, test your progress and progress you safely.",
    ],
    whoItsFor: [
      "Athletes wanting to get stronger, faster or more powerful",
      "Sportspeople returning from injury who need to rebuild strength",
      "Anyone wanting a structured, evidence-based training plan",
      "Teams needing a periodised S&C block",
    ],
    whatToExpect: [
      "A baseline strength and movement assessment",
      "A personalised, periodised programme",
      "Regular re-testing to track progress",
    ],
    benefits: [
      "Greater strength, power and speed",
      "Lower injury risk through balanced development",
      "Training that transfers to your sport",
    ],
    faq: [
      {
        q: "I'm not an athlete — can I still do S&C?",
        a: "Yes. Programmes are scaled to your level and goals, and supervised to keep every session safe.",
      },
    ],
  },
  {
    slug: "return-to-sports",
    overview: [
      "Return to Sports is the final, crucial phase of recovery — proving your body is ready to compete, not just pain-free.",
      "We use milestone testing and sport-specific drills to rebuild confidence and ensure you return at full capacity with the lowest possible risk of re-injury.",
    ],
    whoItsFor: [
      "Athletes cleared by rehab but unsure if they're ready",
      "Those returning after a long layoff or surgery",
      "Athletes who have re-injured and want to break the cycle",
      "Anyone wanting an objective return-to-play decision",
    ],
    whatToExpect: [
      "Return-to-play milestone testing",
      "Sport-specific functional testing",
      "A confidence-rebuilding plan",
    ],
    benefits: [
      "Return only when objectively ready",
      "Reduced re-injury risk",
      "Confidence in your body again",
    ],
    faq: [
      {
        q: "How do I know I'm truly ready to play?",
        a: "We test strength, power, movement and sport-specific function against targets — not just time since injury — before clearing you.",
      },
    ],
  },
  {
    slug: "pre-post-natal-rehab",
    overview: [
      "Pre & Post Natal Rehab supports you safely through pregnancy and after birth, protecting your core, pelvic floor and whole body while keeping you active and strong.",
      "Our programmes are designed for each trimester and the postnatal period, with a focus on safe exercise, recovery and long-term pelvic health.",
    ],
    whoItsFor: [
      "Women wanting to stay active during pregnancy",
      "New mothers ready to rebuild strength safely",
      "Anyone with pelvic floor or core concerns",
      "Women planning to return to sport after childbirth",
    ],
    whatToExpect: [
      "Antenatal and postnatal health screening",
      "Safe, individualised exercise plans",
      "Core and pelvic health guidance",
    ],
    benefits: [
      "Safe exercise through every stage",
      "Faster, safer postnatal recovery",
      "Better core and pelvic health",
    ],
    faq: [
      {
        q: "When can I start exercising after birth?",
        a: "It depends on your delivery and recovery. We assess you individually and build a plan that's safe for your stage of healing.",
      },
    ],
  },
  {
    slug: "obstetrics-gynaecology-consultation",
    overview: [
      "This consultation brings specialist obstetric and gynaecological care to women who are active, including sportswomen, expectant mothers and those returning to exercise after childbirth.",
      "Dr. Nisha Kaushik Patnaik provides expert guidance on pregnancy, women's health and returning to training safely.",
    ],
    whoItsFor: [
      "Women with pregnancy or gynaecological concerns",
      "Sportswomen wanting expert women's health guidance",
      "Expectant mothers planning safe activity",
      "New mothers returning to sport",
    ],
    whatToExpect: [
      "A specialist consultation with Dr. Nisha Kaushik Patnaik",
      "Expert guidance on your specific concern",
      "A clear, personal health plan",
    ],
    benefits: [
      "Specialist women's health expertise",
      "Safe, personalised pregnancy and activity advice",
      "Confidence in your health and training choices",
    ],
    faq: [
      {
        q: "Is this consultation covered by the same booking system?",
        a: "Yes — select Obstetrics & Gynaecology Consultation when booking; it is available only with Dr. Nisha Kaushik Patnaik.",
      },
    ],
  },
];
