import pandas as pd
import numpy as np

def load_data(split_name='train', columns=['text', 'stars']):
    try:
        print(f"select [{', '.join(columns)}] columns from the {split_name} split")
        df = pd.read_csv(f'{split_name}.csv')
        df = df.loc[:,columns]
        print("succeed!")
        return df
    except:
        print("Failed, then try to ")
        print(f"select all columns from the {split_name} split")
        df = pd.read_csv(f'{split_name}.csv')
        return df

matrix = load_data('matrix', "full")
subset = matrix.iloc[509:, 0:]
movies = load_data('movies', ['movieId', 'title'])

def cos_sim(userA, userB):
    userArt = subset.loc[subset['UserId'] == userA].to_numpy().flatten()[1:]
    userBrt = subset.loc[subset['UserId'] == userB].to_numpy().flatten()[1:]
    mask = ~(np.isnan(userArt) | np.isnan(userBrt))
    if mask.sum() < 4:
         return -2
    return np.dot(userArt[mask], userBrt[mask]) / (np.sqrt(np.dot(userArt[mask], userArt[mask])) * np.sqrt(np.dot(userBrt[mask], userBrt[mask])))

def find_most_sim_user(cur_user):
    max_sim = -2
    max_user = -1
    for user in subset['UserId'].to_numpy():
        if user == cur_user:
            continue
        sim = cos_sim(cur_user, user)
        if sim > max_sim:
            max_sim = sim
            max_user = user
    return max_user

def find_new_movie(cur_user, sim_user, n):
    userArt = subset.loc[subset['UserId'] == cur_user].to_numpy().flatten()[1:]
    userBrt = subset.loc[subset['UserId'] == sim_user].to_numpy().flatten()[1:]
    mask = np.isnan(userArt) & ~(np.isnan(userBrt))
    movieIds = np.argwhere(mask).flatten()+1
    movie_titles = movies['title'] [movies['movieId'].isin(movieIds)].to_numpy()
    #np.random.shuffle(movie_titles)
    suggestions = movie_titles.tolist()
    if len(suggestions) <= n:
        return (suggestions, movieIds)
    else:
        return (suggestions[:n], movieIds[:n].tolist())

def gen_suggestion(cur_user, n):
    sim_user = find_most_sim_user(cur_user)
    return find_new_movie(cur_user, sim_user, n)

def list_movies():
    movie_list = movies['title']
    return (movie_list.tolist()[:50], list(range(1, 51)))

def update_rating(user_id, movie_id, rating):
    user = (subset['UserId'] == user_id).argmax()
    subset.iloc[user, movie_id] = rating
    return True
    
