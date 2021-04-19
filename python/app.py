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
    user_id = int(args['user'])
    if not validuser(user_id):
        response = jsonify('Invalid User')
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    print(args)
    response = jsonify(movie_logic.gen_suggestion(user_id, 10))
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/movies', methods=['GET'])
def movies():
    response = jsonify(movie_logic.list_movies())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/rating', methods=['POST'])
def rating():
    args = request.args
    print(args)
    user_id = int(args['user'])
    if not validuser(user_id):
        response = jsonify('Invalid User')
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response
    movie_id = int(args['movie'])
    rating = float(args['rating'])
    response = jsonify('failed')
    if movie_logic.update_rating(user_id, movie_id, rating):
        response = jsonify('success')
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    
def validuser(user_id):
    if user_id < 509 or user_id > 610:
        return False
    return True

app.run(host='0.0.0.0')