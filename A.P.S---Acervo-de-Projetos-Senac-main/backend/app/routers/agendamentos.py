from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from ..database import get_db
from ..models import Agendamento, Usuario
from ..schemas import AgendamentoCreate, AgendamentoOut
from ..security import get_current_user

router = APIRouter(prefix="/agendamentos", tags=["Agendamentos"])

@router.get("", response_model=list[AgendamentoOut])
def listar(db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    q = select(Agendamento)
    if user.perfil == "aluno":
        q = q.where(Agendamento.aluno_id == user.id)
    return db.scalars(q).all()

@router.post("", response_model=AgendamentoOut)
def criar(data: AgendamentoCreate, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    ag = Agendamento(**data.model_dump(), aluno_id=user.id, status="confirmado")
    db.add(ag); db.commit(); db.refresh(ag)
    return ag
