"use client";

export default function FormLayout({ children, visible }) {
  return (
    <div className={visible ? "hidden" : "flex" + 
    "min-w-[320px] sm:min-w-[420px]  items-center justify-center bg-white p-3 sm:p-6 rounded-[35px] shadow-lg select-none"}>
        {children}
    </div>
  );
}