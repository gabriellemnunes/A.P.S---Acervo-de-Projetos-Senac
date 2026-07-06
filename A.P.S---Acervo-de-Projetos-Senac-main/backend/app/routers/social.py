from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select, func

from ..database import get_db
from ..models import Curtida, Comentario, Usuario
from ..schemas import ComentarioCreate, ComentarioOut
from ..security import get_current_user

router = APIRouter(prefix="/projetos/{projeto_id}", tags=["Interações"])


@router.post("/curtir")
def curtir(projeto_id: int, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    ja_curtiu = db.scalar(
        select(Curtida).where(Curtida.projeto_id == projeto_id, Curtida.usuario_id == user.id)
    )
    if ja_curtiu:
        db.delete(ja_curtiu)
        db.commit()
        return {"curtido": False}
    db.add(Curtida(projeto_id=projeto_id, usuario_id=user.id))
    db.commit()
    return {"curtido": True}


@router.get("/curtidas")
def total_curtidas(projeto_id: int, db: Session = Depends(get_db)):
    total = db.scalar(select(func.count(Curtida.id)).where(Curtida.projeto_id == projeto_id))
    return {"total": total or 0}


@router.post("/comentarios", response_model=ComentarioOut)
def comentar(
    projeto_id: int,
    data: ComentarioCreate,
    db: Session = Depends(get_db),
    user: Usuario = Depends(get_current_user),
):
    c = Comentario(projeto_id=projeto_id, usuario_id=user.id, texto=data.texto)
    db.add(c)
    db.commit()
    db.refresh(c)
    return c


@router.get("/comentarios", response_model=list[ComentarioOut])
def listar_comentarios(projeto_id: int, db: Session = Depends(get_db)):
    return db.scalars(
        select(Comentario).where(Comentario.projeto_id == projeto_id).order_by(Comentario.criado_em)
    ).all()
