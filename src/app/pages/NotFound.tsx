import { useNavigate } from "react-router";
import { BookOpen } from "lucide-react";

export function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center font-['Inter',sans-serif]">
      <div className="text-center">
        <div className="bg-[#FDE8C8] rounded-[16px] w-[64px] h-[64px] flex items-center justify-center mx-auto mb-[20px]">
          <BookOpen size={28} className="text-[#F38305]" />
        </div>
        <p className="font-bold text-[48px] text-[#1A1A2E]">404</p>
        <p className="text-[16px] text-[#4A4A6A] mt-[8px]">Página não encontrada</p>
        <button onClick={() => navigate("/")}
          className="mt-[24px] bg-[#F38305] text-white text-[14px] font-medium px-[24px] h-[40px] rounded-[8px] hover:bg-[#F9A94B] transition-colors">
          Voltar ao início
        </button>
      </div>
    </div>
  );
}
