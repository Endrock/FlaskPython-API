from flask import Flask, render_template
from backend.routes import routes

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

routes(app)


if __name__ == "__main__":
    """
    app.run(host="128.199.2.102", port=5000, debug=True)
    """
    app.run(port=5000, debug=True)