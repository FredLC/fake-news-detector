from flask import Flask, request, jsonify
from model import predict_fake_news
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["POST"])
def index():
    data = request.json
    text = data.get("text", "")
    result = predict_fake_news(text)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)



