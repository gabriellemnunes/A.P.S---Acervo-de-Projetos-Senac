from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from ..database import get_db
from ..models import Evento, InscricaoEvento, Usuario
from ..schemas import EventoCreate, EventoOut
from ..security import get_current_user

router = APIRouter(prefix="/eventos", tags=["Eventos"])


@router.get("", response_model=list[EventoOut])
def listar(db: Session = Depends(get_db)):
    return db.scalars(select(Evento).order_by(Evento.data_hora)).all()


@router.post("", response_model=EventoOut)
def criar(data: EventoCreate, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    if user.perfil not in ("professor", "coordenador"):
        raise HTTPException(status_code=403, detail="Somente mentores divulgam eventos")
    evento = Evento(**data.model_dump(), mentor_id=user.id)
    db.add(evento)
    db.commit()
    db.refresh(evento)
    return evento


@router.post("/{evento_id}/inscrever")
def inscrever(evento_id: int, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    if user.perfil != "aluno":
        raise HTTPException(status_code=403, detail="Somente alunos se inscrevem")
    evento = db.get(Evento, evento_id)
    if not evento:
        raise HTTPException(status_code=404, detail="Evento não encontrado")
    ja_inscrito = db.scalar(
        select(InscricaoEvento).where(
            InscricaoEvento.evento_id == evento_id, InscricaoEvento.aluno_id == user.id
        )
    )
    if ja_inscrito:
        raise HTTPException(status_code=400, detail="Você já está inscrito neste evento")
    db.add(InscricaoEvento(evento_id=evento_id, aluno_id=user.id))
    db.commit()
    return {"mensagem": "Inscrição confirmada"}


@router.get("/{evento_id}/inscritos")
def listar_inscritos(evento_id: int, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    if user.perfil not in ("professor", "coordenador"):
        raise HTTPException(status_code=403, detail="Sem permissão")
    inscritos = db.scalars(
        select(InscricaoEvento).where(InscricaoEvento.evento_id == evento_id)
    ).all()
    return {"total": len(inscritos)}
