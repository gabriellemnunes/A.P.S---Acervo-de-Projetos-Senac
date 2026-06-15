from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select
from ..database import get_db
from ..models import Usuario
from ..schemas import UsuarioCreate, LoginRequest, TokenOut, UsuarioOut
from ..security import hash_password, verify_password, create_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=TokenOut)
def register(data: UsuarioCreate, db: Session = Depends(get_db)):
    exists = db.scalar(select(Usuario).where(Usuario.email == data.email))
    if exists:
        raise HTTPException(status_code=400, detail="E-mail já cadastrado")
    user = Usuario(
        nome=data.nome,
        email=data.email,
        matricula=data.matricula,
        perfil=data.perfil,
        senha_hash=hash_password(data.password),
    )
    db.add(user); db.commit(); db.refresh(user)
    return {"access_token": create_token(user), "user": user}

@router.post("/login", response_model=TokenOut)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.scalar(select(Usuario).where(Usuario.email == data.email))
    if not user or not verify_password(data.password, user.senha_hash):
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos")
    return {"access_token": create_token(user), "user": user}

@router.get("/me", response_model=UsuarioOut)
def me(user: Usuario = Depends(get_current_user)):
    return user
