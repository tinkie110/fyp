import flask
import xxx
from flask import jsonify
from flask import request
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app)
app.config['DEBUG'] = True
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
def home():
    args = request.args
    print(args)
    return jsonify(xxx.gen_suggestion(int (args['user'])))

app.run()