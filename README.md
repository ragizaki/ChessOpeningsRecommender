## Chess Openings Engine

I built a chess openings recommendation engine to learn about data processing, analysis and visualization. My goal was to implement a reccommendation system using collaborative filtering and the cosine similarity, and then compare this with classic deep learning and machine learning models (neural networks, Random Forest, etc) to see which ones were better suited for the task of recommending openings based on the user's playstyle.

Firstly, I did a small investigative task on a Kaggle dataset of 30,000 chess openings, found in `openings.ipynb`, to see how I could recommend openings on an existing dataset. I used Numpy, Pandas and Matplotlib to implement reccommendation algorithms on the existing data. I also preprocessed the data to clean insignificant entries. The data was filtered to include only users who have at least 2 games played in the dataset, and I explored and visualized the variance in the data to explore the feasability of the task initially.

I then created a React/FastAPI app that implemented these reccommendation algorithms behind the scenes, as well as a Random Forest ML algorithm to classify the user's opening playstyle into one of the 5 ECO openings (A, B, C, D, E).

**See `openings.ipynb` for a brief investigation into a collaborative filtering recommendation system**
Using a Kaggle dataset of 30,000 chess openings from Lichess. The Jupyter Notebook does some feature engineering and implements cosine similarity to recommend users new openings from other similar users, and there are data visualizations using Matplotlib

## App Flow

User inputs their Chess.com username into the React App and press submit. This makes a request to the FastAPI server at `/api/recommend`. This endpoint fetches the user's games from the chess.com API in PGN format, parses the games, and construct a Pandas `DataFrame` from the entries to begin analysis. Then, the recommendation algorithms are applied on the dataset, to recommend the users some new openings, as well as classifying their playstyle into one of the 5 ECO categories.

## Feature Engineering
- Dropped irrelevant columns from the database
- Normalized numerical data on a scale of 0-1
- Implemented Label encoding for categorical data like opening ECO, and one-hot encoding for text-based data like PGN and opening name
- Engineered new columns resulting from a combination of other columns (evaluation after n-moves, indicating the success of the opening)

## Tools Used

- Python
- Numpy
- Pandas
- Matplotlib
- React
- FastAPI
