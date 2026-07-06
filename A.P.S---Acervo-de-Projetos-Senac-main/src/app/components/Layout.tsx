import { useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Users, Calendar, FolderOpen, LogOut, ChevronRight } from "lucide-react";
import { APSLogo } from "./APSLogo";

interface LayoutProps {
  role: "aluno" | "professor" | "coordenador";
  children: React.ReactNode;
}

const roleLabels = { aluno: "Aluno", professor: "Professor", coordenador: "Coordenador" };
const roleBadgeColors = {
  aluno: "bg-[#F38305] text-white",
  professor: "bg-[#008236] text-white",
  coordenador: "bg-[#8200db] text-white",
};

const navItems = {
  aluno: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/aluno" },
    { label: "Meu Projeto", icon: FolderOpen, path: "/aluno/criar-projeto" },
    { label: "Buscar Mentores", icon: Users, path: "/aluno/buscar-mentores" },
    { label: "Agendar Encontro", icon: Calendar, path: "/aluno/agendar" },
  ],
  professor: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/professor" },
    { label: "Avaliar Projetos", icon: FolderOpen, path: "/professor/avaliar/4" },
  ],
  coordenador: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/coordenador" },
    { label: "Publicar Formulário", icon: FolderOpen, path: "/coordenador/publicar-formulario" },
  ],
};

export function Layout({ role, children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[#F4F6FA] font-['Inter',sans-serif]">
      {/* Sidebar — dark navy per APS brand */}
      <aside className="w-[228px] bg-[#044482] flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="px-[16px] py-[14px] border-b border-white/10">
          <APSLogo height={30} variant="all-white" />
        </div>

        {/* Role badge */}
        <div className="px-[16px] py-[10px] border-b border-white/10">
          <span className={`inline-flex items-center px-[10px] py-[4px] rounded-[6px] text-[11px] font-semibold ${roleBadgeColors[role]}`}>
            {roleLabels[role]}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-[8px] py-[12px] flex flex-col gap-[2px]">
          {navItems[role].map((item) => {
            const active = location.pathname === item.path;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-[10px] px-[12px] py-[9px] rounded-[8px] text-[13px] font-medium transition-colors text-left ${
                  active
                    ? "bg-[#F38305] text-white shadow-sm shadow-[#F38305]/30"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={15} className="shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-[8px] py-[12px] border-t border-white/10">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-[10px] px-[12px] py-[9px] rounded-[8px] text-[13px] font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={15} className="shrink-0" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="bg-white border-b border-[#e5e7eb] px-[32px] py-[20px] flex items-center justify-between">
      <div>
        <p className="font-semibold text-[18px] text-[#1A1A2E]">{title}</p>
        {subtitle && <p className="text-[13px] text-[#4A4A6A] mt-[2px]">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; path?: string }[] }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-[6px] text-[12px] text-[#4A4A6A] px-[32px] pt-[16px]">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-[6px]">
          {i > 0 && <ChevronRight size={12} />}
          {item.path ? (
            <button onClick={() => navigate(item.path!)} className="hover:text-[#F38305] transition-colors">
              {item.label}
            </button>
          ) : (
            <span className="text-[#1A1A2E] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-[14px] border border-[rgba(0,0,0,0.08)] ${className}`}>
      {children}
    </div>
  );
}

export function Tag({ label, color = "gray" }: { label: string; color?: "gray" | "purple" | "green" | "blue" | "orange" | "red" }) {
  const colors = {
    gray: "bg-[#eceef2] text-[#4A4A6A]",
    purple: "bg-[#f3e8ff] text-[#8200db] border border-[#dab2ff]",
    green: "bg-[#dcfce7] text-[#008236] border border-[#7bf1a8]",
    blue: "bg-[#D6E8FF] text-[#044482] border border-[#0A5FB4]/30",
    orange: "bg-[#FDE8C8] text-[#F38305] border border-[#F9A94B]/50",
    red: "bg-[#fee2e2] text-[#dc2626] border border-[#fca5a5]",
  };
  return (
    <span className={`inline-flex items-center px-[9px] py-[3px] rounded-[8px] text-[12px] font-medium leading-[16px] whitespace-nowrap ${colors[color]}`}>
      {label}
    </span>
  );
}
