import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { CapaPage } from "./pages/CapaPage";
import { LoginPage } from "./pages/LoginPage";
import { CadastroPage } from "./pages/CadastroPage";
import { SelectProfilePage } from "./pages/SelectProfilePage";
import { AlunoDashboard } from "./pages/AlunoDashboard";
import { CriarProjetoPage } from "./pages/CriarProjetoPage";
import { BuscarMentoresPage } from "./pages/BuscarMentoresPage";
import { AgendarEncontroPage } from "./pages/AgendarEncontroPage";
import { ProfessorDashboard } from "./pages/ProfessorDashboard";
import { AvaliarProjetoPage } from "./pages/AvaliarProjetoPage";
import { CoordenadorDashboard } from "./pages/CoordenadorDashboard";
import { PublicarFormularioPage } from "./pages/PublicarFormularioPage";
import { VerificacaoEmailPage } from "./pages/VerificacaoEmailPage";
import { CadastroSucessoPage } from "./pages/CadastroSucessoPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: CapaPage },
      { path: "login", Component: LoginPage },
      { path: "cadastro", Component: CadastroPage },
      { path: "verificar-email", Component: VerificacaoEmailPage },
      { path: "cadastro-sucesso", Component: CadastroSucessoPage },
      { path: "selecionar-perfil", Component: SelectProfilePage },
      { path: "aluno", Component: AlunoDashboard },
      { path: "aluno/criar-projeto", Component: CriarProjetoPage },
      { path: "aluno/buscar-mentores", Component: BuscarMentoresPage },
      { path: "aluno/agendar", Component: AgendarEncontroPage },
      { path: "professor", Component: ProfessorDashboard },
      { path: "professor/avaliar/:id", Component: AvaliarProjetoPage },
      { path: "coordenador", Component: CoordenadorDashboard },
      { path: "coordenador/publicar-formulario", Component: PublicarFormularioPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
