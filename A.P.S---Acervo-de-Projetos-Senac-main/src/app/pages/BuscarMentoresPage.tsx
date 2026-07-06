import { useState } from "react";
import { useNavigate } from "react-router";
import { Layout, PageHeader, Breadcrumb, Card, Tag } from "../components/Layout";
import { Search, Star, Calendar } from "lucide-react";
import imgProfAnaSilva from "../../imports/DashboardParaRepositorioPiSenac/56d9e68ccff12413f144bdf75269165f5e84005a.png";
import imgProfCarlosMendes from "../../imports/DashboardParaRepositorioPiSenac/0d5da6ab018faf09b0940ac3e0ab4d6d514c431f.png";
import imgProfaJulianaSouza from "../../imports/DashboardParaRepositorioPiSenac/c63835773a05453d6506aec39d7d54c0bc4571da.png";
import imgProfaMarinaCosta from "../../imports/DashboardParaRepositorioPiSenac/6037748207f9c7910c91db1bd9b0f380e0225194.png";
import imgProfRobertoLima from "../../imports/DashboardParaRepositorioPiSenac/9bbdfb06a5eae3ca01387e38cee556cb0ba93eb3.png";

const mentores = [
  { id: 1, name: "Prof. Ana Silva", role: "Tecnologia & Sustentabilidade", rating: 4.9, projects: 12, available: true, tags: ["Mobile", "IoT", "Sustentabilidade"], img: imgProfAnaSilva, bio: "Especialista em desenvolvimento mobile e projetos de impacto ambiental. Doutora pela USP." },
  { id: 2, name: "Prof. Carlos Mendes", role: "Saúde Digital & IA", rating: 4.8, projects: 18, available: true, tags: ["IA", "Web", "Saúde"], img: imgProfCarlosMendes, bio: "15 anos de experiência em healthtech. Coordenador do laboratório de IA aplicada à saúde." },
  { id: 3, name: "Profa. Juliana Souza", role: "Social & Mobile", rating: 4.7, projects: 9, available: false, tags: ["Social", "Mobile", "UX"], img: imgProfaJulianaSouza, bio: "Foco em projetos de impacto social. Especialista em design centrado no usuário." },
  { id: 4, name: "Profa. Marina Costa", role: "Educação & Gamificação", rating: 4.9, projects: 22, available: true, tags: ["Educação", "Gamificação", "Web"], img: imgProfaMarinaCosta, bio: "Pioneira em edtech no Brasil. Pesquisadora de metodologias ativas de aprendizagem." },
  { id: 5, name: "Prof. Roberto Lima", role: "Smart Cities & IoT", rating: 4.6, projects: 15, available: true, tags: ["Smart City", "IoT", "Dashboard"], img: imgProfRobertoLima, bio: "Engenheiro de sistemas urbanos. Consultor de projetos de cidades inteligentes." },
];

export function BuscarMentoresPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [solicitado, setSolicitado] = useState<number | null>(null);

  const filtered = mentores.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSolicitar = (id: number) => {
    setSolicitado(id);
    setTimeout(() => navigate("/aluno/agendar"), 1500);
  };

  return (
    <Layout role="aluno">
      <PageHeader title="Buscar Mentores" subtitle="Encontre o mentor ideal para seu projeto" />
      <Breadcrumb items={[{ label: "Dashboard", path: "/aluno" }, { label: "Buscar Mentores" }]} />

      <div className="flex-1 overflow-y-auto px-[32px] py-[20px] flex flex-col gap-[20px]">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou área de especialidade..."
            className="w-full border border-[#d1d5db] rounded-[10px] pl-[40px] pr-[16px] py-[10px] text-[13px] text-[#1A1A2E] placeholder:text-[#9ca3af] outline-none focus:border-[#F38305] focus:ring-2 focus:ring-[#F38305]/20 transition bg-white"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[16px]">
          {filtered.map((mentor) => (
            <Card key={mentor.id} className="p-[20px] flex flex-col">
              <div className="flex items-start gap-[12px]">
                <img src={mentor.img} alt={mentor.name} className="w-[48px] h-[48px] rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-[8px]">
                    <div>
                      <p className="font-semibold text-[14px] text-[#1A1A2E]">{mentor.name}</p>
                      <p className="text-[12px] text-[#4A4A6A]">{mentor.role}</p>
                    </div>
                    <span className={`inline-flex items-center px-[7px] py-[2px] rounded-[6px] text-[10px] font-medium shrink-0 ${
                      mentor.available ? "bg-[#dcfce7] text-[#008236]" : "bg-[#F4F6FA] text-[#4A4A6A]"
                    }`}>
                      {mentor.available ? "Disponível" : "Indisponível"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[12px] text-[#4A4A6A] mt-[12px] leading-[17px]">{mentor.bio}</p>

              <div className="flex flex-wrap gap-[4px] mt-[10px]">
                {mentor.tags.map((t) => <Tag key={t} label={t} />)}
              </div>

              <div className="flex items-center gap-[16px] mt-[12px] text-[12px] text-[#4A4A6A]">
                <span className="flex items-center gap-[4px]"><Star size={13} className="text-[#f59e0b] fill-[#f59e0b]" /> {mentor.rating}</span>
                <span>{mentor.projects} projetos orientados</span>
              </div>

              <div className="mt-[14px] flex gap-[8px]">
                <button
                  onClick={() => mentor.available && handleSolicitar(mentor.id)}
                  disabled={!mentor.available || solicitado === mentor.id}
                  className={`flex-1 flex items-center justify-center gap-[6px] h-[32px] rounded-[8px] text-[12px] font-medium transition-colors ${
                    solicitado === mentor.id
                      ? "bg-[#dcfce7] text-[#008236] border border-[#7bf1a8]"
                      : mentor.available
                      ? "bg-[#F38305] text-white hover:bg-[#F9A94B]"
                      : "bg-[#F4F6FA] text-[#9ca3af] cursor-not-allowed"
                  }`}
                >
                  <Calendar size={13} />
                  {solicitado === mentor.id ? "Solicitação enviada!" : "Solicitar mentoria"}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
