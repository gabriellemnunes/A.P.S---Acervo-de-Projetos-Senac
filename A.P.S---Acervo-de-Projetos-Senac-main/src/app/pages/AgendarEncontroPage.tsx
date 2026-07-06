import { useState } from "react";
import { useNavigate } from "react-router";
import { Layout, PageHeader, Breadcrumb, Card, Tag } from "../components/Layout";
import { Calendar, Clock, MapPin, CheckCircle, Video, Building } from "lucide-react";
import imgProfAnaSilva from "../../imports/DashboardParaRepositorioPiSenac/56d9e68ccff12413f144bdf75269165f5e84005a.png";
import imgProfCarlosMendes from "../../imports/DashboardParaRepositorioPiSenac/0d5da6ab018faf09b0940ac3e0ab4d6d514c431f.png";

const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DATAS = [1, 2, 3, 4, 5, 6,
               7, 8, 9, 10, 11, 12,
               13,14, 15, 16, 17, 18, 
               19, 20, 21, 22, 23, 24,
               25, 26, 27, 28, 29, 30];
const HORARIOS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const ocupados: Record<string, string[]> = {
  "14": ["09:00", "10:00", "14:00"],
  "15": ["11:00", "15:00"],
  "16": ["09:00", "16:00", "17:00"],
  "17": ["10:00", "14:00"],
};

const encontrosAgendados = [
  {
    id: 1,
    mentor: "Prof. Ana Silva",
    mentorImg: imgProfAnaSilva,
    data: "16 de abril às 14:00",
    tipo: "Online",
    status: "confirmado",
    pauta: "Revisão do protótipo do EcoApp",
  },
  {
    id: 2,
    mentor: "Prof. Carlos Mendes",
    mentorImg: imgProfCarlosMendes,
    data: "19 de abril às 10:00",
    tipo: "Presencial",
    status: "pendente",
    pauta: "Apresentação do MVP do MedConnect",
  },
];

