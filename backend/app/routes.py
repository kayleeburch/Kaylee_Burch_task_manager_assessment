from flask import Blueprint, jsonify, request
from .models import Task

bp = Blueprint('tasks', __name__)

# Getting Tasks routes
@bp.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    output = [{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]

    return jsonify(output)

@bp.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    task = Task.query.get_or_404(id)
    return jsonify({'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed})


## Updating Task route
@bp.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    from . import db
    try:
        task = Task.query.get_or_404(id)
        data = request.get_json()

        task.title = data.get('title', task.title)
        task.description = data.get('description', task.description)
        task.completed = data.get('completed', task.completed)

        db.session.commit()

        return jsonify({'message': 'Task updated successfully.'})
    except:
        return jsonify({'message': 'Error updating Task.'}), 500



## Posting New Task route
@bp.route('/tasks', methods=['POST'])
def create_task():
    from . import db
    try:
        data = request.get_json()

        new_task = Task(title=data['title'], description=data.get('description'), completed=False)
        db.session.add(new_task)
        db.session.commit()

        return jsonify({'message': 'Task created successfully.'}), 201
    except:
        return jsonify({'message': 'Error adding Task.'}), 500


## Deleting Task route    
@bp.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    from . import db  # Import db here
    try:
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()

        return jsonify({'message': 'Task deleted successfully.'})
    except:
        return jsonify({'message': 'Error deleting Task.'}), 500