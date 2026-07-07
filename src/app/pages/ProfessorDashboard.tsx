import { useNavigate } from "react-router";
import { Layout, PageHeader, Card, Tag } from "../components/Layout";
import { Users, CheckCircle, Clock, AlertTriangle, TrendingUp, BookOpen, Star } from "lucide-react";

const projetos = [
  { id: "1", nome: "EcoApp - Sustentabilidade Urbana", aluno: "João Silva", etapa: "Pré-incubação", status: "pending", tags: ["Mobile", "IoT"], progresso: 25, ultimaAtt: "25 dias atrás" },
  { id: "2", nome: "MedConnect - Telemedicina", aluno: "Maria Oliveira", etapa: "Incubação ativa", status: "ok", tags: ["Saúde", "IA"], progresso: 72, ultimaAtt: "2 dias atrás" },
  { id: "3", nome: "FoodShare", aluno: "Pedro Rocha", etapa: "Incubação ativa", status: "warning", tags: ["Social", "Mobile"], progresso: 48, ultimaAtt: "12 dias atrás" },
  { id: "4", nome: "EduTech - Gamificação", aluno: "Ana Costa", etapa: "Em validação", status: "review", tags: ["Educação"], progresso: 90, ultimaAtt: "1 dia atrás" },
];

const turmas = [
  { nome: "Turma TDS-2025-A", alunos: 18, ativos: 14, campus: "Campus Pernambuco" },
  { nome: "Turma TDS-2025-B", alunos: 22, ativos: 19, campus: "Campus Campinas" },
];

const reunioes = [
  { aluno: "João Silva", projeto: "EcoApp", data: "Hoje, 14:00", tipo: "Online", status: "pendente" },
  { aluno: "Ana Costa", projeto: "EduTech", data: "Amanhã, 10:00", tipo: "Presencial", status: "confirmado" },
  { aluno: "Maria Oliveira", projeto: "MedConnect", data: "19/04, 16:00", tipo: "Online", status: "confirmado" },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  ok: { label: "Em dia", color: "bg-[#dcfce7] text-[#008236]", icon: <CheckCircle size={13} /> },
  pending: { label: "Inativo", color: "bg-[#FDE8C8] text-[#dc2626]", icon: <AlertTriangle size={13} /> },
  warning: { label: "Atenção", color: "bg-[#fff7ed] text-[#f54900]", icon: <Clock size={13} /> },
  review: { label: "Para avaliar", color: "bg-[#FDE8C8] text-[#1447e6]", icon: <Star size={13} /> },
};

