from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from .database import engine, Base, get_session
from .models import Confession

app = FastAPI(title="T-Whispers API")

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.get("/confessions")
def get_confessions(session: Session = Depends(get_session)):
    result = session.execute(
        select(Confession).order_by(Confession.created_at.desc()).limit(15)
    )
    return result.scalars().all()

@app.post("/confessions")
def add_confession(content: str, session: Session = Depends(get_session)):
    new_confession = Confession(content=content)
    session.add(new_confession)
    session.commit()
    session.refresh(new_confession)
    return new_confession
