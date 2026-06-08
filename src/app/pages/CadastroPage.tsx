import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Eye, EyeOff, GraduationCap, Users, Settings } from "lucide-react";
import { APSLogo } from "../components/APSLogo";

export function CadastroPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", matricula: "", password: "" });

  const profile = searchParams.get("profile") || "";

  const profileInfo = {
    aluno: { label: "Aluno", icon: GraduationCap, color: "bg-[#F38305]", textColor: "text-[#F38305]" },
    professor: { label: "Professor", icon: Users, color: "bg-[#008236]", textColor: "text-[#008236]" },
    coordenador: { label: "Coordenador", icon: Settings, color: "bg-[#8200db]", textColor: "text-[#8200db]" },
  }[profile as keyof typeof profileInfo];

  const set = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/verificar-email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-[16px] py-[32px] font-['Inter',sans-serif]" style={{ background: "linear-gradient(135deg, #daeaff 0%, #f0f3f9 45%, #fdecd6 100%)" }}>
      <div className="w-full max-w-[440px] flex flex-col gap-[20px]">

        {/* Logo */}
        <div className="flex justify-center">
          <APSLogo height={56} />
        </div>

        {/* Card */}
        <div className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.07)] shadow-sm p-[32px]">
          <h2 className="font-semibold text-[17px] text-[#1A1A2E] mb-[4px]">Criar conta</h2>
          <p className="text-[12px] text-[#4A4A6A] mb-[16px]">Preencha suas informações para criar a conta</p>

          {/* Profile badge */}
          {profileInfo && (
            <div className="mb-[20px] flex items-center gap-[10px] bg-[#f9fafb] border border-[rgba(0,0,0,0.06)] rounded-[10px] p-[12px]">
              <div className={`w-[32px] h-[32px] rounded-full ${profileInfo.color} flex items-center justify-center shrink-0`}>
                <profileInfo.icon size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-[#6b7280]">Cadastrando como:</p>
                <p className={`font-semibold text-[13px] ${profileInfo.textColor}`}>{profileInfo.label}</p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/selecionar-perfil")}
                className="text-[11px] text-[#6b7280] hover:text-[#F38305] transition-colors underline"
              >
                Trocar
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-[14px]">
            <div>
              <label className="block text-[13px] font-medium text-[#1A1A2E] mb-[6px]">Nome completo *</label>
              <input
                value={form.nome}
                onChange={(e) => set("nome", e.target.value)}
                placeholder="Ex: João da Silva"
                required
                className="w-full border border-[#e5e7eb] rounded-[10px] px-[14px] py-[11px] text-[14px] text-[#1A1A2E] placeholder:text-[#c4c9d4] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/15 transition"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#1A1A2E] mb-[6px]">E-mail *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full border border-[#e5e7eb] rounded-[10px] px-[14px] py-[11px] text-[14px] text-[#1A1A2E] placeholder:text-[#c4c9d4] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/15 transition"
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#1A1A2E] mb-[6px]">Matrícula *</label>
              <input
                value={form.matricula}
                onChange={(e) => set("matricula", e.target.value)}
                placeholder="Ex: 2025001234"
                required
                className="w-full border border-[#e5e7eb] rounded-[10px] px-[14px] py-[11px] text-[14px] text-[#1A1A2E] placeholder:text-[#c4c9d4] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/15 transition"
              />
              <p className="text-[11px] text-[#9ca3af] mt-[5px]">Use o número da sua matrícula institucional Senac</p>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-[#1A1A2E] mb-[6px]">Senha *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                  minLength={8}
                  className="w-full border border-[#e5e7eb] rounded-[10px] px-[14px] py-[11px] pr-[44px] text-[14px] text-[#1A1A2E] placeholder:text-[#c4c9d4] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/15 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#4A4A6A] transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#F38305] text-white font-semibold text-[14px] py-[12px] rounded-[10px] mt-[6px] hover:bg-[#F9A94B] active:scale-[0.98] transition-all shadow-sm shadow-[#F38305]/25"
            >
              Criar minha conta
            </button>
          </form>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate(profile ? `/login?profile=${profile}` : "/login")}
            className="text-[13px] text-[#4A4A6A] hover:text-[#F38305] transition-colors"
          >
            ← Já tenho conta, quero entrar
          </button>
        </div>
      </div>
    </div>
  );
}
