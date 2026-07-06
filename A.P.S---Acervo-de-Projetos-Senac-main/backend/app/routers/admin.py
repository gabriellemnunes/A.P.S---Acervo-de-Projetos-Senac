from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from ..database import get_db
from ..models import Usuario, Projeto
from ..schemas import UsuarioOut, ProjetoOut
from ..security import get_current_user

router = APIRouter(prefix="/admin", tags=["Administração"])


def exigir_coordenador(user: Usuario = Depends(get_current_user)) -> Usuario:
    if user.perfil != "coordenador":
        raise HTTPException(status_code=403, detail="Acesso restrito à coordenação")
    return user


@router.get("/usuarios", response_model=list[UsuarioOut])
def listar_usuarios(db: Session = Depends(get_db), _: Usuario = Depends(exigir_coordenador)):
    return db.scalars(select(Usuario)).all()


@router.delete("/usuarios/{usuario_id}")
def remover_usuario(usuario_id: int, db: Session = Depends(get_db), _: Usuario = Depends(exigir_coordenador)):
    usuario = db.get(Usuario, usuario_id)
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db.delete(usuario)
    db.commit()
    return {"ok": True}


@router.get("/projetos", response_model=list[ProjetoOut])
def listar_todos_projetos(db: Session = Depends(get_db), _: Usuario = Depends(exigir_coordenador)):
    return db.scalars(select(Projeto)).all()
