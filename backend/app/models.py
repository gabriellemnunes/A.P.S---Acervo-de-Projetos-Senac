from sqlalchemy import String, Text, ForeignKey, DateTime, Boolean, Integer, Date, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    matricula: Mapped[str | None] = mapped_column(String(40), nullable=True)
    senha_hash: Mapped[str] = mapped_column(String(255))
    perfil: Mapped[str] = mapped_column(String(30))
    criado_em: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())

class Projeto(Base):
    __tablename__ = "projetos"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    nome: Mapped[str] = mapped_column(String(160))
    descricao: Mapped[str] = mapped_column(Text)
    tags: Mapped[str | None] = mapped_column(String(255), nullable=True)
    tecnologias: Mapped[str | None] = mapped_column(String(255), nullable=True)
    objetivo: Mapped[str | None] = mapped_column(Text, nullable=True)
    publico_alvo: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(30), default="incubacao")
    criador_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id", ondelete="CASCADE"))

class Mentor(Base):
    __tablename__ = "mentores"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id", ondelete="CASCADE"))
    especialidades: Mapped[str | None] = mapped_column(String(255), nullable=True)
    bio: Mapped[str | None] = mapped_column(Text, nullable=True)
    disponivel: Mapped[bool] = mapped_column(Boolean, default=True)
    usuario: Mapped[Usuario] = relationship()

class Agendamento(Base):
    __tablename__ = "agendamentos"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    aluno_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id", ondelete="CASCADE"))
    mentor_id: Mapped[int] = mapped_column(ForeignKey("mentores.id", ondelete="CASCADE"))
    projeto_id: Mapped[int | None] = mapped_column(ForeignKey("projetos.id", ondelete="SET NULL"), nullable=True)
    data_hora: Mapped[DateTime] = mapped_column(DateTime)
    tipo: Mapped[str] = mapped_column(String(20), default="online")
    pauta: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(30), default="confirmado")

class Avaliacao(Base):
    __tablename__ = "avaliacoes"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    projeto_id: Mapped[int] = mapped_column(ForeignKey("projetos.id", ondelete="CASCADE"))
    professor_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id", ondelete="CASCADE"))
    inovacao: Mapped[int | None] = mapped_column(Integer, nullable=True)
    viabilidade: Mapped[int | None] = mapped_column(Integer, nullable=True)
    impacto: Mapped[int | None] = mapped_column(Integer, nullable=True)
    execucao: Mapped[int | None] = mapped_column(Integer, nullable=True)
    feedback: Mapped[str | None] = mapped_column(Text, nullable=True)

class Formulario(Base):
    __tablename__ = "formularios"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    titulo: Mapped[str] = mapped_column(String(160))
    descricao: Mapped[str | None] = mapped_column(Text, nullable=True)
    prazo: Mapped[Date | None] = mapped_column(Date, nullable=True)
    turmas: Mapped[str | None] = mapped_column(String(255), nullable=True)
    publicado: Mapped[bool] = mapped_column(Boolean, default=False)
    coordenador_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id", ondelete="CASCADE"))

class CampoFormulario(Base):
    __tablename__ = "campos_formulario"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    formulario_id: Mapped[int] = mapped_column(ForeignKey("formularios.id", ondelete="CASCADE"))
    tipo: Mapped[str] = mapped_column(String(30))
    label: Mapped[str] = mapped_column(String(160))
    obrigatorio: Mapped[bool] = mapped_column(Boolean, default=False)
    opcoes: Mapped[str | None] = mapped_column(Text, nullable=True)
