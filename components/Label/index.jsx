"use client";

export default function Label({ children, id }) {
    return (
        <label htmlFor={id} className="
            w-full
            block 
            text-[0.9rem] 
            font-medium 
            text-[rgb(var(--text))] 
            cursor-pointer
            ">
            {children}
        </label>
    );
}
