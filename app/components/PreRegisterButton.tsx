"use client";

export default function PreRegisterButton() {
  return (
    <button 
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event("open-property-modal"));
        }
      }}
      className="w-full py-3 rounded-[8px] bg-[#2a2a2a] text-white font-semibold text-[15px] hover:bg-[#6b6969] transition-all"
    >
      Pre Register
    </button>
  );
}