import { useState } from "react";
import { apiFetch } from "../../services/api";import { useNavigate } from "react-router";
import { Layout, PageHeader, Breadcrumb, Card, Tag } from "../components/Layout";
import {
  CheckCircle, Flame, ClipboardCheck, Archive,
  TrendingUp, Users, Calendar, FileText, Star, AlertCircle, Award
} from "lucide-react";

const ETAPAS = ["Pré-incubação", "Incubação ativa", "Em validação", "Desincubado"];

type StatusKey = "incubacao" | "validacao" | "desincubado";

const STATUS_CONFIG: Record<StatusKey, { label: string; color: string; bg: string; icon: React.ReactNode; tagColor: "orange" | "blue" | "green" }> = {
  incubacao: {
    label: "Incubação ativa",
    color: "#F38305",
    bg: "#FDE8C8",
    icon: <Flame size={18} className="text-[#F38305]" />,
    tagColor: "orange",
  },
  validacao: {
    label: "Em validação",
    color: "#044482",
    bg: "#D6E8FF",
    icon: <ClipboardCheck size={18} className="text-[#044482]" />,
    tagColor: "blue",
  },
  desincubado: {
    label: "Desincubado",
    color: "#008236",
    bg: "#dcfce7",
    icon: <Archive size={18} className="text-[#008236]" />,
    tagColor: "green",
  },
};

const ETAPA_MAP: Record<StatusKey, number> = {
  incubacao: 1,
  validacao: 2,
  desincubado: 3,
};

// ── Conteúdo por status ──────────────────────────────────────────

function IncubacaoAtiva() {
const [form, setForm] = useState({
    nome: "",
    descricao: "",
    tags: "",
    objetivo: "",
    publicoAlvo: "",
    tecnologias: "",
    atualizacao: "",
});
  const [saved, setSaved] = useState(false);
  const set = (f: string, v: string) => setForm((p) => ({ ...p, [f]: v }));

  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await apiFetch("/projetos", {
      method: "POST",
      body: JSON.stringify({
        nome: form.nome,
        descricao: form.descricao,
        tags: form.tags,
        tecnologias: form.tecnologias,
        objetivo: form.objetivo,
        publico_alvo: form.publicoAlvo,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar projeto.");
    }

    setSaved(true);

setTimeout(() => {
    setSaved(false);
    window.location.href = "/aluno";
}, 1500);

  } catch (error) {
    console.error(error);
    alert("Erro ao cadastrar projeto.");
  }
};

  const metrics = [
    { label: "Semanas ativas", value: "8", icon: <TrendingUp size={16} /> },
    { label: "Atualizações", value: "12", icon: <FileText size={16} /> },
    { label: "Encontros", value: "5", icon: <Calendar size={16} /> },
    { label: "Mentores", value: "2", icon: <Users size={16} /> },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Métricas rápidas */}
      <div className="grid grid-cols-4 gap-[12px]">
        {metrics.map((m) => (
          <Card key={m.label} className="p-[16px] flex flex-col gap-[6px]">
            <div className="flex items-center justify-between text-[#4A4A6A]">
              <span className="text-[11px] font-medium">{m.label}</span>
              {m.icon}
            </div>
            <p className="text-[24px] font-bold text-[#F38305]">{m.value}</p>
          </Card>
        ))}
      </div>

      {saved && (
        <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-[12px] p-[14px] flex items-center gap-[10px]">
          <CheckCircle size={16} className="text-[#008236] shrink-0" />
          <p className="text-[13px] font-medium text-[#008236]">Projeto cadastrado com sucesso!</p>
        </div>
      )}

      <form onSubmit={handleSave} className="flex flex-col gap-[20px]">
        <Card className="p-[24px]">
          <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[16px]">Informações do projeto</p>
          <div className="flex flex-col gap-[14px]">
            <div className="grid grid-cols-2 gap-[14px]">
              <div className="col-span-2">
                <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Nome do projeto *</label>
                <input value={form.nome} onChange={(e) => set("nome", e.target.value)}
                  className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition" />
              </div>
              <div className="col-span-2">
                <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Descrição *</label>
                <textarea value={form.descricao} onChange={(e) => set("descricao", e.target.value)} rows={3}
                  className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition resize-none" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Tags</label>
                <input value={form.tags} onChange={(e) => set("tags", e.target.value)}
                  className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Tecnologias</label>
                <input value={form.tecnologias} onChange={(e) => set("tecnologias", e.target.value)}
                  className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Objetivo</label>
                <textarea value={form.objetivo} onChange={(e) => set("objetivo", e.target.value)} rows={2}
                  className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition resize-none" />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Público-alvo</label>
                <textarea value={form.publicoAlvo} onChange={(e) => set("publicoAlvo", e.target.value)} rows={2}
                  className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition resize-none" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-[24px]">
          <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[4px]">Registro de atividade</p>
          <p className="text-[12px] text-[#4A4A6A] mb-[14px]">Documente o progresso recente para manter o projeto ativo.</p>
          <textarea value={form.atualizacao} onChange={(e) => set("atualizacao", e.target.value)}
            rows={4} placeholder="Descreva o que foi feito, decisões tomadas, próximos passos..."
            className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] placeholder:text-[#9ca3af] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition resize-none" />
        </Card>

        <div className="flex justify-end pb-[24px]">
          <button type="submit"
            className="bg-[#F38305] text-white text-[13px] font-medium px-[24px] h-[38px] rounded-[8px] hover:bg-[#F9A94B] transition-colors">
            Salvar projeto
          </button>
        </div>
      </form>
    </div>
  );
}

