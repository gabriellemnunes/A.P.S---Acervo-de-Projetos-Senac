import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiFetch } from "../../services/api";
import { AlertTriangle, Calendar, MapPin, Users, Lock, CheckCircle, Clock, Heart, MessageCircle, Plus, Link } from "lucide-react";
import { Layout, PageHeader, Card, Tag } from "../components/Layout";
import imgProfAnaSilva from "../../imports/DashboardParaRepositorioPiSenac/56d9e68ccff12413f144bdf75269165f5e84005a.png";
import imgProfCarlosMendes from "../../imports/DashboardParaRepositorioPiSenac/0d5da6ab018faf09b0940ac3e0ab4d6d514c431f.png";
import imgProfaJulianaSouza from "../../imports/DashboardParaRepositorioPiSenac/c63835773a05453d6506aec39d7d54c0bc4571da.png";
import imgProfaMarinaCosta from "../../imports/DashboardParaRepositorioPiSenac/6037748207f9c7910c91db1bd9b0f380e0225194.png";
import imgProfRobertoLima from "../../imports/DashboardParaRepositorioPiSenac/9bbdfb06a5eae3ca01387e38cee556cb0ba93eb3.png";
import imgAgriTech from "../../imports/DashboardParaRepositorioPiSenac/7064d56af464bda757ceac4713c1cd76ffb102b1.png";
import imgFinTech from "../../imports/DashboardParaRepositorioPiSenac/e1017419a593805e71bdfed1d32939441216b79b.png";
import imgLucasFerreira from "../../imports/DashboardParaRepositorioPiSenac/a5a72bfa19f17d9c34f2a2e68ed1408cf1ff7eb4.png";
import imgBeatrizSantos from "../../imports/DashboardParaRepositorioPiSenac/a41439275897bc521bfdcb816a4f007a73adc569.png";

function ProjectCard({ title, description, tags, status, tasks, mentor, mentorImg }: {
  title: string; description: string; tags: string[];
  status?: "pending-meeting"; tasks: string; mentor: string; mentorImg: string;
}) {
  return (
    <div className="bg-white rounded-[14px] border border-[rgba(0,0,0,0.1)] w-full">
      <div className="p-[20px] pb-0">
        <div className="flex items-start justify-between">
          <p className="font-semibold text-[13px] text-[#0a0a0a] leading-[17px] flex-1 mr-2">{title}</p>
          <Link size={14} className="text-[#F38305] shrink-0 mt-0.5" />
        </div>
        <p className="text-[11px] text-[#4A4A6A] leading-[15px] mt-[6px]">{description}</p>
      </div>
      <div className="px-[20px] pb-[20px]">
        <div className="flex flex-wrap gap-[4px] mt-[10px]">
          {tags.map((t) => <Tag key={t} label={t} />)}
        </div>
        <div className="mt-[10px] flex items-center gap-[10px]">
          {status === "pending-meeting" && (
            <span className="flex items-center gap-[4px] text-[11px] text-[#f54900]">
              <AlertTriangle size={12} className="shrink-0" /> Reunião pendente
            </span>
          )}
          <span className="flex items-center gap-[4px] text-[11px] text-[#F38305]">
            <Users size={12} className="shrink-0" /> {tasks}
          </span>
        </div>
        <div className="mt-[12px] pt-[12px] border-t border-[rgba(0,0,0,0.1)] flex items-center gap-[6px]">
          <img src={mentorImg} alt={mentor} className="w-[20px] h-[20px] rounded-full object-cover shrink-0" />
          <span className="text-[11px] text-[#4A4A6A]">{mentor}</span>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="bg-[#f9fafb] rounded-[10px] p-[14px] flex-1 min-w-[240px]">
      <div className="flex items-center justify-between mb-[12px]">
        <h3 className="font-semibold text-[15px] text-[#1A1A2E]">{title}</h3>
        <span className="border border-[rgba(0,0,0,0.1)] rounded-[8px] px-[8px] py-[2px] text-[11px] font-medium text-[#0a0a0a]">{count}</span>
      </div>
      <div className="flex flex-col gap-[10px]">{children}</div>
    </div>
  );
}

