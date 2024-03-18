from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from app import db
from app.models import User

users_bp = Blueprint('users', __name__)

@users_bp.route('/api/auth/validate', methods=['GET'])
@jwt_required()
def validate_token():
    # If the token is valid, get_jwt_identity() will return the identity of
    # the JWT. If no valid token is present, the jwt_required() decorator
    # will send a 401 response.
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@users_bp.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    name = request.json['name']
    password = request.json['password']
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400
    password_hash = generate_password_hash(password)
    user = User(username=username, name=name, password=password_hash)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201

@users_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401

@users_bp.route('/users', methods=['GET'])
@jwt_required()
def users():
    users = User.query.all()
    return jsonify([{'id': user.id, 'username': user.username, 'name': user.name} for user in users]), 200

@users_bp.route('/current_user', methods=['GET'])
@jwt_required()
def current_user():
    current_user = get_jwt_identity()
    user = User.query.filter_by(username=current_user).first()
    return jsonify({'id': user.id, 'username': user.username, 'name': user.name}), 200