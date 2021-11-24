from flask import Flask
import requests
import json

app = Flask(__name__)

url = requests.get("https://4v9r83qfo4.execute-api.eu-central-1.amazonaws.com/dev")
text = url.text
data = json.loads(text)
scores = list(data['scores'])


# %%
@app.route('/', methods=['GET'])
def thedata():
    return (data)


@app.route('/scores', methods=['GET'])
def thescores():
    return (data["scores"])


@app.route('/scores/<int:n>', methods=['GET'])
def thescoresn(n):
    if (n - 1 < len(scores) - 1):
        indexn = scores[n - 1]
        scoresn = data['scores'][indexn]
        newlist = {
            indexn: scoresn
        }
    return (newlist)


@app.route('/scores', methods=['POST'])
def add_score_post_scores():
    add_inex = requests.json['adding_index']
    add_values = requests.json['adding_values']
    (data['scores'])[add_inex] = add_values
    return (thescores)


@app.route('/scores/<int:n>', methods=['PUT'])
def add_score_put_scores(n):
    if n < len(scores):
        add_index = requests.json['adding_index']
        add_values = requests.json['adding_values']
        if add_index != scores[n]:
            del data['scores'][scores[n]]
        data['scores'][add_index] = add_values
        return (thescores)


if __name__ == '__main__':
    app.run()