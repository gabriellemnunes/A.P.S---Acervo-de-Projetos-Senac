import { useState } from "react";
import { useNavigate } from "react-router";
import { Layout, PageHeader, Breadcrumb, Card, Tag } from "../components/Layout";
import {
  CheckCircle, XCircle, Star, MessageSquare, TrendingUp,
  FileText, Users, ChevronRight, ArrowLeft, Clock, Flame, ClipboardCheck
} from "lucide-react";

const squads = [
  {
    id: "1",
    nome: "Squad Alpha",
    projeto: "EcoApp - Sustentabilidade Urbana",
    alunos: ["João Silva", "Maria Oliveira", "Pedro Santos"],
    etapa: "Incubação ativa",
    etapaColor: "orange" as const,
    progresso: 62,
    tecnologias: "React Native, Node.js, MongoDB",
    tags: ["Sustentabilidade", "Mobile", "IoT"],
    descricao: "Aplicativo para gestão de resíduos recicláveis em comunidades urbanas, conectando moradores a pontos de coleta.",
    objetivo: "Reduzir o descarte irregular de resíduos em 30% nas comunidades atendidas.",
    pendente: true,
    entregas: [
      { label: "Formulário de inscrição", feito: true },
      { label: "Pitch inicial (300 palavras)", feito: true },
      { label: "Kit Personas e Papéis", feito: true },
      { label: "Protótipo navegável", feito: false },
      { label: "MVP funcional", feito: false },
    ],
  },
  {
    id: "2",
    nome: "Squad Beta",
    projeto: "EduTech - Gamificação do Aprendizado",
    alunos: ["Ana Costa", "Lucas Ferreira"],
    etapa: "Em validação",
    etapaColor: "blue" as const,
    progresso: 90,
    tecnologias: "React, Python/Django, PostgreSQL",
    tags: ["Educação", "Gamificação", "Web"],
    descricao: "Plataforma educacional com gamificação para engajamento de alunos do ensino médio em disciplinas de exatas.",
    objetivo: "Aumentar o engajamento dos alunos em 50% nas disciplinas de exatas.",
    pendente: true,
    entregas: [
      { label: "Formulário de inscrição", feito: true },
      { label: "Pitch inicial (300 palavras)", feito: true },
      { label: "Protótipo navegável", feito: true },
      { label: "MVP funcional", feito: true },
      { label: "Pitch Twitter", feito: true },
      { label: "Canvas de Modelo de Negócio", feito: false },
    ],
  },
  {
    id: "3",
    nome: "Squad Gamma",
    projeto: "HealthTrack - Monitoramento Preventivo",
    alunos: ["Carla Mendes", "Rafael Lima", "Bianca Rocha", "Thiago Alves"],
    etapa: "Incubação ativa",
    etapaColor: "orange" as const,
    progresso: 45,
    tecnologias: "Flutter, Firebase, Python",
    tags: ["Saúde", "Mobile", "IA"],
    descricao: "App de monitoramento de saúde preventiva com análise de hábitos e alertas personalizados via IA.",
    objetivo: "Auxiliar usuários a identificar riscos de saúde antes que se tornem problemas graves.",
    pendente: false,
    entregas: [
      { label: "Formulário de inscrição", feito: true },
      { label: "Pitch inicial (300 palavras)", feito: true },
      { label: "Kit Personas e Papéis", feito: false },
      { label: "Protótipo navegável", feito: false },
    ],
  },
  {
    id: "4",
    nome: "Squad Delta",
    projeto: "AgriSmart - Agricultura de Precisão",
    alunos: ["Fernanda Cruz", "Marcos Neto"],
    etapa: "Incubação ativa",
    etapaColor: "orange" as const,
    progresso: 30,
    tecnologias: "React, Node.js, IoT/MQTT",
    tags: ["Agronegócio", "IoT", "Dados"],
    descricao: "Plataforma de monitoramento agrícola com sensores IoT para otimização do uso de água e fertilizantes.",
    objetivo: "Reduzir desperdício hídrico em 40% em pequenas propriedades rurais.",
    pendente: false,
    entregas: [
      { label: "Formulário de inscrição", feito: true },
      { label: "Pitch inicial (300 palavras)", feito: false },
    ],
  },
];

const criterios = [
  { id: "inovacao", label: "Inovação e originalidade", desc: "O projeto apresenta solução inovadora para o problema proposto?" },
  { id: "viabilidade", label: "Viabilidade técnica", desc: "A solução é tecnicamente viável com os recursos disponíveis?" },
  { id: "impacto", label: "Impacto social/econômico", desc: "O projeto tem potencial de impacto real e mensurável?" },
  { id: "execucao", label: "Qualidade da execução", desc: "O nível de execução e apresentação está adequado à etapa?" },
  { id: "equipe", label: "Engajamento da equipe", desc: "A equipe demonstra comprometimento e evolução consistente?" },
];

