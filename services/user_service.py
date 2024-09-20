from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from models.user import User, db

user_bp = Blueprint('user', __name__)

@user_bp.route('/api/user', methods=['GET'])
@login_required
def get_user():
    return jsonify({
        'id': current_user.id,
        'username': current_user.username,
        'email': current_user.email
    })

@user_bp.route('/api/user', methods=['PUT'])
@login_required
def update_user():
    data = request.json
    user = User.query.get(current_user.id)
    
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@user_bp.route('/api/user', methods=['DELETE'])
@login_required
def delete_user():
    user = User.query.get(current_user.id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})
