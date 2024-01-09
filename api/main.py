from typing import Any
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from chessdotcom import get_player_game_archives, Client, ChessDotComResponse
import pandas as pd

from helpers import create_df_from_headers, parse_games

user_agent_header = "Chess.com Opening Recommender (username: ragizaki, contact: zakimachfj@gmail.com"

Client.request_config["headers"]["User-Agent"] = user_agent_header

origins = ["http://localhost:5173", "https://api.chess.com"]

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

@app.get("/api")
def index():
    return {"message": "This is working!"}

@app.get("/api/recommend/{username}")
def recommend_openings_for_player(username: str):
    archives: ChessDotComResponse = get_player_game_archives(username)
    recent_archives = archives.json["archives"][-5:] # 5 months of most recent games
    headers = []

    for archive in recent_archives:
        response = requests.get(archive, headers={"User-Agent": user_agent_header})
        games = response.json()["games"]
        allowed_time_formats = ["rapid", "blitz"]
        parsed_headers = parse_games(games, allowed_time_formats)
        headers.extend(parsed_headers)
       

    games_df = create_df_from_headers(headers, username)
                
    return {"username": username}