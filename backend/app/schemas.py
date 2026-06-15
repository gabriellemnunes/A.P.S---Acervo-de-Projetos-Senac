from datetime import datetime, date
from pydantic import BaseModel, EmailStr

class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    password: str
    matricula: str | None = None
    perfil: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UsuarioOut(BaseModel):
    id: int
    nome: str
    email: EmailStr
    matricula: str | None = None
    perfil: str
    class Config: from_attributes = True

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UsuarioOut

class ProjetoCreate(BaseModel):
    nome: str
    descricao: str
    tags: str | None = None
    tecnologias: str | None = None
    objetivo: str | None = None
    publico_alvo: str | None = None
    status: str = "incubacao"

class ProjetoOut(ProjetoCreate):
    id: int
    criador_id: int
    class Config: from_attributes = True

class MentorCreate(BaseModel):
    usuario_id: int
    especialidades: str | None = None
    bio: str | None = None
    disponivel: bool = True

class MentorOut(BaseModel):
    id: int
    usuario_id: int
    nome: str | None = None
    email: str | None = None
    especialidades: str | None = None
    bio: str | None = None
    disponivel: bool
    class Config: from_attributes = True

class AgendamentoCreate(BaseModel):
    mentor_id: int
    projeto_id: int | None = None
    data_hora: datetime
    tipo: str = "online"
    pauta: str | None = None

class AgendamentoOut(AgendamentoCreate):
    id: int
    aluno_id: int
    status: str
    class Config: from_attributes = True

class AvaliacaoCreate(BaseModel):
    projeto_id: int
    inovacao: int | None = None
    viabilidade: int | None = None
    impacto: int | None = None
    execucao: int | None = None
    feedback: str | None = None

class AvaliacaoOut(AvaliacaoCreate):
    id: int
    professor_id: int
    class Config: from_attributes = True

class CampoCreate(BaseModel):
    tipo: str
    label: str
    obrigatorio: bool = False
    opcoes: str | None = None

class FormularioCreate(BaseModel):
    titulo: str
    descricao: str | None = None
    prazo: date | None = None
    turmas: str | None = None
    publicado: bool = True
    campos: list[CampoCreate] = []