function EventItem({ type, typeColor, title, description, date, location }: {
  type: string; typeColor: "purple" | "green" | "blue" | "orange";
  title: string; description: string; date: string; location: string;
}) {
  return (
    <div className="rounded-[10px] border border-[rgba(0,0,0,0.1)] p-[16px]">
      <div className="flex items-start justify-between gap-[12px]">
        <div className="flex-1 min-w-0">
          <Tag label={type} color={typeColor} />
          <p className="font-semibold text-[15px] text-[#1A1A2E] leading-[22px] mt-[8px]">{title}</p>
          <p className="text-[13px] text-[#4A4A6A] leading-[18px]">{description}</p>
          <div className="flex flex-col gap-[4px] mt-[10px]">
            <span className="flex items-center gap-[6px] text-[13px] text-[#4A4A6A]"><Calendar size={14} className="shrink-0" />{date}</span>
            <span className="flex items-center gap-[6px] text-[13px] text-[#4A4A6A]"><MapPin size={14} className="shrink-0" />{location}</span>
          </div>
        </div>
        <button className="bg-[#F38305] text-white text-[13px] font-medium px-[12px] h-[30px] rounded-[8px] shrink-0 whitespace-nowrap">
          Inscrever projeto
        </button>
      </div>
    </div>
  );
}

function UnlockItem({ title, status, info }: { title: string; status: "unlocked" | "locked"; info: string }) {
  if (status === "unlocked") return (
    <div className="bg-[#f0fdf4] border border-[#b9f8cf] rounded-[10px] p-[14px] flex items-center gap-[10px]">
      <div className="bg-[#dcfce7] rounded-full w-[36px] h-[36px] flex items-center justify-center shrink-0">
        <CheckCircle size={18} className="text-[#00a63e]" />
      </div>
      <div>
        <p className="font-semibold text-[13px] text-[#1A1A2E]">{title}</p>
        <p className="text-[11px] text-[#008236] font-medium mt-[2px]">✓ Desbloqueado! Disponível agora</p>
      </div>
    </div>
  );
  return (
    <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[10px] p-[14px] flex items-center gap-[10px]">
      <div className="bg-[#F4F6FA] rounded-full w-[36px] h-[36px] flex items-center justify-center shrink-0">
        <Lock size={18} className="text-[#99a1af]" />
      </div>
      <div>
        <p className="font-semibold text-[13px] text-[#1A1A2E]">{title}</p>
        <span className="flex items-center gap-[4px] text-[11px] text-[#4A4A6A] mt-[2px]">
          <Clock size={12} className="shrink-0" />{info}
        </span>
      </div>
    </div>
  );
}