export function ProfessorDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Projetos orientados", value: "4", icon: BookOpen, color: "bg-[#FDE8C8] text-[#F38305]" },
    { label: "Alunos ativos", value: "40", icon: Users, color: "bg-[#f0fdf4] text-[#008236]" },
    { label: "Para avaliar", value: "1", icon: Star, color: "bg-[#fef9c3] text-[#ca8a04]" },
    { label: "Reuniões esta semana", value: "3", icon: Clock, color: "bg-[#f3e8ff] text-[#8200db]" },
  ];

  return (
    <Layout role="professor">
      <PageHeader
        title="Dashboard do Professor"
        subtitle="Bem-vindo(a), Prof! Gerencie e acompanhe os projetos dos alunos."
  
      />

      <div className="flex-1 overflow-y-auto px-[32px] py-[24px] flex flex-col gap-[24px]">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[14px]">
          {stats.map((s) => (
            <Card key={s.label} className="p-[20px]">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] text-[#4A4A6A] leading-tight">{s.label}</p>
                  <p className="font-bold text-[28px] text-[#1A1A2E] mt-[4px]">{s.value}</p>
                </div>
                <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center ${s.color}`}>
                  <s.icon size={20} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[24px]">
          {/* Projects list */}
          <div className="xl:col-span-2 flex flex-col gap-[14px]">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[15px] text-[#1A1A2E]">Projetos sob orientação</p>
              <span className="text-[12px] text-[#4A4A6A]">{projetos.length} projetos</span>
            </div>
            {projetos.map((p) => {
              const st = statusConfig[p.status];
              return (
                <Card key={p.id} className="p-[20px]">
                  <div className="flex items-start justify-between gap-[12px]">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-[8px] flex-wrap">
                        <p className="font-semibold text-[14px] text-[#1A1A2E]">{p.nome}</p>
                        <span className={`inline-flex items-center gap-[4px] px-[8px] py-[2px] rounded-[6px] text-[11px] font-medium ${st.color}`}>
                          {st.icon}{st.label}
                        </span>
                      </div>
                      <p className="text-[12px] text-[#4A4A6A] mt-[2px]">Aluno: {p.aluno} · Última atualização: {p.ultimaAtt}</p>
                      <div className="flex flex-wrap gap-[4px] mt-[8px]">
                        <Tag label={p.etapa} color="blue" />
                        {p.tags.map((t) => <Tag key={t} label={t} />)}
                      </div>
                      {/* progress bar */}
                      <div className="mt-[10px]">
                        <div className="flex items-center justify-between mb-[4px]">
                          <span className="text-[11px] text-[#4A4A6A]">Progresso geral</span>
                          <span className="text-[11px] font-medium text-[#1A1A2E]">{p.progresso}%</span>
                        </div>
                        <div className="bg-[#F4F6FA] rounded-full h-[6px] overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${p.progresso}%`, background: p.progresso >= 80 ? "#008236" : p.progresso >= 50 ? "#F38305" : "#f54900" }}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/professor/avaliar/${p.id}`)}
                      className={`shrink-0 text-[12px] font-medium h-[32px] px-[14px] rounded-[8px] transition-colors ${
                        p.status === "review"
                          ? "bg-[#F38305] text-white hover:bg-[#F9A94B]"
                          : "border border-[rgba(0,0,0,0.1)] text-[#4A4A6A] hover:bg-[#F4F6FA]"
                      }`}
                    >
                      {p.status === "review" ? "Avaliar agora" : "Ver detalhes"}
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-[16px]">
            {/* Reuniões */}
            <Card className="p-[20px]">
              <p className="font-semibold text-[14px] text-[#1A1A2E] mb-[14px]">Próximas reuniões</p>
              <div className="flex flex-col gap-[10px]">
                {reunioes.map((r, i) => (
                  <div key={i} className="flex items-start gap-[10px]">
                    <div className={`w-[8px] h-[8px] rounded-full mt-[5px] shrink-0 ${r.status === "confirmado" ? "bg-[#008236]" : "bg-[#f54900]"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-[#1A1A2E]">{r.aluno}</p>
                      <p className="text-[11px] text-[#4A4A6A]">{r.projeto}</p>
                      <p className="text-[11px] text-[#4A4A6A] mt-[2px]">{r.data} · {r.tipo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Turmas */}
            <Card className="p-[20px]">
              <p className="font-semibold text-[14px] text-[#1A1A2E] mb-[14px]">Minhas turmas</p>
              <div className="flex flex-col gap-[10px]">
                {turmas.map((t) => (
                  <div key={t.nome} className="border border-[rgba(0,0,0,0.08)] rounded-[10px] p-[12px]">
                    <p className="font-medium text-[13px] text-[#1A1A2E]">{t.nome}</p>
                    <p className="text-[11px] text-[#4A4A6A] mt-[2px]">{t.campus}</p>
                    <div className="flex items-center gap-[12px] mt-[8px] text-[11px] text-[#4A4A6A]">
                      <span className="flex items-center gap-[4px]"><Users size={12} />{t.alunos} alunos</span>
                      <span className="flex items-center gap-[4px]"><TrendingUp size={12} />{t.ativos} ativos</span>
                    </div>
                    <div className="mt-[8px] bg-[#F4F6FA] rounded-full h-[5px] overflow-hidden">
                      <div className="bg-[#008236] h-full rounded-full" style={{ width: `${(t.ativos / t.alunos) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
