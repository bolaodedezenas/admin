"use client";

export default function InputUi({
  type = "text",
  placeholder,
  autocomplete,
  width,
  height,
  value,
  onChange,
  name,
  onBlur,
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autocomplete}
      onBlur={onBlur}
      style={{ width, height }}
      className="
        block 
        text-[0.9rem] 
        placeholder:text-[0.9rem] 
        placeholder:text-neutral-500  
        font-normal 
        italic
        text-[rgb(var(--icon-secundary))]
        pl-8
        pt-6 
        pb-1
        rounded-[5px]
        w-full 
        outline-0 
        bg-[rgb(var(--input-bg))] 
        cursor-pointer
      "
      {...props} // permite id, checked, disabled, etc
    />
  );
}