export function AlunoDashboard() {
  const navigate = useNavigate();
  const [meusProjetos, setMeusProjetos] = useState<any[]>([]);
  const [busca, setBusca] = useState("");
useEffect(() => {
  carregarProjetos();
}, []);

async function carregarProjetos() {
  try {
    const response = await apiFetch("/projetos");

    if (!response.ok) {
      throw new Error("Erro ao buscar projetos");
    }

    const data = await response.json();

    setMeusProjetos(data);
  } catch (error) {
    console.error(error);
  }
}
async function excluirProjeto(id: number) {
  const confirmar = window.confirm(
    "Tem certeza que deseja excluir este projeto?"
  );

  if (!confirmar) return;

  try {
    const response = await apiFetch(`/projetos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao excluir projeto");
    }

    carregarProjetos();
  } catch (error) {
    console.error(error);
    alert("Erro ao excluir projeto.");
  }
}

const projetosFiltrados = meusProjetos.filter((projeto) =>
  projeto.nome.toLowerCase().includes(busca.toLowerCase())
);

  return (
    <Layout role="aluno">
      <PageHeader
        title="Dashboard"
        subtitle="Bem-vindo(a)! Acompanhe seus projetos."
        action={
          <button
            onClick={() => navigate("/aluno/criar-projeto")}
            className="bg-[#F38305] text-white text-[13px] font-medium px-[16px] h-[34px] rounded-[8px] flex items-center gap-[6px] hover:bg-[#F9A94B] transition-colors"
          >
            <Plus size={15} /> Novo projeto
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto px-[32px] py-[24px] flex flex-col gap-[24px]">
        {/* Alert */}
        <div className="bg-[#fff7ed] border border-[#ffd6a8] rounded-[14px] p-[20px] flex items-start gap-[14px]">
          <div className="bg-[#ffedd4] rounded-full w-[40px] h-[40px] flex items-center justify-center shrink-0">
            <AlertTriangle size={20} className="text-[#f54900]" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[16px] text-[#1A1A2E]">Atenção: Projeto inativo</p>
            <p className="text-[13px] text-[#1A1A2E] mt-[2px]">
              Seu projeto está há <strong>25 dias</strong> sem atualização. Atualize para não congelar os próximos desbloqueios.
            </p>
            <button
              onClick={() => navigate("/aluno/criar-projeto")}
              className="mt-[10px] bg-[#f54900] text-white text-[13px] font-medium px-[12px] h-[30px] rounded-[8px]"
            >
              Atualizar projeto agora
            </button>
          </div>
        </div>
<Card>
  <div className="px-[24px] pt-[20px]">
    <p className="font-medium text-[15px] text-[#0a0a0a]">
      Meus Projetos
    </p>
    <div className="mt-[12px]">
  <input
    type="text"
    placeholder="Pesquisar projeto..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    className="w-full border border-[#d1d5db] rounded-[8px] px-[12px] py-[10px] text-[13px]"
  />
</div>
  </div>

  <div className="px-[24px] pb-[20px] mt-[12px]">
  {projetosFiltrados.length === 0 ? (
      <p className="text-[13px] text-[#4A4A6A]">
        Nenhum projeto cadastrado.
      </p>
    ) : (
      <div className="flex flex-col gap-[10px]">
  {projetosFiltrados.map((projeto) => (
          <div
            key={projeto.id}
            className="border border-[#e5e7eb] rounded-[10px] p-[14px]"
          >
            <p className="font-semibold text-[14px] text-[#1A1A2E]">
              {projeto.nome}
            </p>

            <p className="text-[12px] text-[#4A4A6A] mt-[4px]">
              {projeto.descricao}
            </p>

            <div className="mt-[8px] flex flex-wrap gap-[6px]">
              {projeto.tags
                ?.split(",")
                .map((tag: string) => (
                  <Tag
                    key={tag}
                    label={tag.trim()}
                  />
                ))}
            </div>

<div className="flex items-center justify-between mt-[8px]">
  <p className="text-[11px] text-[#4A4A6A]">
    Projeto cadastrado no sistema
  </p>

  <button
    onClick={() => excluirProjeto(projeto.id)}
    className="bg-red-500 hover:bg-red-600 text-white text-[11px] px-[10px] py-[5px] rounded-[6px]"
  >
    Excluir
  </button>
</div>
          </div>
        ))}
      </div>
    )}
  </div>
</Card>
        {/* Kanban */}
        <Card>
          <div className="px-[24px] pt-[20px] pb-[4px]">
            <p className="font-medium text-[15px] text-[#0a0a0a]">Quadro de Projetos</p>
          </div>
          <div className="px-[24px] pb-[24px] mt-[16px] flex gap-[12px] overflow-x-auto">
            <KanbanColumn title="Pré-incubação" count={1}>
              <ProjectCard title="EcoApp - Sustentabilidade Urbana" description="Gestão de resíduos recicláveis" tags={["Sustentabilidade", "Mobile", "IoT"]} status="pending-meeting" tasks="2/5" mentor="Prof. Ana Silva" mentorImg={imgProfAnaSilva} />
            </KanbanColumn>
            <KanbanColumn title="Incubação ativa" count={2}>
              <ProjectCard title="MedConnect - Telemedicina" description="Plataforma de consultas online" tags={["Saúde", "Web", "IA"]} tasks="8/10" mentor="Prof. Carlos Mendes" mentorImg={imgProfCarlosMendes} />
              <ProjectCard title="FoodShare - Combate ao Desperdício" description="App para doação de alimentos" tags={["Social", "Mobile"]} status="pending-meeting" tasks="5/10" mentor="Profa. Juliana Souza" mentorImg={imgProfaJulianaSouza} />
            </KanbanColumn>
            <KanbanColumn title="Em validação" count={1}>
              <ProjectCard title="EduTech - Gamificação" description="Plataforma educacional" tags={["Educação", "Gamificação"]} tasks="10/10" mentor="Profa. Marina Costa" mentorImg={imgProfaMarinaCosta} />
            </KanbanColumn>
            <KanbanColumn title="Desincubado" count={1}>
              <ProjectCard title="SmartCity Dashboard" description="Gestão de cidades inteligentes" tags={["Smart City", "IoT"]} tasks="12/12" mentor="Prof. Roberto Lima" mentorImg={imgProfRobertoLima} />
            </KanbanColumn>
          </div>
        </Card>

        {/* Calendar + Unlocks */}
        <div className="flex gap-[24px] flex-col xl:flex-row">
          <Card className="flex-1 min-w-0">
            <div className="px-[24px] pt-[20px]"><p className="font-medium text-[15px] text-[#0a0a0a]">Calendário de Eventos</p></div>
            <div className="px-[24px] pb-[24px] flex flex-col gap-[10px] mt-[16px]">
              <EventItem type="Hackathon" typeColor="purple" title="Hackathon Inovação Social" description="48h de desenvolvimento focado em impacto social" date="14 de abril às 21:00" location="Campus Pernambuco" />
              <EventItem type="Ideathon" typeColor="green" title="Ideathon Sustentabilidade" description="Geração de ideias para projetos sustentáveis" date="19 de abril às 21:00" location="Online" />
              <EventItem type="Workshop" typeColor="blue" title="Workshop: Design Thinking" description="Aprenda metodologias ágeis de ideação" date="11 de abril às 21:00" location="Auditório Principal" />
              <EventItem type="Palestra" typeColor="orange" title="Palestra: IA e o Futuro do Trabalho" description="Com especialistas da indústria tech" date="17 de abril às 21:00" location="Sala 204" />
            </div>
          </Card>
          <Card className="w-full xl:w-[420px] shrink-0">
            <div className="px-[24px] pt-[20px]"><p className="font-medium text-[15px] text-[#0a0a0a]">Desbloqueios Progressivos</p></div>
            <div className="px-[24px] pb-[24px]">
              <div className="mt-[20px]">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[13px] text-[#1A1A2E]">Progresso: 4 de 30 dias</p>
                  <p className="text-[13px] text-[#4A4A6A]">13%</p>
                </div>
                <div className="mt-[8px] bg-[rgba(3,2,19,0.15)] rounded-full h-[8px] overflow-hidden">
                  <div className="bg-[#F38305] h-full rounded-full" style={{ width: "13%" }} />
                </div>
              </div>
              <div className="flex flex-col gap-[10px] mt-[20px]">
                <UnlockItem title="Kit Personas e Papéis" status="unlocked" info="Disponível agora" />
                <UnlockItem title="Pitch Twitter" status="locked" info="Em 6 dias" />
                <UnlockItem title="Cronograma e Matriz de Riscos" status="locked" info="Em 16 dias" />
                <UnlockItem title="Canvas de Modelo de Negócio" status="locked" info="Em 26 dias" />
              </div>
            </div>
          </Card>
        </div>

        {/* Open spots + Matches */}
        <div className="flex gap-[24px] flex-col xl:flex-row">
          <Card className="flex-1 min-w-0">
            <div className="px-[24px] pt-[20px]">
              <div className="flex items-center gap-[8px]"><MapPin size={18} className="text-[#0a0a0a]" /><p className="font-medium text-[15px] text-[#0a0a0a]">Projetos com vagas perto de você</p></div>
            </div>
            <div className="px-[24px] pb-[24px] flex flex-col gap-[10px] mt-[16px]">
              {[
                { img: imgAgriTech, name: "AgriTech - Monitoramento de Plantações", desc: "Procura desenvolvedor mobile e especialista em IoT", dist: "2.5 km" },
                { img: imgFinTech, name: "FinTech para Microempreendedores", desc: "Busca designer UX/UI e desenvolvedor backend", dist: "5.1 km" },
              ].map((p) => (
                <div key={p.name} className="rounded-[10px] border border-[rgba(0,0,0,0.1)] p-[12px]">
                  <div className="flex items-start gap-[10px]">
                    <img src={p.img} alt={p.name} className="w-[40px] h-[40px] rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[13px] text-[#1A1A2E]">{p.name}</p>
                      <p className="text-[11px] text-[#4A4A6A] mt-[2px]">{p.desc}</p>
                      <span className="flex items-center gap-[4px] text-[11px] text-[#4A4A6A] mt-[6px]"><MapPin size={12} /> {p.dist}</span>
                    </div>
                  </div>
                  <button className="mt-[10px] w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] h-[30px] text-[13px] font-medium text-[#0a0a0a] hover:bg-[#F4F6FA] transition-colors">
                    Ver detalhes
                  </button>
                </div>
              ))}
            </div>
          </Card>
          <Card className="flex-1 min-w-0">
            <div className="px-[24px] pt-[20px]">
              <div className="flex items-center gap-[8px]"><Users size={18} className="text-[#0a0a0a]" /><p className="font-medium text-[15px] text-[#0a0a0a]">Alunos sem projeto que combinam</p></div>
            </div>
            <div className="px-[24px] pb-[24px] flex flex-col gap-[10px] mt-[16px]">
              {[
                { img: imgLucasFerreira, name: "Lucas Ferreira - Dev Full Stack", desc: "React, Node, 3 anos de exp.", match: "76%" },
                { img: imgBeatrizSantos, name: "Beatriz Santos - Designer UX", desc: "Figma, Adobe XD, 2 anos.", match: "67%" },
              ].map((s) => (
                <div key={s.name} className="rounded-[10px] border border-[rgba(0,0,0,0.1)] p-[12px] flex items-start gap-[10px]">
                  <img src={s.img} alt={s.name} className="w-[40px] h-[40px] rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[13px] text-[#1A1A2E]">{s.name}</p>
                    <p className="text-[11px] text-[#4A4A6A] mt-[2px]">{s.desc}</p>
                    <p className="text-[11px] text-[#4A4A6A] mt-[2px] font-medium">{s.match} compatível</p>
                    <button className="mt-[8px] w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-[8px] h-[28px] text-[12px] font-medium text-[#0a0a0a] hover:bg-[#F4F6FA] transition-colors">
                      Convidar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Feed */}
        <Card>
          <div className="px-[24px] pt-[20px]"><p className="font-medium text-[15px] text-[#0a0a0a]">Feed de Projetos Públicos</p></div>
          <div className="px-[24px] pb-[8px]">
            {[
              { title: "EcoApp - Sustentabilidade Urbana", mentor: "Prof. Ana Silva", time: "Há 25 dias", desc: "Aplicativo para gestão de resíduos recicláveis em comunidades.", tags: ["Sustentabilidade", "Mobile", "IoT"], likes: 12, comments: 3 },
              { title: "MedConnect - Telemedicina", mentor: "Prof. Carlos Mendes", time: "Há 2 dias", desc: "Plataforma de consultas médicas online.", tags: ["Saúde", "Web", "IA"], likes: 28, comments: 14 },
              { title: "SmartCity Dashboard", mentor: "Prof. Roberto Lima", time: "Há 5 dias", desc: "Dashboard para gestão de cidades inteligentes.", tags: ["Smart City", "Dashboard", "IoT"], likes: 47, comments: 31 },
            ].map((item) => (
              <div key={item.title} className="py-[16px] border-b border-[rgba(0,0,0,0.08)] last:border-0">
                <div className="flex items-start gap-[12px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#F38305] flex items-center justify-center text-white font-bold text-[13px] shrink-0">{item.title.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-[6px]">
                      <p className="font-semibold text-[13px] text-[#1A1A2E]">{item.title}</p>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0"><circle cx="7" cy="7" r="7" fill="#F38305" /><path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <p className="text-[11px] text-[#4A4A6A]">{item.mentor} · {item.time}</p>
                    <p className="text-[13px] text-[#1A1A2E] mt-[6px]">{item.desc}</p>
                    <div className="flex flex-wrap gap-[4px] mt-[6px]">
                      {item.tags.map((t) => <Tag key={t} label={t} />)}
                    </div>
                    <div className="flex items-center gap-[14px] mt-[8px]">
                      <button className="flex items-center gap-[4px] text-[11px] text-[#4A4A6A] hover:text-[#f54900] transition-colors"><Heart size={13} /> {item.likes}</button>
                      <button className="flex items-center gap-[4px] text-[11px] text-[#4A4A6A] hover:text-[#F38305] transition-colors"><MessageCircle size={13} /> {item.comments}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
