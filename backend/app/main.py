from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import Date, select
from .database import engine, Base, get_session
from .models import Confession
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI(title="T-Whispers API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.post("/confessions/{confession_id}/upvote")
def upvote_confession(confession_id: int, session: Session = Depends(get_session)):
    confession = session.get(Confession, confession_id)
    if not confession:
        raise HTTPException(status_code=404, detail="Confession not found")
    confession.upvotes += 1
    session.commit()
    session.refresh(confession)
    return {"id":confession.id, "upvotes": confession.upvotes, "downvotes": confession.downvotes}

@app.post("/confessions/{confession_id}/downvote")
def downvote_confession(confession_id: int, session: Session = Depends(get_session)):
    confession = session.get(Confession, confession_id)
    if not confession:
        raise HTTPException(status_code=404, detail="Confession not found")
    confession.downvotes += 1
    session.commit()
    session.refresh(confession)
    return {"id":confession.id, "upvotes": confession.upvotes, "downvotes": confession.downvotes}

@app.get("/confession/filter")
def filter_confessions(date: str, session: Session = Depends(get_session)):
    try:
        target_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid date format. Use YYYY-MM-DD.")

    result = session.query(Confession).filter(Confession.created_at.cast(Date) == target_date).order_by(Confession.created_at.desc()).all()

    return result