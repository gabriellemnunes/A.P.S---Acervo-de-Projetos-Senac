import { useState } from "react";
import { useNavigate } from "react-router";
import { APSLogo } from "../components/APSLogo";
import { Mail, RotateCcw } from "lucide-react";

export function VerificacaoEmailPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resent, setResent] = useState(false);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[i] = val;
    setCode(next);
    if (val && i < 5) {
      const el = document.getElementById(`code-${i + 1}`);
      el?.focus();
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      const el = document.getElementById(`code-${i - 1}`);
      el?.focus();
    }
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  const filled = code.every((d) => d !== "");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-[16px] py-[32px] font-['Inter',sans-serif]"
      style={{ background: "linear-gradient(135deg, #daeaff 0%, #f0f3f9 45%, #fdecd6 100%)" }}
    >
      <div className="w-full max-w-[420px] flex flex-col items-center gap-[24px]">

        <APSLogo height={50} />

        <div className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.07)] shadow-sm p-[36px] w-full flex flex-col items-center text-center">

          {/* Ícone */}
          <div className="w-[60px] h-[60px] rounded-full bg-[#D6E8FF] flex items-center justify-center mb-[20px]">
            <Mail size={26} className="text-[#044482]" />
          </div>

          <h2 className="font-semibold text-[18px] text-[#1A1A2E] mb-[6px]">Verifique seu e-mail</h2>
          <p className="text-[13px] text-[#4A4A6A] leading-[20px] mb-[28px]">
            Enviamos um código de 6 dígitos para o seu e-mail institucional. Insira abaixo para continuar.
          </p>

          {/* Inputs do código */}
          <div className="flex gap-[10px] mb-[28px]">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-[46px] h-[54px] text-center text-[22px] font-semibold text-[#1A1A2E] border-2 rounded-[12px] outline-none transition-colors"
                style={{
                  borderColor: digit ? "#044482" : "rgba(0,0,0,0.12)",
                  background: digit ? "#f0f6ff" : "#fafafa",
                }}
              />
            ))}
          </div>

          {/* Botão confirmar */}
          <button
            onClick={() => navigate("/cadastro-sucesso")}
            disabled={!filled}
            className="w-full py-[14px] rounded-[12px] text-[14px] font-semibold text-white transition-all active:scale-[0.98]"
            style={{
              background: filled ? "#F38305" : "#e5e7eb",
              color: filled ? "#fff" : "#9ca3af",
              boxShadow: filled ? "0 6px 20px rgba(243,131,5,0.35)" : "none",
              cursor: filled ? "pointer" : "not-allowed",
            }}
          >
            Confirmar código
          </button>

          {/* Reenviar */}
          <button
            onClick={handleResend}
            className="mt-[16px] flex items-center gap-[6px] text-[12px] text-[#4A4A6A] hover:text-[#044482] transition-colors"
          >
            <RotateCcw size={13} />
            {resent ? "Código reenviado!" : "Reenviar código"}
          </button>
        </div>

        <button
          onClick={() => navigate("/cadastro")}
          className="text-[12px] text-[#4A4A6A] hover:text-[#F38305] transition-colors"
        >
          ← Voltar para o cadastro
        </button>
      </div>
    </div>
  );
}
