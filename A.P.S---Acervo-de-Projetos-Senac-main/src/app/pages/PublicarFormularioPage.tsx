import { useState } from "react";
import { useNavigate } from "react-router";
import { Layout, PageHeader, Breadcrumb, Card } from "../components/Layout";
import { Plus, Trash2, CheckCircle, GripVertical, FileText, Eye } from "lucide-react";

type TipoCampo = "texto" | "textarea" | "select" | "checkbox" | "arquivo";

interface Campo {
  id: string;
  tipo: TipoCampo;
  label: string;
  obrigatorio: boolean;
  opcoes?: string;
}

const camposIniciais: Campo[] = [
  { id: "1", tipo: "texto", label: "Nome do projeto", obrigatorio: true },
  { id: "2", tipo: "textarea", label: "Descrição do projeto (máx. 300 palavras)", obrigatorio: true },
  { id: "3", tipo: "select", label: "Área temática", obrigatorio: true, opcoes: "Sustentabilidade,Saúde,Educação,Tecnologia,Social,Finanças" },
  { id: "4", tipo: "texto", label: "Tecnologias utilizadas", obrigatorio: false },
  { id: "5", tipo: "arquivo", label: "Pitch inicial (PDF)", obrigatorio: true },
];

const tiposDisponiveis: { tipo: TipoCampo; label: string; icon: string }[] = [
  { tipo: "texto", label: "Texto curto", icon: "T" },
  { tipo: "textarea", label: "Texto longo", icon: "¶" },
  { tipo: "select", label: "Seleção", icon: "≡" },
  { tipo: "checkbox", label: "Caixas de seleção", icon: "☑" },
  { tipo: "arquivo", label: "Upload de arquivo", icon: "↑" },
];

const turmas = ["TDS-2025-A", "TDS-2025-B", "TDS-2025-C", "TI-2025-A"];

