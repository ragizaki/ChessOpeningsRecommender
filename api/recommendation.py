import pandas as pd
import random
from collections import defaultdict
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity


def create_user_profile(games_df: pd.DataFrame) -> pd.DataFrame:
    """
    Creates a user profile from the games DataFrame, containing the user's preference score for each ECO category.
    """
    user_profile = games_df.groupby("ECO").agg({
        "DidUserWin": ["mean", "count", "sum"]
    })

    # Flatten the MultiIndex columns
    user_profile.columns = [col[1] if col[1] else col[0] for col in user_profile.columns]

    user_profile.rename(columns={
        "mean": "mean_win_rate",
        "count": "games_played_count",
        "sum": "games_won_count"
    }, inplace=True)

    user_profile.reset_index(inplace=True)

    return user_profile


def calculate_similarity(user_profile: pd.DataFrame) -> float:
    """
    Calculate the similarity between the user profile and the eco category profile using cosine similarity
    Implements normalization and feature engineering of preference score and count.
    """
    features = ["mean_win_rate", "games_won_count"]
    user_vector = user_profile.loc[:, features].to_numpy().reshape(1, -1)
    return cosine_similarity(user_vector)[0][0]


def recommend_openings(games_df: pd.DataFrame, eco_df: pd.DataFrame, num_recommendations: int = 5) -> list[tuple[str, float]]:
    """
    Recommends openings based on the user's games.
    """
    user_profile = create_user_profile(games_df)

    recommendation_list = []
    recommendations = defaultdict(list)

    for _, eco_category_profile in eco_df.iterrows():
        similarity = calculate_similarity(user_profile)
        recommendation_list.append((eco_category_profile.to_list(), similarity))
    
    recommendation_list.sort(key=lambda x: x[1], reverse=True)
    recommendation_list = random.sample(recommendation_list, num_recommendations)

    for recommendation in recommendation_list[:num_recommendations]:
        eco_category_profile, similarity = recommendation
        category, name, moves = eco_category_profile[:3]
        recommendations[category].append((name, moves))

    return recommendations
