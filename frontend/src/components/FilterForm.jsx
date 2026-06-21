// ─────────────────────────────────────────────────────────────────────────────
// src/components/FilterForm.jsx  –  User profile / eligibility form
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from "react";

const STATES = [
  "All India","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
  "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
  "Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh",
];

const OCCUPATIONS = ["Student","Farmer","Employee","Self-Employed","Unemployed","Other"];
const CATEGORIES  = ["General","OBC","SC","ST"];
const GENDERS     = ["Male","Female","Other"];

const EMPTY = {
  age: "",
  gender: "",
  annualIncome: "",
  state: "",
  occupation: "",
  category: "",
};

const Field = ({ label, id, icon, error, filled, children }) => (
    <div className="group">
      <label
        htmlFor={id}
        className="flex items-center gap-2 text-sm font-semibold text-slate-700 font-body mb-2"
      >
        <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200 ${
          error
            ? "bg-red-100 text-red-500"
            : filled
            ? "bg-green-100 text-green-600"
            : "bg-slate-100 text-slate-400 group-hover:bg-saffron-50 group-hover:text-saffron-600"
        }`}>
          {icon}
        </span>
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-500 font-body flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
// Icon components for each field
const icons = {
  age: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  gender: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  income: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  state: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  ),
  occupation: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
    </svg>
  ),
  category: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  ),
};

export default function FilterForm({ onSubmit, loading, layout = "sidebar" }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.age)         e.age = "Age is required";
    else if (form.age < 0 || form.age > 120) e.age = "Enter a valid age (0–120)";
    if (!form.gender)      e.gender = "Select a gender";
    if (!form.annualIncome) e.annualIncome = "Annual income is required";
    if (!form.occupation)  e.occupation = "Select an occupation";
    if (!form.category)    e.category = "Select a category";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      age: Number(form.age),
      annualIncome: Number(form.annualIncome),
    });
  };

  const handleReset = () => {
    setForm(EMPTY);
    setErrors({});
  };

  const filledCount = Object.values(form).filter(Boolean).length;
  const totalFields = Object.keys(EMPTY).length;

  // ── Styled field wrapper ──
  

  // Input class builder
  const inputClass = (field) =>
    `w-full px-4 py-3 bg-white border-2 rounded-xl text-slate-900 font-body text-sm
     transition-all duration-200 placeholder-slate-400
     focus:outline-none focus:ring-2 focus:ring-offset-1
     ${
       errors[field]
         ? "border-red-300 focus:ring-red-400 focus:border-red-400"
         : form[field]
         ? "border-green-300 focus:ring-green-400 focus:border-green-400"
         : "border-slate-200 focus:ring-saffron-400 focus:border-saffron-400 hover:border-slate-300"
     }`;

  // ─────────────────────────────────────────────────────────────────────────
  // FULL-WIDTH layout (used on the FindSchemes page)
  // ─────────────────────────────────────────────────────────────────────────
  if (layout === "full") {
    return (
      <form onSubmit={handleSubmit} noValidate>
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-bold text-navy-900 text-2xl sm:text-3xl">
              Check Your Eligibility
            </h2>
            <p className="text-sm text-slate-500 font-body mt-1">
              Fill in all your details below and we'll match you with the best government schemes.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none"
                  stroke={filledCount === totalFields ? "#22c55e" : "#ff7800"}
                  strokeWidth="3"
                  strokeDasharray={`${(filledCount / totalFields) * 94.25} 94.25`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
                {filledCount}/{totalFields}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-700 font-body">Fields filled</p>
              <p className="text-[10px] text-slate-400 font-body">
                {filledCount === totalFields ? "All set! ✓" : `${totalFields - filledCount} remaining`}
              </p>
            </div>
          </div>
        </div>

        {/* ── All 6 fields in a responsive 3-column grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
          {/* Age */}
          <Field
  label="Age *"
  id="age"
  icon={icons.age}
  error={errors.age}
  filled={!!form.age}
>
            <input
            id="age"
           type="number"
          min={0}
          max={120}
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          placeholder="e.g. 24"
          className={inputClass("age")}
          />
          </Field>


          {/* Gender */}
          <Field
  label="Gender *"
  id="gender"
  icon={icons.gender}
  error={errors.gender}
  filled={!!form.gender}
>
            <select
              id="gender"
              value={form.gender}
              onChange={set("gender")}
              className={inputClass("gender")}
            >
              <option value="">Select gender</option>
              {GENDERS.map((g) => <option key={g}>{g}</option>)}
            </select>
          </Field>

          {/* Annual Income */}
          <Field
  label="Annual Income (₹) *"
  id="annualIncome"
  icon={icons.income}
  error={errors.annualIncome}
  filled={!!form.annualIncome}
>
            <input
              id="annualIncome"
              type="number"
              min={0}
              value={form.annualIncome}
              onChange={set("annualIncome")}
              placeholder="e.g. 150000"
              className={inputClass("annualIncome")}
            />
          </Field>

          {/* State */}
          <Field
  label="State"
  id="state"
  icon={icons.state}
  error={errors.state}
  filled={!!form.state}
>
            <select
              id="state"
              value={form.state}
              onChange={set("state")}
              className={inputClass("state")}
            >
              <option value="">Select state (optional)</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>

          {/* Occupation */}
          <Field
  label="Occupation *"
  id="occupation"
  icon={icons.occupation}
  error={errors.occupation}
  filled={!!form.occupation}
>
            <select
              id="occupation"
              value={form.occupation}
              onChange={set("occupation")}
              className={inputClass("occupation")}
            >
              <option value="">Select occupation</option>
              {OCCUPATIONS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>

          {/* Category */}
         <Field
  label="Category *"
  id="category"
  icon={icons.category}
  error={errors.category}
  filled={!!form.category}
>
            <select
              id="category"
              value={form.category}
              onChange={set("category")}
              className={inputClass("category")}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        {/* ── Actions row ── */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-slate-100">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5
                       bg-gradient-to-r from-saffron-600 to-saffron-500 text-white font-body font-semibold
                       rounded-xl shadow-lg shadow-saffron-200/50 hover:shadow-xl hover:from-saffron-700 hover:to-saffron-600
                       active:scale-[0.98] transition-all duration-200
                       disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none text-base"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Finding Schemes…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Find My Schemes
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5
                       border-2 border-slate-200 text-slate-600 font-body font-semibold rounded-xl
                       hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all duration-200 text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Reset All
          </button>

          {filledCount > 0 && filledCount < totalFields && (
            <p className="text-xs text-slate-400 font-body sm:ml-auto">
              💡 Fill in all required fields marked with * to find your schemes
            </p>
          )}
        </div>
      </form>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SIDEBAR layout (compact, for use in sidebar panels)
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5"
    >
      <div className="space-y-1">
        <h2 className="font-display font-bold text-navy-900 text-xl">
          Tell Us About Yourself
        </h2>
        <p className="text-sm text-slate-500 font-body">
          Fill in your details to find matching government schemes.
        </p>
      </div>

      {/* ── Grid layout for fields ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Age */}
        <Field label="Age *" id="age-sb" icon={icons.age} error={errors.age}>
          <input
            id="age-sb"
            type="number"
            min={0} max={120}
            value={form.age}
            onChange={set("age")}
            placeholder="e.g. 24"
            className={inputClass("age")}
          />
        </Field>

        {/* Gender */}
        <Field label="Gender *" id="gender-sb" icon={icons.gender} error={errors.gender}>
          <select
            id="gender-sb"
            value={form.gender}
            onChange={set("gender")}
            className={inputClass("gender")}
          >
            <option value="">Select gender</option>
            {GENDERS.map((g) => <option key={g}>{g}</option>)}
          </select>
        </Field>

        {/* Annual Income */}
        <Field label="Annual Income (₹) *" id="annualIncome-sb" icon={icons.income} error={errors.annualIncome}>
          <input
            id="annualIncome-sb"
            type="number"
            min={0}
            value={form.annualIncome}
            onChange={set("annualIncome")}
            placeholder="e.g. 150000"
            className={inputClass("annualIncome")}
          />
        </Field>

        {/* State */}
        <Field label="State" id="state-sb" icon={icons.state} error={errors.state}>
          <select id="state-sb" value={form.state} onChange={set("state")} className={inputClass("state")}>
            <option value="">Select state (optional)</option>
            {STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>

        {/* Occupation */}
        <Field label="Occupation *" id="occupation-sb" icon={icons.occupation} error={errors.occupation}>
          <select
            id="occupation-sb"
            value={form.occupation}
            onChange={set("occupation")}
            className={inputClass("occupation")}
          >
            <option value="">Select occupation</option>
            {OCCUPATIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>

        {/* Category */}
        <Field label="Category *" id="category-sb" icon={icons.category} error={errors.category}>
          <select
            id="category-sb"
            value={form.category}
            onChange={set("category")}
            className={inputClass("category")}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      {/* ── Actions ── */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-saffron flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Finding…
            </>
          ) : (
            "🔍 Find My Schemes"
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn-outline px-4"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
