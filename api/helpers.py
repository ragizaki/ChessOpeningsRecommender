import io
import pandas as pd
from typing import Any

import chess.pgn

def parse_games(games: list[dict], time_formats: list[str]) -> dict[str, Any]:
    """
    Parse games from chess.com API into a dictionary of headers
    Args:
        games (list[dict]): List of games from chess.com API
        time_formats (list[str]): List of time formats to filter games by ("rapid", "blitz", "bullet", "daily")
    """
    headers = []
    for game in games:
        if game["time_class"] in time_formats:
            pgn = io.StringIO(game["pgn"])
            header = vars(chess.pgn.read_headers(pgn))

            if "_tag_roster" in header:
                header.update(header.pop("_tag_roster"))
            if "_others" in header:
                header.update(header.pop("_others"))
            
            headers.append(header)
    return headers


def create_df_from_headers(headers: list[dict[str, Any]], username: str) -> pd.DataFrame:
    """
    Create a dataframe from a list of headers.
    Args:
        headers (list[dict[str, Any]]): List of parsed headers from chess.com API
    """
    df = pd.DataFrame(headers).drop(
        columns=["Event", "Site", "Date", "Round", "Timezone", "UTCDate", "UTCTime", "StartTime", "EndDate", "EndTime"]
    )

    df["Result"] = df["Termination"].apply(lambda termination: termination.split(" ")[0] == username)
    df.drop(columns=["Termination"], inplace=True)
    return df