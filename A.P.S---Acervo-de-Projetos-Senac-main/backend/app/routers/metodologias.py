from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime

from ..database import get_db
from ..models import Projeto, Usuario
from ..security import get_current_user

router = APIRouter(prefix="/projetos/{projeto_id}/metodologias", tags=["Metodologias"])

REGRAS = [
    (4, ["Kit de criação de personas", "Definição de papéis"]),
    (10, ["Pitch Twitter", "Checklists de validação"]),
    (20, ["Cronograma", "Matriz de riscos"]),
    (30, ["Kit de apresentação", "Simulação de banca"]),
]


@router.get("")
def obter_metodologias(
    projeto_id: int, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)
):
    projeto = db.get(Projeto, projeto_id)
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    dias_inativo = (datetime.utcnow() - projeto.atualizado_em).days
    congelado = dias_inativo > 7
    dias_vida = (datetime.utcnow() - projeto.criado_em).days

    desbloqueadas: list[str] = []
    for dias_necessarios, itens in REGRAS:
        if dias_vida >= dias_necessarios:
            desbloqueadas.extend(itens)

    return {
        "dias_vida_ativo": dias_vida,
        "dias_sem_atualizacao": dias_inativo,
        "congelado": congelado,
        "metodologias_desbloqueadas": desbloqueadas if not congelado else [],
        "aviso": "Desbloqueio congelado por inatividade (+7 dias)" if congelado else None,
    }
