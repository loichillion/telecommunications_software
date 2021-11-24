from flask import Flask, jsonify, request
app = Flask(__name__)

@app.route('/')
def index():
    return 'Flask Application for Telecommunication software'

data = {
    'course': 411,
    "courseName": "Software in Telecommunications",
    "releaseYear": 2021,
    "courseActive": True,
    "droppedStudents": None,
    "date": "06/10/2021",
    "someData": [[11, 2], [22, 4], [33, 1], [44, 5]],
    "scores": {"a": 77, "b": 46, "c": 91}
    }

@app.route('/data', methods=['GET'])
def return_data():
    return jsonify(data)

@app.route('/someData', methods=['GET'])
def return_someData():
    return jsonify(data['someData'])

@app.route('/scores', methods=['GET'])
def return_scores():
    return jsonify(data['scores'])

@app.route("/scores", methods=['POST'])
def add_score():
    new_score_key= request.json['new_score']
    new_score_value = request.json['new_score_value']
    new_score = {
        new_score_key: new_score_value,
    }
    (data["scores"])[new_score_key] = new_score_value
    return "200"