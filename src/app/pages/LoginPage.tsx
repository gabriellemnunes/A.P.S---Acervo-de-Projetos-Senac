import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Eye, EyeOff, GraduationCap, Users, Settings } from "lucide-react";
import { APSLogo } from "../components/APSLogo";

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const profile = searchParams.get("profile") || "";

  const profileInfo = {
    aluno: { label: "Aluno", icon: GraduationCap, color: "bg-[#F38305]", textColor: "text-[#F38305]" },
    professor: { label: "Professor", icon: Users, color: "bg-[#008236]", textColor: "text-[#008236]" },
    coordenador: { label: "Coordenador", icon: Settings, color: "bg-[#8200db]", textColor: "text-[#8200db]" },
  }[profile as keyof typeof profileInfo];

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      alert("E-mail ou senha inválidos.");
      return;
    }

    const data = await response.json();

    localStorage.setItem("token", data.access_token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    const perfilUsuario = data.usuario?.perfil || profile;

    if (perfilUsuario === "aluno") navigate("/aluno");
    else if (perfilUsuario === "professor") navigate("/professor");
    else if (perfilUsuario === "coordenador") navigate("/coordenador");
    else navigate("/selecionar-perfil");
  } catch (error) {
    console.error(error);
    alert("Erro ao conectar com o servidor.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-[16px] font-['Inter',sans-serif]" style={{ background: "linear-gradient(135deg, #daeaff 0%, #f0f3f9 45%, #fdecd6 100%)" }}>
      <div className="w-full max-w-[400px] flex flex-col gap-[24px]">

        {/* Logo */}
        <div className="flex justify-center">
          <APSLogo height={64} />
        </div>

        {/* Login card */}
        <div className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.07)] shadow-sm p-[32px]">
          <h2 className="font-semibold text-[18px] text-[#1A1A2E] mb-[6px]">Entrar na plataforma</h2>
          <p className="text-[13px] text-[#4A4A6A] mb-[16px]">Acesse com seu e-mail</p>

          {/* Profile badge */}
          {profileInfo && (
            <div className="mb-[20px] flex items-center gap-[10px] bg-[#f9fafb] border border-[rgba(0,0,0,0.06)] rounded-[10px] p-[12px]">
              <div className={`w-[32px] h-[32px] rounded-full ${profileInfo.color} flex items-center justify-center shrink-0`}>
                <profileInfo.icon size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[11px] text-[#6b7280]">Entrando como:</p>
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
              <label className="block text-[13px] font-medium text-[#1A1A2E] mb-[6px]">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full border border-[#e5e7eb] rounded-[10px] px-[14px] py-[11px] text-[14px] text-[#1A1A2E] placeholder:text-[#c4c9d4] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/15 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-[6px]">
                <label className="text-[13px] font-medium text-[#1A1A2E]">Senha</label>
                <button type="button" className="text-[12px] text-[#044482] hover:text-[#F38305] transition-colors hover:underline">
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
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
              Entrar
            </button>
          </form>
        </div>

        {/* Register CTA */}
        <div className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.07)] shadow-sm p-[24px] flex items-center justify-between gap-[16px]">
          <div>
            <p className="font-medium text-[14px] text-[#1A1A2E]">Ainda não tem conta?</p>
            <p className="text-[12px] text-[#4A4A6A] mt-[2px]">Crie seu acesso agora</p>
          </div>
          <button
            onClick={() => navigate(profile ? `/cadastro?profile=${profile}` : "/cadastro")}
            className="shrink-0 bg-[#044482] text-white font-semibold text-[13px] px-[18px] py-[9px] rounded-[10px] hover:bg-[#0a5fb4] active:scale-[0.98] transition-all whitespace-nowrap"
          >
            Criar conta
          </button>
        </div>

        <p className="text-center text-[11px] text-[#9ca3af]">
          © 2025 Senac Pernambuco · A.P.S. — Acervo de Projetos Senac
        </p>
      </div>
    </div>
  );
}
