from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import select
from ..database import get_db
from ..models import Projeto, Usuario
from ..schemas import ProjetoCreate, ProjetoOut
from ..security import get_current_user

router = APIRouter(prefix="/projetos", tags=["Projetos"])

# RF03 (visibilidade) + RF11 (busca/filtro)
@router.get("", response_model=list[ProjetoOut])
def listar(
    db: Session = Depends(get_db),
    user: Usuario = Depends(get_current_user),
    area_conhecimento: str | None = Query(None),
    status: str | None = Query(None),
    data_inicio: str | None = Query(None),  # formato YYYY-MM-DD
    data_fim: str | None = Query(None),
):
    q = select(Projeto)
    if user.perfil == "aluno":
        q = q.where((Projeto.criador_id == user.id) | (Projeto.publico == True))
    if area_conhecimento:
        q = q.where(Projeto.area_conhecimento == area_conhecimento)
    if status:
        q = q.where(Projeto.status == status)
    if data_inicio:
        q = q.where(Projeto.criado_em >= data_inicio)
    if data_fim:
        q = q.where(Projeto.criado_em <= data_fim)
    return db.scalars(q).all()

@router.post("", response_model=ProjetoOut)
def criar(data: ProjetoCreate, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    projeto = Projeto(**data.model_dump(), criador_id=user.id)
    db.add(projeto); db.commit(); db.refresh(projeto)
    return projeto

@router.get("/{projeto_id}", response_model=ProjetoOut)
def obter(projeto_id: int, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    projeto = db.get(Projeto, projeto_id)
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    if not projeto.publico and projeto.criador_id != user.id and user.perfil == "aluno":
        raise HTTPException(status_code=403, detail="Projeto privado")
    return projeto

@router.put("/{projeto_id}", response_model=ProjetoOut)
def atualizar(projeto_id: int, data: ProjetoCreate, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    projeto = db.get(Projeto, projeto_id)
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    if user.perfil == "aluno" and projeto.criador_id != user.id:
        raise HTTPException(status_code=403, detail="Sem permissão")
    for k, v in data.model_dump().items():
        setattr(projeto, k, v)
    db.commit(); db.refresh(projeto)
    return projeto

@router.delete("/{projeto_id}")
def deletar(projeto_id: int, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    projeto = db.get(Projeto, projeto_id)
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    db.delete(projeto); db.commit()
    return {"ok": True}
