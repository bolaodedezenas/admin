

export default function InputLayout({ children }) {
  return (
    <div className="w-full xxs:w-[85%] xs:w-[80%] sm:w-[80%] pl-5  pr-5 mt-8 ">
        <div 
            className="flex items-center justify-center  bg-[rgb(var(--input-bg))] rounded-[5px] mb-4 cursor-pointer flex-col h-13 position: relative pl-4"
        >
            {children}
        </div>
    </div>
  );
}