export function AgendarEncontroPage() {
  const navigate = useNavigate();
  const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [modalidade, setModalidade] = useState<"online" | "presencial">("online");
  const [pauta, setPauta] = useState("");
  const [agendado, setAgendado] = useState(false);

  const isOcupado = (dia: number, hora: string) =>
    ocupados[String(dia)]?.includes(hora) ?? false;

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diaSelecionado || !horarioSelecionado) return;
    setAgendado(true);
    setTimeout(() => navigate("/aluno"), 2500);
  };

  return (
    <Layout role="aluno">
      <PageHeader title="Agendar Encontro" subtitle="Solicite uma reunião com seu mentor" />
      <Breadcrumb items={[{ label: "Dashboard", path: "/aluno" }, { label: "Agendar Encontro" }]} />

      <div className="flex-1 overflow-y-auto px-[32px] py-[20px] flex flex-col gap-[20px]">
        {agendado && (
          <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-[12px] p-[16px] flex items-center gap-[10px]">
            <CheckCircle size={18} className="text-[#008236] shrink-0" />
            <p className="text-[13px] font-medium text-[#008236]">Encontro agendado! Redirecionando para o dashboard…</p>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-[20px]">
          {/* Calendar picker */}
          <Card className="p-[24px]">
            <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[20px]">Escolha data e horário</p>

            {/* Days */}
            <p className="text-[12px] font-medium text-[#1A1A2E] mb-[10px]">Abril 2025</p>
            <div className="grid grid-cols-6 gap-[8px] mb-[20px]">
              {DIAS.map((dia, i) => (
                <div key={dia} className="flex flex-col items-center gap-[6px]">
                  <p className="text-[11px] text-[#4A4A6A] font-medium">{dia}</p>
                  <button
                    onClick={() => { setDiaSelecionado(DATAS[i]); setHorarioSelecionado(null); }}
                    className={`w-[40px] h-[40px] rounded-full text-[13px] font-medium transition-colors ${
                      diaSelecionado === DATAS[i]
                        ? "bg-[#F38305] text-white shadow-md"
                        : "hover:bg-[#FDE8C8] text-[#1A1A2E]"
                    }`}
                  >
                    {DATAS[i]}
                  </button>
                </div>
              ))}
            </div>

            {/* Time slots */}
            {diaSelecionado && (
              <>
                <p className="text-[12px] font-medium text-[#1A1A2E] mb-[10px]">Horários disponíveis — {diaSelecionado}/04</p>
                <div className="grid grid-cols-4 gap-[8px]">
                  {HORARIOS.map((h) => {
                    const ocup = isOcupado(diaSelecionado, h);
                    const sel = horarioSelecionado === h;
                    return (
                      <button
                        key={h}
                        disabled={ocup}
                        onClick={() => setHorarioSelecionado(h)}
                        className={`h-[36px] rounded-[8px] text-[12px] font-medium transition-colors border ${
                          ocup
                            ? "bg-[#F4F6FA] text-[#c4c9d4] border-transparent cursor-not-allowed line-through"
                            : sel
                            ? "bg-[#F38305] text-white border-[#F38305] shadow"
                            : "bg-white text-[#1A1A2E] border-[#e5e7eb] hover:border-[#F38305] hover:text-[#F38305]"
                        }`}
                      >
                        {h}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </Card>

          {/* Form */}
          <form onSubmit={handleAgendar}>
            <Card className="p-[24px] flex flex-col gap-[16px]">
              <p className="font-semibold text-[15px] text-[#1A1A2E]">Detalhes do encontro</p>

              {/* Selected slot badge */}
              {diaSelecionado && horarioSelecionado && (
                <div className="bg-[#FDE8C8] border border-[#bfdbfe] rounded-[10px] p-[12px] flex items-center gap-[10px]">
                  <Calendar size={16} className="text-[#F38305] shrink-0" />
                  <p className="text-[13px] font-medium text-[#F38305]">
                    {diaSelecionado} de abril · {horarioSelecionado}
                  </p>
                </div>
              )}

              {/* Modalidade */}
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[8px]">Modalidade</label>
                <div className="flex gap-[10px]">
                  {(["online", "presencial"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setModalidade(m)}
                      className={`flex-1 flex items-center justify-center gap-[8px] h-[40px] rounded-[8px] border text-[13px] font-medium transition-colors ${
                        modalidade === m
                          ? "bg-[#FDE8C8] border-[#F38305] text-[#F38305]"
                          : "bg-white border-[#e5e7eb] text-[#4A4A6A] hover:border-[#F38305]"
                      }`}
                    >
                      {m === "online" ? <Video size={15} /> : <Building size={15} />}
                      {m === "online" ? "Online" : "Presencial"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pauta */}
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Pauta da reunião *</label>
                <textarea
                  value={pauta}
                  onChange={(e) => setPauta(e.target.value)}
                  placeholder="Descreva os tópicos que deseja discutir com o mentor..."
                  rows={4}
                  className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] text-[#1A1A2E] placeholder:text-[#9ca3af] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={!diaSelecionado || !horarioSelecionado || !pauta.trim()}
                className="w-full bg-[#F38305] text-white text-[13px] font-medium h-[40px] rounded-[8px] hover:bg-[#F9A94B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirmar agendamento
              </button>
            </Card>
          </form>
        </div>

        {/* Scheduled meetings */}
        <Card className="p-[24px]">
          <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[16px]">Encontros agendados</p>
          <div className="flex flex-col gap-[10px]">
            {encontrosAgendados.map((enc) => (
              <div key={enc.id} className="border border-[rgba(0,0,0,0.08)] rounded-[12px] p-[16px] flex items-center gap-[14px]">
                <img src={enc.mentorImg} alt={enc.mentor} className="w-[44px] h-[44px] rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-[8px] flex-wrap">
                    <p className="font-semibold text-[14px] text-[#1A1A2E]">{enc.mentor}</p>
                    <span className={`inline-flex items-center px-[7px] py-[2px] rounded-[6px] text-[11px] font-medium ${
                      enc.status === "confirmado" ? "bg-[#dcfce7] text-[#008236]" : "bg-[#fff7ed] text-[#f54900]"
                    }`}>
                      {enc.status === "confirmado" ? "Confirmado" : "Aguardando confirmação"}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#4A4A6A] mt-[2px]">{enc.pauta}</p>
                  <div className="flex items-center gap-[12px] mt-[6px] text-[12px] text-[#4A4A6A]">
                    <span className="flex items-center gap-[4px]"><Clock size={13} />{enc.data}</span>
                    <span className="flex items-center gap-[4px]">
                      {enc.tipo === "Online" ? <Video size={13} /> : <MapPin size={13} />}
                      {enc.tipo}
                    </span>
                  </div>
                </div>
                <button className="shrink-0 border border-[rgba(0,0,0,0.1)] rounded-[8px] h-[32px] px-[14px] text-[12px] font-medium text-[#4A4A6A] hover:bg-[#F4F6FA] transition-colors">
                  Ver detalhes
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
