"use client";

export default function Loading() {
  return (
    <div className="h-screen inset-0 flex items-center justify-center bg-black z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white text-lg font-medium">Carregando...</p>
      </div>
    </div>
  );
}

