import { useNavigate } from "react-router";
import { Layout, PageHeader, Card, Tag } from "../components/Layout";
import { Users, FolderOpen, TrendingUp, AlertTriangle, Plus, BarChart2, CheckCircle, Clock } from "lucide-react";

const turmas = [
  { id: 1, nome: "TDS-2025-A", campus: "Campus Pernambuco", professor: "Prof. Ana Silva", alunos: 18, projetos: 14, inativos: 2 },
  { id: 2, nome: "TDS-2025-B", campus: "Campus Campinas", professor: "Prof. Carlos Mendes", alunos: 22, projetos: 19, inativos: 1 },
  { id: 3, nome: "TDS-2025-C", campus: "Campus Sorocaba", professor: "Profa. Marina Costa", alunos: 20, projetos: 16, inativos: 4 },
  { id: 4, nome: "TI-2025-A", campus: "Campus Pernambuco", professor: "Prof. Roberto Lima", alunos: 25, projetos: 21, inativos: 0 },
];

const projetos = [
  { nome: "EduTech - Gamificação", aluno: "Ana Costa", turma: "TDS-2025-A", etapa: "Em validação", status: "review" },
  { nome: "SmartCity Dashboard", aluno: "Lucas Ferreira", turma: "TDS-2025-B", etapa: "Desincubado", status: "ok" },
  { nome: "EcoApp", aluno: "João Silva", turma: "TDS-2025-A", etapa: "Pré-incubação", status: "warning" },
  { nome: "MedConnect", aluno: "Maria Oliveira", turma: "TI-2025-A", etapa: "Incubação ativa", status: "ok" },
  { nome: "FoodShare", aluno: "Pedro Rocha", turma: "TDS-2025-B", etapa: "Incubação ativa", status: "warning" },
];

const etapaCount = [
  { label: "Pré-incubação", count: 8, color: "bg-[#FDE8C8]", textColor: "text-[#1447e6]" },
  { label: "Incubação ativa", count: 18, color: "bg-[#dcfce7]", textColor: "text-[#008236]" },
  { label: "Em validação", count: 5, color: "bg-[#f3e8ff]", textColor: "text-[#8200db]" },
  { label: "Desincubado", count: 3, color: "bg-[#F4F6FA]", textColor: "text-[#4A4A6A]" },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  ok: { label: "Em dia", color: "bg-[#dcfce7] text-[#008236]" },
  warning: { label: "Atenção", color: "bg-[#fff7ed] text-[#f54900]" },
  review: { label: "Para avaliar", color: "bg-[#FDE8C8] text-[#1447e6]" },
};

