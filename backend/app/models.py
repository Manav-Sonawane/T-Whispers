from sqlalchemy import Column, Integer, String, DateTime, func
from .database import Base

class Confession(Base):
    __tablename__ = "confessions"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(String(2000), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    upvotes = Column(Integer, default=0)
    downvotes = Column(Integer, default=0)
