import io
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import select, func
from openpyxl import Workbook
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

from ..database import get_db
from ..models import Projeto, Usuario, MudancaStatus
from ..security import get_current_user

router = APIRouter(prefix="/relatorios", tags=["Relatórios"])


def exigir_coordenador(user: Usuario) -> None:
    if user.perfil != "coordenador":
        raise HTTPException(status_code=403, detail="Somente a coordenação acessa relatórios")


def montar_dados(db: Session) -> dict:
    por_status = dict(
        db.execute(select(Projeto.status, func.count(Projeto.id)).group_by(Projeto.status)).all()
    )

    limite = datetime.utcnow() - timedelta(days=30)
    abandonados = db.scalar(
        select(func.count(Projeto.id)).where(
            Projeto.atualizado_em < limite, Projeto.status != "desincubado"
        )
    )

    # tempo médio de incubação (dias) para projetos já desincubados
    desincubados = db.scalars(
        select(Projeto).where(Projeto.status == "desincubado")
    ).all()
    if desincubados:
        media_dias = sum(
            (p.atualizado_em - p.criado_em).days for p in desincubados
        ) / len(desincubados)
    else:
        media_dias = 0

    # mentores com mais projetos ativos (via mini-reuniões registradas)
    mentores_ativos = dict(
        db.execute(
            select(MudancaStatus.mentor_id, func.count(func.distinct(MudancaStatus.projeto_id)))
            .where(MudancaStatus.status_novo != "desincubado")
            .group_by(MudancaStatus.mentor_id)
        ).all()
    )

    return {
        "por_status": por_status,
        "abandonados_30_dias": abandonados or 0,
        "tempo_medio_incubacao_dias": round(media_dias, 1),
        "mentores_mais_ativos": mentores_ativos,
    }


@router.get("/excel")
def relatorio_excel(db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    exigir_coordenador(user)
    dados = montar_dados(db)

    wb = Workbook()
    ws = wb.active
    ws.title = "Resumo"
    ws.append(["Status", "Quantidade"])
    for status_, qtd in dados["por_status"].items():
        ws.append([status_, qtd])
    ws.append([])
    ws.append(["Projetos abandonados (+30 dias)", dados["abandonados_30_dias"]])
    ws.append(["Tempo médio de incubação (dias)", dados["tempo_medio_incubacao_dias"]])
    ws.append([])
    ws.append(["Mentor (id)", "Projetos ativos acompanhados"])
    for mentor_id, qtd in dados["mentores_mais_ativos"].items():
        ws.append([mentor_id, qtd])

    buffer = io.BytesIO()
    wb.save(buffer)
    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=relatorio_aps.xlsx"},
    )


@router.get("/pdf")
def relatorio_pdf(db: Session = Depends(get_db), user: Usuario = Depends(get_current_user)):
    exigir_coordenador(user)
    dados = montar_dados(db)

    buffer = io.BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(50, 800, "Relatório APS — Acervo de Projetos Senac")
    c.setFont("Helvetica", 11)
    y = 760
    for status_, qtd in dados["por_status"].items():
        c.drawString(50, y, f"{status_}: {qtd} projeto(s)")
        y -= 20
    y -= 10
    c.drawString(50, y, f"Projetos abandonados (+30 dias): {dados['abandonados_30_dias']}")
    y -= 20
    c.drawString(50, y, f"Tempo médio de incubação: {dados['tempo_medio_incubacao_dias']} dia(s)")
    y -= 30
    c.drawString(50, y, "Mentores com mais projetos ativos:")
    for mentor_id, qtd in dados["mentores_mais_ativos"].items():
        y -= 20
        c.drawString(70, y, f"Mentor #{mentor_id}: {qtd} projeto(s)")
    c.save()
    buffer.seek(0)
    return StreamingResponse(
        buffer,
        media_type="application/pdf",
        headers={"Content-Disposition": "attachment; filename=relatorio_aps.pdf"},
    )
