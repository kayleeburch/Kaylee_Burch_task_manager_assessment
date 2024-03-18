from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'mock_generated_key'
    app.config['JWT_TOKEN_LOCATION'] = ['headers']
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Token'
    
    jwt = JWTManager(app)
    
    from .controllers.tasks import tasks_bp
    from .controllers.users import users_bp
    app.register_blueprint(tasks_bp)
    app.register_blueprint(users_bp)
    
    CORS(app)
    db.init_app(app)
    
    migrate = Migrate(app, db)

    with app.app_context():
        db.create_all()
    
    return app
