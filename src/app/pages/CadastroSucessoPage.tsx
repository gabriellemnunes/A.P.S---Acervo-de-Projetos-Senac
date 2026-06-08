import { useNavigate } from "react-router";
import { APSLogo } from "../components/APSLogo";
import { CheckCircle } from "lucide-react";

export function CadastroSucessoPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-[16px] py-[32px] font-['Inter',sans-serif]"
      style={{ background: "linear-gradient(135deg, #daeaff 0%, #f0f3f9 45%, #fdecd6 100%)" }}
    >
      <div className="w-full max-w-[420px] flex flex-col items-center gap-[24px]">

        <APSLogo height={50} />

        <div className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.07)] shadow-sm p-[40px] w-full flex flex-col items-center text-center">

          {/* Ícone de sucesso */}
          <div className="relative mb-[24px]">
            <div className="w-[72px] h-[72px] rounded-full bg-[#dcfce7] flex items-center justify-center">
              <CheckCircle size={36} className="text-[#008236]" strokeWidth={1.8} />
            </div>
            {/* Anel decorativo */}
            <div className="absolute inset-[-6px] rounded-full border-2 border-[#008236]/15" />
          </div>

          <h2 className="font-semibold text-[20px] text-[#1A1A2E] mb-[8px]">Conta criada!</h2>
          <p className="text-[13px] text-[#4A4A6A] leading-[20px] mb-[32px] max-w-[280px]">
            Seu cadastro foi concluído com sucesso. Agora você já pode acessar a plataforma.
          </p>

          {/* Separador */}
          <div className="w-full h-[1px] bg-[rgba(0,0,0,0.06)] mb-[24px]" />

          {/* Info de boas-vindas */}
          <div className="flex flex-col gap-[10px] w-full mb-[28px]">
            {[
              { label: "Crie seu Projeto Integrador", sub: "Monte e gerencie seu projeto" },
              { label: "Encontre um mentor", sub: "Conecte-se com professores" },
              { label: "Agende encontros", sub: "Organize reuniões da equipe" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-[12px] bg-[#F4F6FA] rounded-[10px] px-[14px] py-[10px] text-left"
              >
                <div className="w-[6px] h-[6px] rounded-full bg-[#F38305] shrink-0" />
                <div>
                  <p className="text-[13px] font-medium text-[#1A1A2E]">{item.label}</p>
                  <p className="text-[11px] text-[#4A4A6A]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/selecionar-perfil")}
            className="w-full py-[14px] rounded-[12px] text-[14px] font-semibold text-white bg-[#F38305] hover:bg-[#F9A94B] active:scale-[0.98] transition-all"
            style={{ boxShadow: "0 6px 20px rgba(243,131,5,0.35)" }}
          >
            Ir para a plataforma
          </button>
        </div>
      </div>
    </div>
  );
}
