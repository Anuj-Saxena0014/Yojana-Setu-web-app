// ─────────────────────────────────────────────────────────────────────────────
// src/pages/About.jsx
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Link } from "react-router-dom";

function TeamCard({ name, role, emoji }) {
  return (
    <div className="card p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-navy-50 border border-navy-100 flex items-center justify-center text-3xl mx-auto mb-4">
        {emoji}
      </div>
      <h3 className="font-display font-bold text-navy-800">{name}</h3>
      <p className="text-sm text-slate-500 font-body mt-1">{role}</p>
    </div>
  );
}

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-950 to-navy-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl font-bold mb-4">
            About <span className="text-saffron-400">Yojana Setu</span>
          </h1>
          <p className="font-body text-slate-300 text-lg leading-relaxed">
            Bridging the gap between 140 crore citizens and thousands of government
            welfare schemes — making every rupee of benefit reach those who deserve it.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section bg-white">
        <div className="container-max max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 font-body leading-relaxed mb-4">
                India has hundreds of central and state government welfare schemes worth
                lakhs of crores of rupees, yet a huge portion of eligible citizens
                remain unaware and unable to access them.
              </p>
              <p className="text-slate-600 font-body leading-relaxed">
                <strong className="text-navy-800">Yojana Setu</strong> (meaning "Scheme Bridge") 
                was built to solve this problem — a fast, simple, and free tool that 
                instantly tells you which government programs you're eligible for.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { emoji: "🎯", title: "Accurate Matching",  desc: "Eligibility-based filtering ensures only relevant schemes are shown."   },
                { emoji: "🆓", title: "Completely Free",    desc: "No registration, no hidden costs, no data selling. Ever."               },
                { emoji: "🔒", title: "Privacy First",      desc: "Your data never leaves your browser. No accounts required."             },
                { emoji: "📱", title: "Mobile Friendly",    desc: "Access from any device — phone, tablet, or desktop."                    },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="flex gap-4 items-start">
                  <div className="text-2xl flex-shrink-0 mt-0.5">{emoji}</div>
                  <div>
                    <h4 className="font-body font-semibold text-navy-800 text-sm">{title}</h4>
                    <p className="text-slate-500 font-body text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section bg-slate-50">
        <div className="container-max text-center">
          <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">Built With</h2>
          <p className="text-slate-500 font-body text-sm mb-8">A modern full-stack architecture</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "React + Vite", color: "bg-cyan-50 text-cyan-700 border-cyan-200"    },
              { label: "Node.js",      color: "bg-green-50 text-green-700 border-green-200" },
              { label: "Express",      color: "bg-slate-50 text-slate-700 border-slate-200" },
              { label: "MongoDB",      color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
              { label: "Tailwind CSS", color: "bg-sky-50 text-sky-700 border-sky-200"       },
              { label: "React Router", color: "bg-red-50 text-red-700 border-red-200"       },
              { label: "Axios",        color: "bg-purple-50 text-purple-700 border-purple-200" },
            ].map(({ label, color }) => (
              <span key={label} className={`badge border text-sm px-4 py-2 ${color}`}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="section bg-white">
        <div className="container-max max-w-2xl text-center">
          <div className="card p-8 border-amber-200 bg-amber-50">
            <div className="text-3xl mb-3">⚠️</div>
            <h3 className="font-display font-bold text-amber-900 text-xl mb-3">Disclaimer</h3>
            <p className="text-amber-800 font-body text-sm leading-relaxed">
              Yojana Setu is an educational and informational platform. The scheme data shown
              is for demonstration purposes only and may not be fully up-to-date. For accurate
              and official scheme information, always refer to the respective government portals
              and the Ministry websites.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-navy-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Find Your Schemes?</h2>
          <p className="text-slate-300 font-body mb-8">Takes less than 2 minutes. No account needed.</p>
          <Link to="/find-schemes" className="btn-saffron text-base px-8 py-3.5">
            ✦ Check Eligibility Now
          </Link>
        </div>
      </section>
    </div>
  );
}