export function CoordenadorDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Turmas ativas", value: "4", icon: Users, color: "bg-[#FDE8C8] text-[#F38305]" },
    { label: "Total de projetos", value: "34", icon: FolderOpen, color: "bg-[#f0fdf4] text-[#008236]" },
    { label: "Projetos inativos", value: "7", icon: AlertTriangle, color: "bg-[#fff7ed] text-[#f54900]" },
    { label: "Taxa de conclusão", value: "78%", icon: TrendingUp, color: "bg-[#f3e8ff] text-[#8200db]" },
  ];

  return (
    <Layout role="coordenador">
      <PageHeader
        title="Painel do Coordenador"
        subtitle="Visão geral de todas as turmas e projetos"
        action={
          <button
            onClick={() => navigate("/coordenador/publicar-formulario")}
            className="bg-[#8200db] text-white text-[13px] font-medium px-[16px] h-[34px] rounded-[8px] flex items-center gap-[6px] hover:opacity-90 transition-opacity"
          >
            <Plus size={15} /> Publicar formulário
          </button>
        }
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

        {/* Pipeline + turmas */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[24px]">
          <div className="xl:col-span-2 flex flex-col gap-[16px]">
            {/* Pipeline */}
            <Card className="p-[24px]">
              <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[16px] flex items-center gap-[8px]"><BarChart2 size={16} className="text-[#8200db]" />Pipeline geral de projetos</p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px]">
                {etapaCount.map((e) => (
                  <div key={e.label} className={`${e.color} rounded-[10px] p-[14px]`}>
                    <p className={`text-[24px] font-bold ${e.textColor}`}>{e.count}</p>
                    <p className={`text-[12px] font-medium mt-[2px] ${e.textColor}`}>{e.label}</p>
                  </div>
                ))}
              </div>
              {/* Visual bar */}
              <div className="mt-[16px] flex rounded-full overflow-hidden h-[8px]">
                <div className="bg-[#bfdbfe]" style={{ width: "24%" }} />
                <div className="bg-[#86efac]" style={{ width: "53%" }} />
                <div className="bg-[#d8b4fe]" style={{ width: "15%" }} />
                <div className="bg-[#e5e7eb]" style={{ width: "8%" }} />
              </div>
              <div className="flex items-center gap-[16px] mt-[8px] flex-wrap">
                {etapaCount.map((e) => (
                  <span key={e.label} className={`text-[11px] font-medium ${e.textColor}`}>● {e.label}</span>
                ))}
              </div>
            </Card>

            {/* Projects table */}
            <Card className="p-[24px]">
              <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[14px]">Projetos recentes</p>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#F4F6FA]">
                      {["Projeto", "Aluno", "Turma", "Etapa", "Status"].map((h) => (
                        <th key={h} className="text-left text-[11px] font-medium text-[#4A4A6A] pb-[10px] pr-[16px] whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {projetos.map((p, i) => (
                      <tr key={i} className="border-b border-[#f9fafb] last:border-0 hover:bg-[#f9fafb] transition-colors">
                        <td className="py-[10px] pr-[16px]"><p className="text-[13px] font-medium text-[#1A1A2E] whitespace-nowrap">{p.nome}</p></td>
                        <td className="py-[10px] pr-[16px]"><p className="text-[12px] text-[#4A4A6A] whitespace-nowrap">{p.aluno}</p></td>
                        <td className="py-[10px] pr-[16px]"><span className="text-[11px] font-medium text-[#4A4A6A] bg-[#F4F6FA] px-[7px] py-[2px] rounded-[6px]">{p.turma}</span></td>
                        <td className="py-[10px] pr-[16px]"><Tag label={p.etapa} /></td>
                        <td className="py-[10px]">
                          <span className={`inline-flex items-center px-[8px] py-[2px] rounded-[6px] text-[11px] font-medium ${statusConfig[p.status].color}`}>
                            {statusConfig[p.status].label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Turmas */}
          <div>
            <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[14px]">Turmas ativas</p>
            <div className="flex flex-col gap-[12px]">
              {turmas.map((t) => (
                <Card key={t.id} className="p-[18px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[14px] text-[#1A1A2E]">{t.nome}</p>
                      <p className="text-[11px] text-[#4A4A6A] mt-[2px]">{t.campus}</p>
                      <p className="text-[11px] text-[#4A4A6A] mt-[1px]">{t.professor}</p>
                    </div>
                    {t.inativos > 0 && (
                      <span className="inline-flex items-center gap-[3px] bg-[#FDE8C8] text-[#dc2626] text-[10px] font-medium px-[6px] py-[2px] rounded-[6px]">
                        <AlertTriangle size={10} />{t.inativos} inativos
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-[14px] mt-[10px] text-[11px] text-[#4A4A6A]">
                    <span className="flex items-center gap-[4px]"><Users size={12} />{t.alunos} alunos</span>
                    <span className="flex items-center gap-[4px]"><FolderOpen size={12} />{t.projetos} projetos</span>
                    <span className="flex items-center gap-[4px]">
                      {t.inativos === 0 ? <CheckCircle size={12} className="text-[#008236]" /> : <Clock size={12} />}
                      {Math.round((t.projetos / t.alunos) * 100)}% ativos
                    </span>
                  </div>
                  <div className="mt-[8px] bg-[#F4F6FA] rounded-full h-[5px] overflow-hidden">
                    <div className="bg-[#8200db] h-full rounded-full" style={{ width: `${(t.projetos / t.alunos) * 100}%` }} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
