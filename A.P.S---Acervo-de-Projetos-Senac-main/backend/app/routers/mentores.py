from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from ..database import get_db
from ..models import Mentor, Usuario
from ..schemas import MentorCreate, MentorOut
from ..security import get_current_user

router = APIRouter(prefix="/mentores", tags=["Mentores"])

def out(m: Mentor):
    return {
        "id": m.id,
        "usuario_id": m.usuario_id,
        "nome": m.usuario.nome if m.usuario else None,
        "email": m.usuario.email if m.usuario else None,
        "especialidades": m.especialidades,
        "bio": m.bio,
        "disponivel": m.disponivel,
    }

@router.get("", response_model=list[MentorOut])
def listar(db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    return [out(m) for m in db.scalars(select(Mentor)).all()]

@router.post("", response_model=MentorOut)
def criar(data: MentorCreate, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    mentor = Mentor(**data.model_dump())
    db.add(mentor); db.commit(); db.refresh(mentor)
    return out(mentor)
