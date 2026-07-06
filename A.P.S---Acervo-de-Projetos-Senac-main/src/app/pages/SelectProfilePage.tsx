import { useNavigate } from "react-router";
import { GraduationCap, Users, Settings } from "lucide-react";
import { APSLogo } from "../components/APSLogo";

export function SelectProfilePage() {
  const navigate = useNavigate();

  const profiles = [
    {
      role: "aluno" as const,
      label: "Aluno",
      description: "Crie e gerencie seu Projeto Integrador, busque mentores e conecte-se com sua equipe.",
      icon: GraduationCap,
      color: "bg-[#F38305]",
      lightColor: "bg-[#FDE8C8]",
      textColor: "text-[#F38305]",
      hoverBorder: "#F38305",
    },
    {
      role: "professor" as const,
      label: "Professor / Mentor",
      description: "Acompanhe turmas, avalie projetos e oriente seus alunos ao longo do processo.",
      icon: Users,
      color: "bg-[#008236]",
      lightColor: "bg-[#f0fdf4]",
      textColor: "text-[#008236]",
      hoverBorder: "#008236",
    },
    {
      role: "coordenador" as const,
      label: "Coordenador",
      description: "Gerencie turmas, publique formulários e supervise todos os projetos da instituição.",
      icon: Settings,
      color: "bg-[#8200db]",
      lightColor: "bg-[#f3e8ff]",
      textColor: "text-[#8200db]",
      hoverBorder: "#8200db",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-[16px] font-['Inter',sans-serif]" style={{ backgroundImage: "linear-gradient(153.818deg, rgb(218, 234, 255) 0%, rgb(240, 243, 249) 45%, rgb(253, 236, 214) 100%)" }}>
      <div className="w-full max-w-[680px]">

        {/* Logo */}
        <div className="flex flex-col items-center mb-[40px]">
          <APSLogo height={80} />
          <h1 className="font-bold text-[22px] text-[#1A1A2E] mt-[20px]">Como você vai acessar?</h1>
          <p className="text-[14px] text-[#4A4A6A] mt-[4px]">Selecione seu perfil para continuar</p>
        </div>

        <div className="flex flex-col gap-[16px]">
          {profiles.map((p) => (
            <button
              key={p.role}
              onClick={() => navigate(`/login?profile=${p.role}`)}
              className="bg-white rounded-[16px] border-2 transition-all p-[24px] flex items-center gap-[20px] text-left group hover:shadow-md"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = p.hoverBorder)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)")}
            >
              <div className={`${p.lightColor} rounded-[12px] w-[52px] h-[52px] flex items-center justify-center shrink-0`}>
                <p.icon size={24} className={p.textColor} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[16px] text-[#1A1A2E]">{p.label}</p>
                <p className="text-[13px] text-[#4A4A6A] mt-[2px] leading-[18px]">{p.description}</p>
              </div>
              <div className={`${p.color} text-white rounded-full w-[32px] h-[32px] flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity`}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <button onClick={() => navigate("/")} className="mt-[24px] w-full text-center text-[13px] text-[#4A4A6A] hover:text-[#F38305] transition-colors">
          ← Voltar à página inicial
        </button>
      </div>
    </div>
  );
}
