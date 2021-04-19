import flask
import movie_logic
from flask import jsonify, request
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app, resource={"*": {"origins": "*"}})
app.config['DEBUG'] = True
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/suggest', methods=['GET'])
def home():
    args = request.args
    print(args)
    response = jsonify(movie_logic.gen_suggestion(int(args['user']), 10))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/movies', methods=['GET'])
def movies():
    return jsonify(movie_logic.list_movies())

@app.route('/rating', methods=['POST'])
def rating():
    args = request.args
    print(args)
    user_id = int(args['user'])
    movie_id = int(args['movie'])
    rating = float(args['rating'])
    response = jsonify('failed')
    if movie_logic.update_rating(user_id, movie_id, rating):
        response = jsonify('success')
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    

app.run()