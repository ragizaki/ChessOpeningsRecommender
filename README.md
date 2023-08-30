## Chess Openings Engine

I built a chess openings recommendation engine to learn about data processing, analysis and visualization. My goal was to learn more about data analysis with Python, and to explore my passion for chess

I plan to build an interactive UI to recommend users new chess openings based on their played openings from a popular online chess site (such as Chess.com and Lichess). 

## Tools Used
- Python
- Numpy
- Pandas
- Matplotlib

I ended up implementing a collaborative filtering approach, leveraging the cosine similarity metric to recommend chess openings to users. The data was filtered to include only users who have at least 2 games played in the dataset, and I explored and visualized the variance in the data to explore the feasability of the task initially. 

## Future
I plan to use the logic and findings from this project to build a full application, where users can type in their Chess.com usernames, and I will query their games played using Chess.com's public API, and use similar logic (collaborative filtering and cosine similarity) to recommend openings based on the user's playstyle (attacking, positonal, tactical, strategic, etc). I plan to build this project with Python and Flask on the backend, and visualize the findings with a frontend framework, possibly React.
