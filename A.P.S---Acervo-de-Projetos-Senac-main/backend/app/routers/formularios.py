from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from ..database import get_db
from ..models import Formulario, CampoFormulario, Usuario
from ..schemas import FormularioCreate
from ..security import get_current_user

router = APIRouter(prefix="/formularios", tags=["Formulários"])

@router.get("")
def listar(db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    return db.scalars(select(Formulario)).all()

@router.post("")
def criar(data: FormularioCreate, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    form = Formulario(
        titulo=data.titulo,
        descricao=data.descricao,
        prazo=data.prazo,
        turmas=data.turmas,
        publicado=data.publicado,
        coordenador_id=user.id,
    )
    db.add(form); db.commit(); db.refresh(form)
    for campo in data.campos:
        db.add(CampoFormulario(**campo.model_dump(), formulario_id=form.id))
    db.commit()
    return {"id": form.id, "mensagem": "Formulário publicado com sucesso"}
