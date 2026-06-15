from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routers import auth, projetos, mentores, agendamentos, avaliacoes, formularios

Base.metadata.create_all(bind=engine)

app = FastAPI(title="APS - Acervo de Projetos Senac API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(projetos.router)
app.include_router(mentores.router)
app.include_router(agendamentos.router)
app.include_router(avaliacoes.router)
app.include_router(formularios.router)

@app.get("/")
def home():
    return {"mensagem": "API APS funcionando"}
