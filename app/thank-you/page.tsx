import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-[#fcfdfd] px-6 pt-24 pb-20">
      <div className="bg-white p-10 md:p-14 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 text-center max-w-lg mx-auto flex flex-col items-center animate-fade-in">
        
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-green-500" strokeWidth={1.5} />
        </div>
        
        {/* Text */}
        <h1 className="text-[32px] md:text-[38px] font-bold text-[#0F1A2A] mb-4 tracking-tight">
          Thank You!
        </h1>
        <p className="text-[#5b6472] text-[15px] md:text-[16px] leading-[1.6] mb-10">
          Your request has been successfully submitted. One of our expert property consultants will get in touch with you shortly to assist you with your real estate journey.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <button className="w-full px-8 py-3.5 rounded-[8px] border-2 border-gray-200 text-[#374151] font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all">
              Back to Home
            </button>
          </Link>
          <Link href="/properties/bengaluru" className="w-full sm:w-auto">
            <button className="w-full px-8 py-3.5 rounded-[8px] bg-[#21409A] text-white font-semibold hover:bg-[#1a327a] transition-all shadow-md">
              Browse Properties
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}