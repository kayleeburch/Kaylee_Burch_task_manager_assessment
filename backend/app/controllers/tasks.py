from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Task

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/tasks', methods=['GET', 'POST'])
@jwt_required()
def handle_tasks():
    current_user_id = get_jwt_identity()
    if request.method == 'GET':
        tasks = Task.query.filter(Task.user_id == current_user_id).all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
    elif request.method == 'POST':
        data = request.get_json()
        new_task = Task(title=data['title'], description=data.get('description'), completed=False, user_id=current_user_id)
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'message': 'Task created successfully.'}), 201


@tasks_bp.route('/tasks/<task_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_task_by_id(task_id):
    try:
        task = Task.query.get(task_id)
        if task is None:
            raise ValueError("Task not found")
    except ValueError as e:
        return jsonify({'error': str(e)}), 404
    if request.method == 'PUT':
        data = request.get_json()
        if 'title' in data:
            task.title = data['title']
        if 'description' in data:
            task.description = data['description']
        if 'completed' in data:
            task.completed = data['completed']
        db.session.commit()
        return jsonify({'message': 'Task updated successfully.'}), 200
    elif request.method == 'DELETE':
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully.'}), 200
    