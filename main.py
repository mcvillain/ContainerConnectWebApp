from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_required, current_user
from config import Config
from services.user_service import user_bp
from services.data_service import data_bp
from services.auth_service import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'

from models.user import User

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

app.register_blueprint(user_bp)
app.register_blueprint(data_bp)
app.register_blueprint(auth_bp)  # Removed url_prefix

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