export function PublicarFormularioPage() {
  const navigate = useNavigate();
  const [campos, setCampos] = useState<Campo[]>(camposIniciais);
  const [titulo, setTitulo] = useState("Formulário de Inscrição — PI 2025.1");
  const [descricao, setDescricao] = useState("Preencha todas as informações do seu Projeto Integrador para iniciar o processo de incubação.");
  const [prazo, setPrazo] = useState("2025-04-30");
  const [turmasSelecionadas, setTurmasSelecionadas] = useState<string[]>(["TDS-2025-A", "TDS-2025-B"]);
  const [publicado, setPublicado] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const addCampo = (tipo: TipoCampo) => {
    setCampos((prev) => [
      ...prev,
      { id: String(Date.now()), tipo, label: `Novo campo (${tipo})`, obrigatorio: false },
    ]);
  };

  const removeCampo = (id: string) => setCampos((prev) => prev.filter((c) => c.id !== id));

  const updateCampo = (id: string, field: keyof Campo, value: string | boolean) => {
    setCampos((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const toggleTurma = (t: string) => {
    setTurmasSelecionadas((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handlePublicar = (e: React.FormEvent) => {
    e.preventDefault();
    setPublicado(true);
    setTimeout(() => navigate("/coordenador"), 2500);
  };

  return (
    <Layout role="coordenador">
      <PageHeader
        title="Publicar Formulário"
        subtitle="Crie o formulário de inscrição para os Projetos Integradores"
        action={
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="border border-[rgba(0,0,0,0.1)] text-[13px] font-medium px-[14px] h-[34px] rounded-[8px] flex items-center gap-[6px] text-[#4A4A6A] hover:bg-[#F4F6FA] transition-colors"
          >
            <Eye size={15} /> {previewMode ? "Editar" : "Pré-visualizar"}
          </button>
        }
      />
      <Breadcrumb items={[{ label: "Dashboard", path: "/coordenador" }, { label: "Publicar Formulário" }]} />

      <div className="flex-1 overflow-y-auto px-[32px] py-[20px] flex flex-col gap-[20px]">
        {publicado && (
          <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-[12px] p-[16px] flex items-center gap-[10px]">
            <CheckCircle size={18} className="text-[#008236] shrink-0" />
            <p className="text-[13px] font-medium text-[#008236]">Formulário publicado com sucesso! Alunos notificados por e-mail.</p>
          </div>
        )}

        {previewMode ? (
          /* Preview mode */
          <Card className="p-[32px] max-w-[640px] mx-auto w-full">
            <div className="mb-[24px]">
              <div className="bg-[#8200db] rounded-[10px] w-[40px] h-[40px] flex items-center justify-center mb-[14px]">
                <FileText size={20} className="text-white" />
              </div>
              <h2 className="font-bold text-[20px] text-[#1A1A2E]">{titulo}</h2>
              <p className="text-[13px] text-[#4A4A6A] mt-[6px] leading-[18px]">{descricao}</p>
              <p className="text-[12px] text-[#4A4A6A] mt-[4px]">Prazo: {prazo}</p>
            </div>
            <div className="flex flex-col gap-[16px]">
              {campos.map((c) => (
                <div key={c.id}>
                  <label className="block text-[13px] font-medium text-[#1A1A2E] mb-[6px]">
                    {c.label}{c.obrigatorio && <span className="text-[#f54900] ml-[2px]">*</span>}
                  </label>
                  {c.tipo === "texto" && <input disabled placeholder={`Digite ${c.label.toLowerCase()}...`} className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] bg-[#f9fafb] cursor-not-allowed" />}
                  {c.tipo === "textarea" && <textarea disabled rows={3} placeholder="Digite aqui..." className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] bg-[#f9fafb] cursor-not-allowed resize-none" />}
                  {c.tipo === "select" && (
                    <select disabled className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] bg-[#f9fafb] cursor-not-allowed">
                      <option>Selecione uma opção...</option>
                      {c.opcoes?.split(",").map((o) => <option key={o}>{o}</option>)}
                    </select>
                  )}
                  {c.tipo === "arquivo" && (
                    <div className="border-2 border-dashed border-[#d1d5db] rounded-[8px] p-[24px] text-center bg-[#f9fafb]">
                      <p className="text-[12px] text-[#4A4A6A]">Clique para selecionar ou arraste o arquivo</p>
                    </div>
                  )}
                  {c.tipo === "checkbox" && (
                    <div className="flex flex-col gap-[6px]">
                      {(c.opcoes || "Opção 1,Opção 2").split(",").map((o) => (
                        <label key={o} className="flex items-center gap-[8px] text-[13px] text-[#1A1A2E]">
                          <input type="checkbox" disabled className="rounded" /> {o}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <button disabled className="w-full bg-[#8200db] text-white text-[14px] font-medium py-[11px] rounded-[8px] opacity-60 cursor-not-allowed mt-[8px]">
                Enviar inscrição
              </button>
            </div>
          </Card>
        ) : (
          <form onSubmit={handlePublicar} className="flex flex-col gap-[20px]">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-[20px]">
              {/* Builder */}
              <div className="xl:col-span-2 flex flex-col gap-[16px]">
                {/* Meta */}
                <Card className="p-[24px]">
                  <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[14px]">Informações do formulário</p>
                  <div className="flex flex-col gap-[12px]">
                    <div>
                      <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Título *</label>
                      <input value={titulo} onChange={(e) => setTitulo(e.target.value)}
                        className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] text-[#1A1A2E] outline-none focus:border-[#8200db] focus:ring-2 focus:ring-[#8200db]/20 transition" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Descrição</label>
                      <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={2}
                        className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] text-[#1A1A2E] outline-none focus:border-[#8200db] focus:ring-2 focus:ring-[#8200db]/20 transition resize-none" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-[#1A1A2E] mb-[5px]">Prazo de inscrição *</label>
                      <input type="date" value={prazo} onChange={(e) => setPrazo(e.target.value)}
                        className="border border-[#d1d5db] rounded-[8px] px-[12px] py-[9px] text-[13px] text-[#1A1A2E] outline-none focus:border-[#8200db] focus:ring-2 focus:ring-[#8200db]/20 transition" />
                    </div>
                  </div>
                </Card>

                {/* Fields */}
                <Card className="p-[24px]">
                  <p className="font-semibold text-[15px] text-[#1A1A2E] mb-[14px]">Campos do formulário</p>
                  <div className="flex flex-col gap-[8px]">
                    {campos.map((c) => (
                      <div key={c.id} className="border border-[rgba(0,0,0,0.08)] rounded-[10px] p-[14px] flex items-start gap-[10px] bg-[#fafafa]">
                        <GripVertical size={16} className="text-[#c4c9d4] mt-[1px] shrink-0 cursor-grab" />
                        <div className="flex-1 min-w-0 flex flex-col gap-[8px]">
                          <input
                            value={c.label}
                            onChange={(e) => updateCampo(c.id, "label", e.target.value)}
                            className="w-full border border-[#e5e7eb] rounded-[6px] px-[10px] py-[6px] text-[13px] text-[#1A1A2E] outline-none focus:border-[#8200db] transition bg-white"
                          />
                          <div className="flex items-center gap-[12px]">
                            <span className="inline-flex items-center px-[7px] py-[2px] rounded-[6px] text-[11px] font-medium bg-[#F4F6FA] text-[#4A4A6A]">{c.tipo}</span>
                            <label className="flex items-center gap-[5px] text-[12px] text-[#4A4A6A] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={c.obrigatorio}
                                onChange={(e) => updateCampo(c.id, "obrigatorio", e.target.checked)}
                                className="rounded"
                              />
                              Obrigatório
                            </label>
                            {(c.tipo === "select" || c.tipo === "checkbox") && (
                              <input
                                value={c.opcoes ?? ""}
                                onChange={(e) => updateCampo(c.id, "opcoes", e.target.value)}
                                placeholder="Opções separadas por vírgula"
                                className="flex-1 min-w-0 border border-[#e5e7eb] rounded-[6px] px-[8px] py-[5px] text-[11px] outline-none focus:border-[#8200db] transition bg-white"
                              />
                            )}
                          </div>
                        </div>
                        <button type="button" onClick={() => removeCampo(c.id)}
                          className="text-[#c4c9d4] hover:text-[#f54900] transition-colors shrink-0 mt-[1px]">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add field */}
                  <div className="mt-[12px]">
                    <p className="text-[12px] font-medium text-[#1A1A2E] mb-[8px]">Adicionar campo</p>
                    <div className="flex flex-wrap gap-[6px]">
                      {tiposDisponiveis.map((t) => (
                        <button key={t.tipo} type="button" onClick={() => addCampo(t.tipo)}
                          className="flex items-center gap-[6px] border border-dashed border-[#8200db] text-[#8200db] text-[12px] font-medium px-[10px] h-[30px] rounded-[8px] hover:bg-[#f3e8ff] transition-colors">
                          <Plus size={12} /> {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar: turmas + publish */}
              <div className="flex flex-col gap-[16px]">
                <Card className="p-[20px]">
                  <p className="font-semibold text-[14px] text-[#1A1A2E] mb-[12px]">Publicar para turmas</p>
                  <div className="flex flex-col gap-[8px]">
                    {turmas.map((t) => (
                      <label key={t} className="flex items-center gap-[8px] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={turmasSelecionadas.includes(t)}
                          onChange={() => toggleTurma(t)}
                          className="rounded accent-[#8200db]"
                        />
                        <span className="text-[13px] text-[#1A1A2E]">{t}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-[11px] text-[#4A4A6A] mt-[10px]">{turmasSelecionadas.length} turma(s) selecionada(s)</p>
                </Card>

                <Card className="p-[20px]">
                  <p className="font-semibold text-[14px] text-[#1A1A2E] mb-[8px]">Resumo</p>
                  <div className="flex flex-col gap-[6px] text-[12px] text-[#4A4A6A]">
                    <div className="flex justify-between"><span>Campos</span><span className="font-medium text-[#1A1A2E]">{campos.length}</span></div>
                    <div className="flex justify-between"><span>Obrigatórios</span><span className="font-medium text-[#1A1A2E]">{campos.filter((c) => c.obrigatorio).length}</span></div>
                    <div className="flex justify-between"><span>Turmas</span><span className="font-medium text-[#1A1A2E]">{turmasSelecionadas.length}</span></div>
                    <div className="flex justify-between"><span>Prazo</span><span className="font-medium text-[#1A1A2E]">{prazo || "—"}</span></div>
                  </div>
                  <button type="submit"
                    disabled={turmasSelecionadas.length === 0 || !titulo || !prazo}
                    className="mt-[14px] w-full bg-[#8200db] text-white text-[13px] font-medium h-[38px] rounded-[8px] hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                    Publicar formulário
                  </button>
                  <button type="button" onClick={() => navigate("/coordenador")}
                    className="mt-[8px] w-full border border-[rgba(0,0,0,0.1)] text-[13px] font-medium text-[#4A4A6A] h-[36px] rounded-[8px] hover:bg-[#F4F6FA] transition-colors">
                    Cancelar
                  </button>
                </Card>
              </div>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
}
