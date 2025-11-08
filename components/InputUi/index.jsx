"use client";
import { forwardRef } from "react";

const InputUi = forwardRef(function InputUi({ type, placeholder, autocomplete, width, height, ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      {...props}
      style={{ width, height }}
      className="
        block 
        text-[0.9rem] 
        placeholder:text-[0.9rem] 
        placeholder:text-neutral-500  
        font-normal 
        italic
        text-[rgb(var(--icon-secundary))]
        pl-4 
        rounded-[5px]
        w-full 
        outline-0 
        bg-[rgb(var(--input-bg))] 
        cursor-pointer"
      autoComplete={autocomplete}
    />
  );
});

export default InputUi;
