export type ServiceDetail = {
  slug: string;
  overview: string[];
  whoItsFor: string[];
  whatToExpect: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "sports-psychology",
    overview: [
      "Sports psychology is the science of how the mind influences athletic performance. Our specialists help you build the mental skills that separate good athletes from great ones — improving focus, confidence, emotional control and the ability to perform under pressure.",
      "Through structured assessments and personalised mental-training plans, we train your brain the same way we train your body, so you can stay calm, decisive and sharp in the moments that matter most.",
    ],
    whoItsFor: [
      "Athletes struggling with pre-competition nerves or performance anxiety",
      "Competitors who lose focus or make poor decisions under pressure",
      "Athletes returning from injury who have lost confidence in their body",
      "Coaches and teams wanting to build mental toughness and resilience",
    ],
    whatToExpect: [
      "A confidential one-on-one mental skills assessment",
      "Personalised focus, confidence and stress-management strategies",
      "Regular progress reviews with measurable improvements",
    ],
    benefits: [
      "Sharper concentration and faster decision making",
      "Greater confidence before and during competition",
      "Reduced performance anxiety and better emotional control",
    ],
    faq: [
      {
        q: "How many sessions will I need?",
        a: "Most athletes see meaningful change within 4–6 sessions, though this depends on your goals and the challenges you are working on.",
      },
      {
        q: "Is sports psychology only for professionals?",
        a: "No. Any athlete — from school level to elite — can benefit from mental skills training.",
      },
    ],
  },
  {
    slug: "neck-care",
    overview: [
      "Your neck supports your head and connects your spine to your nervous system. In sport, a weak or tight neck can limit vision, slow reaction times and increase the risk of concussion and strain injuries.",
      "Our Neck & Cervical Care programme assesses your cervical spine and builds strength, mobility and posture so your neck works for you instead of against you.",
    ],
    whoItsFor: [
      "Desk-based athletes and professionals with poor posture",
      "Contact sport players at risk of neck strain or concussion",
      "Anyone with chronic neck tightness, headaches or stiffness",
      "Athletes wanting better head control and reaction speed",
    ],
    whatToExpect: [
      "A detailed posture and cervical spine assessment",
      "Guided neck strengthening and mobility exercises",
      "Ergonomic and daily-habit recommendations",
    ],
    benefits: [
      "Reduced neck pain, strain and injury risk",
      "Better posture and long-term spinal health",
      "Improved head movement and reaction speed",
    ],
    faq: [
      {
        q: "Is neck strengthening safe?",
        a: "Yes. All exercises are progressions built from your individual assessment and are supervised to ensure safety at every stage.",
      },
    ],
  },
  {
    slug: "strength-conditioning",
    overview: [
      "Strength & Conditioning (S&C) is the systematic development of power, speed, agility and endurance. Rather than generic gym work, our S&C programme is designed around your sport, your body and your goals.",
      "We test where you are, build a periodised plan, and progress you safely so every rep moves you closer to peak performance while reducing injury risk.",
    ],
    whoItsFor: [
      "Athletes looking to increase strength, power or speed",
      "Sportspeople returning to play who need to rebuild strength",
      "Anyone wanting an evidence-based, goal-focused training plan",
      "Teams wanting a structured, periodised S&C block",
    ],
    whatToExpect: [
      "A baseline strength and movement assessment",
      "A personalised, periodised training programme",
      "Regular re-testing to track and adjust progress",
    ],
    benefits: [
      "Increased strength, power, speed and agility",
      "Lower risk of injury through balanced development",
      "Training that transfers directly to your sport",
    ],
    faq: [
      {
        q: "Do I need to be fit to start?",
        a: "No. Programmes are scaled to your current level and progress gradually under supervision.",
      },
    ],
  },
  {
    slug: "cardiovascular-training",
    overview: [
      "Cardiovascular conditioning is the engine of athletic performance. We measure your VO₂ max and heart-rate response, then build a training plan that improves your endurance, recovery and ability to sustain intensity.",
      "Our approach is data-driven — we test, prescribe, and re-test so your conditioning improves measurably, not just by feel.",
    ],
    whoItsFor: [
      "Endurance athletes in running, cycling, swimming or team sports",
      "Athletes who tire quickly or recover slowly between efforts",
      "Anyone wanting to improve heart health and fitness safely",
      "Returning athletes rebuilding their aerobic base",
    ],
    whatToExpect: [
      "A VO₂ max and heart-rate assessment",
      "A structured endurance and interval training plan",
      "Respiratory and recovery training techniques",
    ],
    benefits: [
      "Higher VO₂ max and better endurance",
      "Faster recovery between and after sessions",
      "Stronger heart and lung health",
    ],
    faq: [
      {
        q: "What is VO₂ max?",
        a: "It is the maximum amount of oxygen your body can use during intense exercise — a key indicator of aerobic fitness. We measure it to personalise your training zones.",
      },
    ],
  },
  {
    slug: "sports-medicine",
    overview: [
      "Sports Medicine is the medical care of athletes — from screening and prevention to diagnosis, treatment and safe return to sport. Our doctors combine clinical expertise with an understanding of athletic demands.",
      "We keep you monitored, healthy and on the field, and when injuries happen we manage them quickly so downtime is minimised.",
    ],
    whoItsFor: [
      "Athletes wanting a comprehensive pre-season medical screening",
      "Anyone with an injury that isn't resolving as expected",
      "Athletes managing chronic conditions while staying active",
      "Teams wanting a dedicated medical monitoring programme",
    ],
    whatToExpect: [
      "A thorough medical and musculoskeletal assessment",
      "Clear diagnosis and an individualised management plan",
      "Monitoring and guidance throughout your season",
    ],
    benefits: [
      "Early detection of problems before they become injuries",
      "Faster, safer return to sport after injury",
      "Confidence that you are training safely",
    ],
    faq: [
      {
        q: "What happens during a screening?",
        a: "A full medical history, physical and movement assessment, and sport-specific checks that help us flag any risks before they cause problems.",
      },
    ],
  },
  {
    slug: "elbow-performance",
    overview: [
      "The elbow is heavily loaded in throwing, racquet and lifting sports. Repetitive stress can cause pain, tendinopathy and loss of performance.",
      "Our Upper Limb Performance programme analyses your technique and load, strengthens the supporting muscles and gives you a clear plan to keep your elbow healthy and powerful.",
    ],
    whoItsFor: [
      "Cricket, tennis, badminton and squash players",
      "Throwers, bowlers and weightlifters",
      "Athletes with elbow pain, tennis elbow or golfer's elbow",
      "Anyone wanting to protect their elbow from overuse injuries",
    ],
    whatToExpect: [
      "A throwing/technique and grip-strength analysis",
      "A targeted strengthening and load-management plan",
      "Sport-specific return-to-training guidance",
    ],
    benefits: [
      "Reduced elbow pain and overuse risk",
      "Improved grip strength and power transfer",
      "Smarter training loads for long-term elbow health",
    ],
    faq: [
      {
        q: "Can I keep playing while managing elbow pain?",
        a: "Often yes, with adjusted loads. We help you manage symptoms while keeping you as active as possible.",
      },
    ],
  },
  {
    slug: "core-stability",
    overview: [
      "Your core is the bridge that transfers power between your upper and lower body. A strong, stable core improves balance, protects your spine and makes every movement more efficient.",
      "Our Core Stability programme builds functional strength — not just sit-ups — so your power, balance and control improve in the movements your sport actually demands.",
    ],
    whoItsFor: [
      "Athletes wanting more power and stability in their sport",
      "Anyone with lower-back discomfort during activity",
      "Athletes looking to improve balance and rotational power",
      "Returning athletes rebuilding their foundation after injury",
    ],
    whatToExpect: [
      "A core strength and stability assessment",
      "Progressive functional core exercises",
      "Sport-specific rotational and balance training",
    ],
    benefits: [
      "Better power transfer and movement efficiency",
      "Improved balance, posture and spinal protection",
      "Reduced risk of back injuries",
    ],
    faq: [
      {
        q: "How is this different from doing sit-ups?",
        a: "We train core control in real movement patterns — rotations, balance and anti-movement strength — which carries over to sport far better than isolated crunches.",
      },
    ],
  },
  {
    slug: "biomechanics",
    overview: [
      "Biomechanics is the study of how you move. Using 3D motion capture and video analysis, we break down your running, jumping, throwing and lifting technique to find inefficiencies and injury risks.",
      "The result is a clear picture of your movement quality and a personalised plan to optimise technique and protect your body.",
    ],
    whoItsFor: [
      "Athletes wanting to refine technique and gain a competitive edge",
      "Runners, jumpers and team-sport players with recurring injuries",
      "Coaches looking for objective movement data on their athletes",
      "Anyone who wants to understand exactly how their body moves",
    ],
    whatToExpect: [
      "A 3D motion capture or video movement analysis",
      "A detailed movement quality report",
      "Targeted technique correction and optimisation plan",
    ],
    benefits: [
      "More efficient, powerful movement",
      "Identification of hidden injury risk factors",
      "Objective, data-backed training decisions",
    ],
    faq: [
      {
        q: "What happens in a motion capture session?",
        a: "You perform key movements (run, jump, squat, throw) while sensors or cameras record them. Our analysts then break down the data and show you exactly what to change.",
      },
    ],
  },
  {
    slug: "wrist-function",
    overview: [
      "The wrist and hand are your connection to the ball, bat, racquet and bar. Grip strength and wrist mobility influence everything from racket sports to gymnastics and lifting.",
      "Our Grip & Wrist Function programme assesses hand strength, mobility and fine motor control, and builds sport-specific capacity in these small but crucial joints.",
    ],
    whoItsFor: [
      "Racquet and stick-sport athletes (tennis, badminton, hockey)",
      "Gymnasts, climbers and lifters who load the wrist heavily",
      "Athletes with wrist pain or reduced grip strength",
      "Anyone wanting better hand function for their sport",
    ],
    whatToExpect: [
      "A grip strength and wrist mobility assessment",
      "Targeted mobility, stability and strength exercises",
      "Sport-specific hand and wrist training",
    ],
    benefits: [
      "Stronger grip and better racket/ball control",
      "Reduced wrist pain and injury risk",
      "Improved fine motor control and hand function",
    ],
    faq: [
      {
        q: "Can wrist injuries be prevented?",
        a: "Yes. Most wrist problems come from weakness or poor mobility. Strengthening and mobility work dramatically reduces risk.",
      },
    ],
  },
  {
    slug: "hip-mobility",
    overview: [
      "The hip is the powerhouse of athletic movement — it drives sprinting, jumping, kicking and change of direction. Limited hip mobility or weakness quietly robs you of power and increases injury risk.",
      "Our Hip & Mobility Training programme improves range of motion, rotational power and movement quality so your hips fire the way they should.",
    ],
    whoItsFor: [
      "Sprinters, jumpers and kicking-sport athletes",
      "Athletes with stiff hips or a history of groin/hamstring issues",
      "Anyone wanting better movement quality and flexibility",
      "Returning athletes rebuilding lower-body function",
    ],
    whatToExpect: [
      "A hip mobility and movement quality assessment",
      "A personalised mobility and strength programme",
      "Sport-specific power and control exercises",
    ],
    benefits: [
      "Greater range of motion and flexibility",
      "More powerful, efficient movement",
      "Reduced risk of groin, hamstring and hip injuries",
    ],
    faq: [
      {
        q: "I'm not flexible — can I still improve?",
        a: "Absolutely. Mobility improves with consistent, targeted work and our programme is built to your current level.",
      },
    ],
  },
  {
    slug: "rehabilitation",
    overview: [
      "Rehabilitation is the bridge between injury and a confident return to sport. Our evidence-based rehab programmes rebuild strength, movement and confidence in a structured, measurable way.",
      "We don't just clear you to play — we build you back to your best, with milestone testing and sport-specific preparation.",
    ],
    whoItsFor: [
      "Athletes recovering from injury or surgery (including ACL)",
      "Anyone returning to training after a long break",
      "Athletes who want to come back stronger and avoid re-injury",
      "Those unsure if they are ready to return to their sport",
    ],
    whatToExpect: [
      "A structured, stage-by-stage rehab plan",
      "Strength and movement milestone testing",
      "Clear return-to-play criteria and sport-specific training",
    ],
    benefits: [
      "Safer, faster recovery",
      "Confidence that your body is truly ready",
      "Lower risk of re-injury through proper loading",
    ],
    faq: [
      {
        q: "How long does rehabilitation take?",
        a: "It depends on the injury and your starting point. We set milestones rather than fixed dates, so you progress when your body is genuinely ready.",
      },
    ],
  },
  {
    slug: "injury-prevention",
    overview: [
      "The best injury is the one that never happens. Our Injury Prevention programme identifies your risk factors through screening and builds balance, stability and movement quality to keep you on the field.",
      "From ankle stability to landing mechanics and proprioception, we train your body to absorb forces safely and react quickly.",
    ],
    whoItsFor: [
      "Athletes with a history of recurrent injuries",
      "Anyone entering a new or more intense training phase",
      "Teams wanting a structured injury-prevention block",
      "Athletes wanting to play longer and stay healthier",
    ],
    whatToExpect: [
      "A comprehensive movement and risk-factor screen",
      "A personalised balance, stability and control programme",
      "Sport-specific landing and change-of-direction training",
    ],
    benefits: [
      "Fewer injuries and less time lost to training",
      "Better balance, stability and body control",
      "Longer, healthier athletic career",
    ],
    faq: [
      {
        q: "What is proprioception?",
        a: "It's your body's sense of where it is in space. Better proprioception means faster reactions and better balance — key to avoiding injury.",
      },
    ],
  },
];