function EmValidacao() {
  const checklist = [
    { item: "Documentação técnica entregue", ok: true },
    { item: "Apresentação para a banca agendada", ok: true },
    { item: "Relatório final submetido", ok: false },
    { item: "Avaliação do mentor concluída", ok: false },
    { item: "Aprovação da coordenação", ok: false },
  ];

  const feedbacks = [
    { autor: "Prof. Ana Lima", data: "28 mai 2026", texto: "O projeto demonstra boa maturidade técnica. Falta detalhar melhor a metodologia de coleta de dados.", nota: 8 },
    { autor: "Prof. Carlos Melo", data: "30 mai 2026", texto: "Excelente engajamento da equipe. Recomendo revisar os critérios de sucesso do projeto.", nota: 9 },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Banner de alerta */}
      <div className="bg-[#D6E8FF] border border-[#0A5FB4]/20 rounded-[12px] p-[16px] flex items-start gap-[12px]">
        <AlertCircle size={18} className="text-[#044482] mt-[1px] shrink-0" />
        <div>
          <p className="text-[13px] font-semibold text-[#044482]">Projeto em fase de validação</p>
          <p className="text-[12px] text-[#044482]/70 mt-[2px]">Sua banca de avaliação está agendada para <strong>10 de junho de 2026</strong>. Finalize os pendentes abaixo.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-[20px]">
        {/* Checklist */}
        <Card className="p-[24px]">
          <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[16px]">Checklist de validação</p>
          <div className="flex flex-col gap-[10px]">
            {checklist.map((c) => (
              <div key={c.item} className="flex items-center gap-[10px]">
                <div className={`w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 ${c.ok ? "bg-[#dcfce7]" : "bg-[#f3f4f6]"}`}>
                  {c.ok
                    ? <CheckCircle size={13} className="text-[#008236]" />
                    : <div className="w-[6px] h-[6px] rounded-full bg-[#d1d5db]" />
                  }
                </div>
                <p className={`text-[13px] ${c.ok ? "text-[#4A4A6A] line-through" : "text-[#1A1A2E]"}`}>{c.item}</p>
              </div>
            ))}
          </div>
          <div className="mt-[16px] pt-[14px] border-t border-[rgba(0,0,0,0.06)]">
            <div className="flex justify-between text-[12px] text-[#4A4A6A] mb-[6px]">
              <span>Progresso</span>
              <span className="font-medium text-[#044482]">{checklist.filter(c => c.ok).length}/{checklist.length}</span>
            </div>
            <div className="w-full h-[6px] bg-[#e5e7eb] rounded-full overflow-hidden">
              <div className="h-full bg-[#044482] rounded-full transition-all" style={{ width: `${(checklist.filter(c => c.ok).length / checklist.length) * 100}%` }} />
            </div>
          </div>
        </Card>

        {/* Info banca */}
        <Card className="p-[24px]">
          <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[16px]">Banca avaliadora</p>
          <div className="flex flex-col gap-[10px]">
            {[
              { nome: "Prof. Ana Lima", area: "Tecnologia e Inovação" },
              { nome: "Prof. Carlos Melo", area: "Gestão e Sustentabilidade" },
              { nome: "Coord. Rita Souza", area: "Coordenação Acadêmica" },
            ].map((m) => (
              <div key={m.nome} className="flex items-center gap-[10px]">
                <div className="w-[34px] h-[34px] rounded-full bg-[#D6E8FF] flex items-center justify-center shrink-0">
                  <Users size={15} className="text-[#044482]" />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1A1A2E]">{m.nome}</p>
                  <p className="text-[11px] text-[#4A4A6A]">{m.area}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[16px] pt-[14px] border-t border-[rgba(0,0,0,0.06)] flex items-center gap-[8px]">
            <Calendar size={14} className="text-[#044482]" />
            <p className="text-[12px] text-[#4A4A6A]"><span className="font-semibold text-[#044482]">10 jun 2026</span> · 14h00 · Sala 302</p>
          </div>
        </Card>
      </div>

      {/* Feedbacks recebidos */}
      <Card className="p-[24px]">
        <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[16px]">Feedbacks dos mentores</p>
        <div className="flex flex-col gap-[14px]">
          {feedbacks.map((f) => (
            <div key={f.autor} className="bg-[#F4F6FA] rounded-[10px] p-[16px]">
              <div className="flex items-center justify-between mb-[8px]">
                <div>
                  <p className="text-[13px] font-semibold text-[#1A1A2E]">{f.autor}</p>
                  <p className="text-[11px] text-[#4A4A6A]">{f.data}</p>
                </div>
                <div className="flex items-center gap-[4px] bg-[#D6E8FF] px-[10px] py-[4px] rounded-full">
                  <Star size={12} className="text-[#044482]" fill="#044482" />
                  <span className="text-[12px] font-semibold text-[#044482]">{f.nota}/10</span>
                </div>
              </div>
              <p className="text-[12px] text-[#4A4A6A] leading-[18px]">{f.texto}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Desincubado() {
  const conquistas = [
    { label: "Projeto concluído", desc: "Todas as etapas finalizadas com êxito" },
    { label: "Banca aprovada", desc: "Nota final: 9,2 / 10,0" },
    { label: "Certificado emitido", desc: "Disponível para download" },
  ];

  return (
    <div className="flex flex-col gap-[20px]">
      {/* Banner de conclusão */}
      <div
        className="rounded-[16px] p-[28px] flex items-center gap-[20px]"
        style={{ background: "linear-gradient(135deg, #022f5e 0%, #044482 100%)" }}
      >
        <div className="w-[60px] h-[60px] rounded-full bg-[#F38305] flex items-center justify-center shrink-0">
          <Award size={28} className="text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-[18px]">Parabéns! Projeto desincubado com sucesso.</p>
          <p className="text-white/60 text-[13px] mt-[4px]">EcoApp - Sustentabilidade Urbana · Concluído em junho de 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[12px]">
        {conquistas.map((c) => (
          <Card key={c.label} className="p-[20px] flex flex-col items-center text-center gap-[8px]">
            <div className="w-[40px] h-[40px] rounded-full bg-[#dcfce7] flex items-center justify-center">
              <CheckCircle size={20} className="text-[#008236]" />
            </div>
            <p className="text-[13px] font-semibold text-[#1A1A2E]">{c.label}</p>
            <p className="text-[11px] text-[#4A4A6A]">{c.desc}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-[20px]">
        {/* Resumo final */}
        <Card className="p-[24px]">
          <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[16px]">Resumo do projeto</p>
          <div className="flex flex-col gap-[10px]">
            {[
              { label: "Nome", value: "EcoApp - Sustentabilidade Urbana" },
              { label: "Área", value: "Tecnologia & Sustentabilidade" },
              { label: "Tecnologias", value: "React Native, Node.js, MongoDB" },
              { label: "Duração", value: "4 meses (fev — jun 2026)" },
              { label: "Nota final", value: "9,2 / 10,0" },
            ].map((r) => (
              <div key={r.label} className="flex justify-between text-[13px] py-[6px] border-b border-[rgba(0,0,0,0.05)] last:border-0">
                <span className="text-[#4A4A6A]">{r.label}</span>
                <span className="font-medium text-[#1A1A2E] text-right max-w-[55%]">{r.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Avaliação final */}
        <Card className="p-[24px]">
          <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[16px]">Parecer final da banca</p>
          <div className="bg-[#F4F6FA] rounded-[10px] p-[16px] mb-[16px]">
            <p className="text-[13px] text-[#4A4A6A] leading-[20px] italic">
              "O EcoApp demonstrou excelente viabilidade técnica e impacto social. A equipe apresentou maturidade no desenvolvimento e clareza nos objetivos. Projeto recomendado para exposição no Acervo APS."
            </p>
            <p className="text-[12px] font-medium text-[#1A1A2E] mt-[10px]">— Banca Avaliadora · junho 2026</p>
          </div>
          <button className="w-full border border-[#044482] text-[#044482] text-[13px] font-medium h-[38px] rounded-[8px] hover:bg-[#D6E8FF] transition-colors flex items-center justify-center gap-[8px]">
            <FileText size={15} />
            Baixar certificado
          </button>
        </Card>
      </div>
    </div>
  );
}

// ── Página principal ─────────────────────────────────────────────

export function CriarProjetoPage() {
  const [statusAtivo, setStatusAtivo] = useState<StatusKey>("incubacao");
  const etapaAtual = ETAPA_MAP[statusAtivo];

  const tabs: { key: StatusKey; label: string; icon: React.ReactNode }[] = [
    { key: "incubacao", label: "Incubação ativa", icon: <Flame size={14} /> },
    { key: "validacao", label: "Em validação", icon: <ClipboardCheck size={14} /> },
    { key: "desincubado", label: "Desincubado", icon: <Archive size={14} /> },
  ];

  const cfg = STATUS_CONFIG[statusAtivo];

  return (
    <Layout role="aluno">
      <PageHeader title="Cadastrar Projeto" subtitle="Cadastre um novo Projeto Integrador" />
      <Breadcrumb items={[{ label: "Dashboard", path: "/aluno" }, { label: "Cadastrar Projeto" }]} />

      <div className="flex-1 overflow-y-auto px-[32px] py-[20px] flex flex-col gap-[20px]">

        {/* Progress de etapas */}
        <Card className="p-[20px]">
          <div className="flex items-center gap-0">
            {ETAPAS.map((etapa, i) => (
              <div key={etapa} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] font-semibold ${
                    i < etapaAtual ? "bg-[#F38305] text-white" :
                    i === etapaAtual ? "bg-[#F38305] text-white ring-4 ring-[#F38305]/20" :
                    "bg-[#e5e7eb] text-[#9ca3af]"
                  }`}>
                    {i < etapaAtual ? <CheckCircle size={14} /> : i + 1}
                  </div>
                  <p className={`text-[11px] mt-[5px] font-medium whitespace-nowrap ${
                    i === etapaAtual ? "text-[#F38305]" : i < etapaAtual ? "text-[#4A4A6A]" : "text-[#9ca3af]"
                  }`}>{etapa}</p>
                </div>
                {i < ETAPAS.length - 1 && (
                  <div className={`flex-1 h-[2px] mt-[-14px] ${i < etapaAtual ? "bg-[#F38305]" : "bg-[#e5e7eb]"}`} />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Abas de status */}
        <div className="flex items-center gap-[4px] bg-white border border-[rgba(0,0,0,0.08)] rounded-[12px] p-[4px] w-fit">
          {tabs.map((t) => {
            const active = t.key === statusAtivo;
            const c = STATUS_CONFIG[t.key];
            return (
              <button
                key={t.key}
                onClick={() => setStatusAtivo(t.key)}
                className="flex items-center gap-[7px] px-[16px] py-[8px] rounded-[9px] text-[13px] font-medium transition-all"
                style={active ? { background: c.bg, color: c.color } : { color: "#4A4A6A" }}
              >
                {t.icon}
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Status badge + conteúdo */}
        <div className="flex items-center gap-[10px] mb-[-8px]">
          <div className="flex items-center gap-[7px] px-[12px] py-[5px] rounded-full text-[12px] font-semibold" style={{ background: cfg.bg, color: cfg.color }}>
            {cfg.icon}
            {cfg.label}
          </div>
          <Tag label="EcoApp - Sustentabilidade Urbana" color="gray" />
        </div>

        {statusAtivo === "incubacao" && <IncubacaoAtiva />}
        {statusAtivo === "validacao" && <EmValidacao />}
        {statusAtivo === "desincubado" && <Desincubado />}
      </div>
    </Layout>
  );
}
