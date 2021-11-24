import flask
import sys
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

data = {
    'course': 411,
    'courseName': "Software in Telecommunications",
    'releaseYear': 2021,
    'courseActiv': True,
    'droppedStudents': None,
    'date': 20210218,
    'someData': [[11, 2], [22, 4], [33, 1], [44, 5]],
    'scores': {'a': 77, 'b': 46, 'c': 91}
}


@app.route('/', methods=['GET'])
def api_all():
    return jsonify(data)


@app.route('/scores', methods=['GET'])
def api_scores():
    return jsonify(data['scores'])


@app.route('/scores/<int:n>', methods=['GET'])
def api_get_score(n):
    scores = list(data['scores'])
    if n < len(scores):
        print(f'{scores}', file=sys.stderr)
        return (jsonify({scores[n]: data['scores'][scores[n]]}))
    return page_not_found(404)


@app.route('/scores', methods=['POST'])
def api_post_score():
    value = request.json['value']
    key = request.json['key']
    data["scores"][key] = value
    return jsonify(api_scores)


@app.route('/scores/<int:n>', methods=['PUT'])
def api_put_score(n):
    scores = list(data['scores'])
    if n < len(scores):
        value = request.json['value']
        key = request.json['key']
        if key != scores[n]:
            del data['scores'][scores[n]]
        data["scores"][key] = value

        return jsonify(api_scores)
    return page_not_found(404)


@app.route('/scores/<int:n>', methods=['PATCH'])
def api_patch_score(n):
    scores = list(data['scores'])
    if n < len(scores):
        value = ''
        key = ''
        try:
            value = request.json['value']
        except:
            None
        try:
            key = request.json['key']
        except:
            None

        if key == '':
            if value != '':
                data["scores"][scores[n]] = value
        else:
            if value == '':
                data["scores"][key] = data["scores"][scores[n]]
            else:
                data["scores"][key] = value
            if key != scores[n]:
                data["scores"].pop(scores[n])

        return jsonify(api_scores)
    return page_not_found(404)


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


app.run()