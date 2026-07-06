from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import (
    auth, projetos, mentores, agendamentos, avaliacoes, formularios,
    status, relatorios, social, metodologias, eventos, admin,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="APS - Acervo de Projetos Senac API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174",
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for r in (
    auth, projetos, mentores, agendamentos, avaliacoes,
    formularios, status, relatorios, social, metodologias, eventos, admin,
):
    app.include_router(r.router)


@app.get("/")
def home():
    return {"mensagem": "API APS funcionando"}
