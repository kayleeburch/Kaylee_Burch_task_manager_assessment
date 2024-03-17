from flask import Blueprint, jsonify

# Create a Blueprint instance
bp = Blueprint('main', __name__)

# Define a simple route as an example
@bp.route('/')
def home():
    return jsonify({'message': 'Hello, World!'})