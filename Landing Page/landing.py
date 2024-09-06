from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import logging
import uvicorn

# Configure logging
logging.basicConfig(
    level=logging.INFO,  
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler()  # Log to console
    ]
)

# Create a logger instance
logger = logging.getLogger(__name__)

# FastAPI instance
app = FastAPI()

# SQLite database setup
DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# SQLAlchemy Base
Base = declarative_base()

# User Model
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

# Create the database table
Base.metadata.create_all(bind=engine)
logger.info("Database connected and tables created.")

# Pydantic Models
class SignUpRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Signup Route
@app.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(request: SignUpRequest, db: Session = Depends(get_db)):
    logger.info(f"Received signup request for username: {request.username}")
    
    # Check if user already exists
    user = db.query(User).filter(User.username == request.username).first()
    if user:
        logger.warning(f"Signup failed - Username {request.username} already exists.")
        raise HTTPException(status_code=400, detail="Username already exists.")

    # Store the user in the database
    try:
        new_user = User(username=request.username, password=request.password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        logger.info(f"Signup successful for username: {request.username}")
        return {"message": "Signup successful!"}
    except Exception as e:
        logger.error(f"Error during signup for username {request.username}: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Login Route
@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    logger.info(f"Received login request for username: {request.username}")
    
    # Check if the user exists
    user = db.query(User).filter(User.username == request.username).first()
    if not user or user.password != request.password:
        logger.warning(f"Login failed - Invalid username or password for username {request.username}.")
        raise HTTPException(status_code=400, detail="Invalid username or password.")

    # Successful login
    logger.info(f"Login successful for username: {request.username}")
    return {"message": "Login successful!"}

if __name__ == "__main__":
    logger.info("Starting FastAPI application...")
    uvicorn.run(app, host="127.0.0.1", port=8000)
