from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from .routes import bp  # Import the Blueprint

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    CORS(app)
    db.init_app(app)

    with app.app_context():
        db.create_all()
        
    app.register_blueprint(bp)  # Register the Blueprint with the app instance

    return app