export function AvaliarProjetoPage() {
  const navigate = useNavigate();
  const [squadSelecionado, setSquadSelecionado] = useState<string | null>(null);
  const [notas, setNotas] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState("");
  const [decisao, setDecisao] = useState<"aprovado" | "reprovado" | null>(null);
  const [enviado, setEnviado] = useState(false);

  const projeto = squads.find((s) => s.id === squadSelecionado);

  const media = Object.values(notas).length
    ? (Object.values(notas).reduce((a, b) => a + b, 0) / Object.values(notas).length).toFixed(1)
    : "–";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!decisao || !feedback.trim()) return;
    setEnviado(true);
    setTimeout(() => {
      setSquadSelecionado(null);
      setNotas({});
      setFeedback("");
      setDecisao(null);
      setEnviado(false);
    }, 2500);
  };

  const pendentes = squads.filter((s) => s.pendente).length;

  return (
    <Layout role="professor">
      <PageHeader
        title="Avaliar Projetos"
        subtitle={squadSelecionado ? `Avaliando: ${projeto?.nome}` : "Selecione um squad para iniciar a avaliação"}
      />
      <Breadcrumb
        items={[
          { label: "Dashboard", path: "/professor" },
          { label: "Avaliar Projetos", path: !squadSelecionado ? undefined : "/professor/avaliar/4" },
          ...(squadSelecionado && projeto ? [{ label: projeto.nome }] : []),
        ]}
      />

      <div className="flex-1 overflow-y-auto px-[32px] py-[20px] flex flex-col gap-[20px]">

        {/* ── Lista de squads ── */}
        {!squadSelecionado && (
          <>
            {/* Resumo */}
            <div className="grid grid-cols-3 gap-[12px]">
              <Card className="p-[16px] flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#FDE8C8] flex items-center justify-center shrink-0">
                  <Users size={18} className="text-[#F38305]" />
                </div>
                <div>
                  <p className="text-[22px] font-bold text-[#1A1A2E]">{squads.length}</p>
                  <p className="text-[11px] text-[#4A4A6A]">Squads cadastrados</p>
                </div>
              </Card>
              <Card className="p-[16px] flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#FDE8C8] flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-[#F38305]" />
                </div>
                <div>
                  <p className="text-[22px] font-bold text-[#F38305]">{pendentes}</p>
                  <p className="text-[11px] text-[#4A4A6A]">Pendentes de avaliação</p>
                </div>
              </Card>
              <Card className="p-[16px] flex items-center gap-[12px]">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#dcfce7] flex items-center justify-center shrink-0">
                  <CheckCircle size={18} className="text-[#008236]" />
                </div>
                <div>
                  <p className="text-[22px] font-bold text-[#008236]">{squads.length - pendentes}</p>
                  <p className="text-[11px] text-[#4A4A6A]">Já avaliados</p>
                </div>
              </Card>
            </div>

            {/* Squads pendentes */}
            {squads.filter((s) => s.pendente).length > 0 && (
              <div>
                <p className="text-[13px] font-semibold text-[#1A1A2E] mb-[10px] flex items-center gap-[6px]">
                  <Clock size={14} className="text-[#F38305]" /> Aguardando avaliação
                </p>
                <div className="flex flex-col gap-[10px]">
                  {squads.filter((s) => s.pendente).map((s) => (
                    <SquadCard key={s.id} squad={s} onSelect={() => setSquadSelecionado(s.id)} />
                  ))}
                </div>
              </div>
            )}

            {/* Outros squads */}
            <div>
              <p className="text-[13px] font-semibold text-[#1A1A2E] mb-[10px] flex items-center gap-[6px]">
                <Users size={14} className="text-[#4A4A6A]" /> Todos os squads
              </p>
              <div className="flex flex-col gap-[10px]">
                {squads.filter((s) => !s.pendente).map((s) => (
                  <SquadCard key={s.id} squad={s} onSelect={() => setSquadSelecionado(s.id)} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── Formulário de avaliação ── */}
        {squadSelecionado && projeto && (
          <>
            <button
              onClick={() => { setSquadSelecionado(null); setNotas({}); setFeedback(""); setDecisao(null); setEnviado(false); }}
              className="flex items-center gap-[6px] text-[13px] text-[#4A4A6A] hover:text-[#F38305] transition-colors w-fit"
            >
              <ArrowLeft size={14} /> Voltar para squads
            </button>

            {enviado && (
              <div className={`rounded-[12px] p-[14px] flex items-center gap-[10px] border ${
                decisao === "aprovado" ? "bg-[#f0fdf4] border-[#b9f8cf]" : "bg-[#FDE8C8] border-[#fca5a5]"
              }`}>
                {decisao === "aprovado"
                  ? <CheckCircle size={16} className="text-[#008236] shrink-0" />
                  : <XCircle size={16} className="text-[#dc2626] shrink-0" />}
                <p className={`text-[13px] font-medium ${decisao === "aprovado" ? "text-[#008236]" : "text-[#dc2626]"}`}>
                  Avaliação enviada! Squad {projeto.nome} notificado.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-[20px]">
              {/* Coluna info */}
              <div className="flex flex-col gap-[14px]">
                <Card className="p-[20px]">
                  <div className="flex items-start justify-between mb-[10px]">
                    <div>
                      <p className="font-semibold text-[15px] text-[#1A1A2E]">{projeto.projeto}</p>
                      <p className="text-[12px] text-[#4A4A6A] mt-[2px]">{projeto.nome}</p>
                    </div>
                    <Tag label={projeto.etapa} color={projeto.etapaColor} />
                  </div>
                  <p className="text-[12px] text-[#4A4A6A] leading-[17px] mb-[10px]">{projeto.descricao}</p>
                  <div className="flex flex-wrap gap-[4px] mb-[12px]">
                    {projeto.tags.map((t) => <Tag key={t} label={t} />)}
                  </div>
                  <div className="flex items-center justify-between mb-[4px]">
                    <span className="text-[11px] text-[#4A4A6A]">Progresso</span>
                    <span className="text-[11px] font-medium text-[#1A1A2E]">{projeto.progresso}%</span>
                  </div>
                  <div className="bg-[#F4F6FA] rounded-full h-[5px] overflow-hidden">
                    <div className="bg-[#F38305] h-full rounded-full" style={{ width: `${projeto.progresso}%` }} />
                  </div>
                </Card>

                <Card className="p-[20px]">
                  <p className="font-semibold text-[13px] text-[#1A1A2E] mb-[10px] flex items-center gap-[6px]">
                    <Users size={13} /> Membros do squad
                  </p>
                  <div className="flex flex-col gap-[7px]">
                    {projeto.alunos.map((a) => (
                      <div key={a} className="flex items-center gap-[8px]">
                        <div className="w-[28px] h-[28px] rounded-full bg-[#D6E8FF] flex items-center justify-center shrink-0 text-[11px] font-bold text-[#044482]">
                          {a.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <span className="text-[12px] text-[#1A1A2E]">{a}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-[20px]">
                  <p className="font-semibold text-[13px] text-[#1A1A2E] mb-[10px] flex items-center gap-[6px]">
                    <FileText size={13} /> Entregas
                  </p>
                  <div className="flex flex-col gap-[7px]">
                    {projeto.entregas.map((e) => (
                      <div key={e.label} className="flex items-center gap-[7px]">
                        {e.feito
                          ? <CheckCircle size={13} className="text-[#008236] shrink-0" />
                          : <div className="w-[13px] h-[13px] rounded-full border-2 border-[#d1d5db] shrink-0" />}
                        <span className={`text-[12px] ${e.feito ? "text-[#1A1A2E]" : "text-[#9ca3af]"}`}>{e.label}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-[16px]">
                  <p className="text-[12px] text-[#4A4A6A]">
                    <span className="font-medium text-[#1A1A2E]">Objetivo: </span>{projeto.objetivo}
                  </p>
                  <p className="text-[12px] text-[#4A4A6A] mt-[6px]">
                    <span className="font-medium text-[#1A1A2E]">Tecnologias: </span>{projeto.tecnologias}
                  </p>
                </Card>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="xl:col-span-2 flex flex-col gap-[16px]">
                <Card className="p-[24px]">
                  <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[4px] flex items-center gap-[8px]">
                    <Star size={15} className="text-[#f59e0b]" /> Critérios de avaliação
                  </p>
                  <p className="text-[12px] text-[#4A4A6A] mb-[20px]">Atribua uma nota de 1 a 10 para cada critério.</p>
                  <div className="flex flex-col gap-[16px]">
                    {criterios.map((c) => (
                      <div key={c.id}>
                        <div className="flex items-start justify-between mb-[8px]">
                          <div>
                            <p className="text-[13px] font-medium text-[#1A1A2E]">{c.label}</p>
                            <p className="text-[11px] text-[#4A4A6A]">{c.desc}</p>
                          </div>
                          <span className={`text-[16px] font-bold ml-[16px] shrink-0 ${notas[c.id] ? "text-[#F38305]" : "text-[#d1d5db]"}`}>
                            {notas[c.id] ?? "–"}
                          </span>
                        </div>
                        <div className="flex gap-[5px]">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <button key={n} type="button"
                              onClick={() => setNotas((prev) => ({ ...prev, [c.id]: n }))}
                              className={`flex-1 h-[30px] rounded-[6px] text-[12px] font-medium transition-colors border ${
                                notas[c.id] === n
                                  ? n >= 8 ? "bg-[#008236] text-white border-[#008236]"
                                    : n >= 6 ? "bg-[#F38305] text-white border-[#F38305]"
                                    : "bg-[#f54900] text-white border-[#f54900]"
                                  : "bg-white text-[#4A4A6A] border-[#e5e7eb] hover:border-[#F38305]"
                              }`}
                            >{n}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {Object.keys(notas).length > 0 && (
                    <div className="mt-[16px] p-[12px] bg-[#f9fafb] rounded-[10px] flex items-center justify-between">
                      <span className="text-[13px] font-medium text-[#1A1A2E]">Média geral</span>
                      <span className={`text-[20px] font-bold ${parseFloat(media) >= 7 ? "text-[#008236]" : parseFloat(media) >= 5 ? "text-[#F38305]" : "text-[#f54900]"}`}>
                        {media}
                      </span>
                    </div>
                  )}
                </Card>

                <Card className="p-[24px]">
                  <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[12px] flex items-center gap-[8px]">
                    <MessageSquare size={15} /> Feedback ao squad
                  </p>
                  <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4}
                    placeholder="Escreva um feedback detalhado: pontos fortes, pontos de melhoria e orientações para os próximos passos..."
                    className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] placeholder:text-[#9ca3af] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition resize-none" />
                </Card>

                <Card className="p-[20px]">
                  <p className="font-semibold text-[14px] text-[#1A1A2E] mb-[12px]">Decisão final</p>
                  <div className="flex gap-[10px]">
                    <button type="button" onClick={() => setDecisao("aprovado")}
                      className={`flex-1 h-[46px] rounded-[10px] border-2 text-[13px] font-semibold flex items-center justify-center gap-[7px] transition-all ${
                        decisao === "aprovado" ? "bg-[#f0fdf4] border-[#008236] text-[#008236]" : "bg-white border-[#e5e7eb] text-[#4A4A6A] hover:border-[#008236]"
                      }`}>
                      <CheckCircle size={16} /> Aprovar projeto
                    </button>
                    <button type="button" onClick={() => setDecisao("reprovado")}
                      className={`flex-1 h-[46px] rounded-[10px] border-2 text-[13px] font-semibold flex items-center justify-center gap-[7px] transition-all ${
                        decisao === "reprovado" ? "bg-[#fee2e2] border-[#dc2626] text-[#dc2626]" : "bg-white border-[#e5e7eb] text-[#4A4A6A] hover:border-[#dc2626]"
                      }`}>
                      <XCircle size={16} /> Reprovar / Revisão
                    </button>
                  </div>
                </Card>

                <div className="flex justify-end pb-[24px]">
                  <button type="submit"
                    disabled={!decisao || !feedback.trim() || Object.keys(notas).length < criterios.length}
                    className="bg-[#F38305] text-white text-[13px] font-medium px-[28px] h-[38px] rounded-[8px] hover:bg-[#F9A94B] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                    Enviar avaliação
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

function SquadCard({ squad, onSelect }: { squad: typeof squads[0]; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.08)] p-[18px] flex items-center gap-[16px] text-left hover:border-[#F38305] hover:shadow-sm transition-all group w-full"
    >
      {/* Avatar do squad */}
      <div className="w-[44px] h-[44px] rounded-[10px] bg-[#D6E8FF] flex items-center justify-center shrink-0">
        <Users size={20} className="text-[#044482]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[8px] mb-[2px]">
          <p className="font-semibold text-[14px] text-[#1A1A2E]">{squad.nome}</p>
          <Tag label={squad.etapa} color={squad.etapaColor} />
          {squad.pendente && (
            <span className="bg-[#FDE8C8] text-[#F38305] text-[10px] font-semibold px-[8px] py-[2px] rounded-full">
              Pendente
            </span>
          )}
        </div>
        <p className="text-[12px] text-[#4A4A6A] truncate">{squad.projeto}</p>
        <div className="flex items-center gap-[12px] mt-[6px]">
          <span className="text-[11px] text-[#4A4A6A] flex items-center gap-[4px]">
            <Users size={11} /> {squad.alunos.length} alunos
          </span>
          <div className="flex items-center gap-[6px]">
            <div className="w-[60px] h-[4px] bg-[#e5e7eb] rounded-full overflow-hidden">
              <div className="h-full bg-[#F38305] rounded-full" style={{ width: `${squad.progresso}%` }} />
            </div>
            <span className="text-[11px] text-[#4A4A6A]">{squad.progresso}%</span>
          </div>
          <div className="flex flex-wrap gap-[4px]">
            {squad.tags.slice(0, 2).map((t) => <Tag key={t} label={t} />)}
          </div>
        </div>
      </div>

      <ChevronRight size={16} className="text-[#d1d5db] group-hover:text-[#F38305] transition-colors shrink-0" />
    </button>
  );
}
