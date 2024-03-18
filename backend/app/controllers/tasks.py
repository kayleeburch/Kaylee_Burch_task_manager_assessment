from flask import Blueprint, request, jsonify
from app import db
from app.models import Task

tasks_bp = Blueprint('tasks', __name__)

@tasks_bp.route('/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'GET':
        tasks = Task.query.all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
    elif request.method == 'POST':
        data = request.get_json()
        new_task = Task(title=data['title'], description=data.get('description'), completed=False)
        db.session.add(new_task)
        db.session.commit()
        return jsonify({'message': 'Task created successfully.'}), 201

# Add more routes here
@tasks_bp.route('/tasks/<task_id>', methods=['PUT', 'DELETE'])
def handle_task_by_id():
    try:
        data = request.get_json()
        task = Task.query.get(data['id'])
    except:
        return jsonify({'message': 'Task not found.'}), 404
    if request.method == 'PUT':
        task.title = data['title']
        task.description = data.get('description')
        task.completed = data['completed']
        db.session.commit()
        return jsonify({'message': 'Task updated successfully.'}), 200
    elif request.method == 'DELETE':
        db.session.delete(task)
        db.session.commit()
        return jsonify({'message': 'Task deleted successfully.'}), 200
    