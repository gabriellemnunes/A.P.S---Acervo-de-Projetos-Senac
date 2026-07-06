from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Projeto, MudancaStatus, Usuario
from ..schemas import MudancaStatusCreate, MudancaStatusOut
from ..security import get_current_user

router = APIRouter(prefix="/projetos", tags=["Status do Kanban"])

COLUNAS_VALIDAS = ("pre_incubacao", "incubacao_ativa", "em_validacao", "desincubado")


@router.post("/{projeto_id}/status", response_model=MudancaStatusOut)
def mudar_status(
    projeto_id: int,
    data: MudancaStatusCreate,
    db: Session = Depends(get_db),
    user: Usuario = Depends(get_current_user),
):
    if user.perfil not in ("professor", "coordenador"):
        raise HTTPException(status_code=403, detail="Só o mentor pode mudar o status")
    if data.status_novo not in COLUNAS_VALIDAS:
        raise HTTPException(status_code=400, detail="Status inválido")
    if not data.checklist_preenchido or not data.reuniao_registrada:
        raise HTTPException(
            status_code=400,
            detail="É necessário registrar a mini-reunião e preencher o checklist antes de mudar o status",
        )

    projeto = db.get(Projeto, projeto_id)
    if not projeto:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    registro = MudancaStatus(
        projeto_id=projeto_id,
        mentor_id=user.id,
        status_anterior=projeto.status,
        status_novo=data.status_novo,
        comentario_mentor=data.comentario_mentor,
        checklist_preenchido=data.checklist_preenchido,
        reuniao_registrada=data.reuniao_registrada,
    )
    projeto.status = data.status_novo
    db.add(registro)
    db.commit()
    db.refresh(registro)
    return registro


@router.get("/{projeto_id}/status/historico", response_model=list[MudancaStatusOut])
def historico_status(projeto_id: int, db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    from sqlalchemy import select
    return db.scalars(
        select(MudancaStatus).where(MudancaStatus.projeto_id == projeto_id).order_by(MudancaStatus.criado_em)
    ).all()
