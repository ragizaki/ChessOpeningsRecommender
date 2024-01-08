from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = ["http://localhost:5173", "https://api.chess.com"]

app = FastAPI(title="Chess.com Opening Recommender", description="API for Chess.com Opening Recommender", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])