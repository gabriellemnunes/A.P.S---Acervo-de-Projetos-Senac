from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from ..database import get_db
from ..models import Avaliacao, Usuario
from ..schemas import AvaliacaoCreate, AvaliacaoOut
from ..security import get_current_user

router = APIRouter(prefix="/avaliacoes", tags=["Avaliações"])

@router.get("", response_model=list[AvaliacaoOut])
def listar(db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    return db.scalars(select(Avaliacao)).all()

@router.post("", response_model=AvaliacaoOut)
def criar(data: AvaliacaoCreate, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    av = Avaliacao(**data.model_dump(), professor_id=user.id)
    db.add(av); db.commit(); db.refresh(av)
    return av
