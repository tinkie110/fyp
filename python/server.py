import flask
import xxx
from flask import jsonify
from flask import request

app = flask.Flask(__name__)
app.config['DEBUG'] = True



@app.route('/hi', methods=['GET'])
def home():
    args = request.args
    print(args)
    return jsonify(xxx.gen_suggestion(int (args['user'])))

app.run()