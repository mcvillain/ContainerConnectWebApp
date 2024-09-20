from flask import Blueprint, jsonify, request
from flask_login import login_required
from models.user import db

data_bp = Blueprint('data', __name__)

class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@data_bp.route('/api/data', methods=['GET'])
@login_required
def get_data():
    data = Data.query.filter_by(user_id=current_user.id).all()
    return jsonify([{'id': item.id, 'content': item.content} for item in data])

@data_bp.route('/api/data', methods=['POST'])
@login_required
def create_data():
    content = request.json.get('content')
    if not content:
        return jsonify({'error': 'Content is required'}), 400
    
    new_data = Data(content=content, user_id=current_user.id)
    db.session.add(new_data)
    db.session.commit()
    return jsonify({'id': new_data.id, 'content': new_data.content}), 201

@data_bp.route('/api/data/<int:id>', methods=['PUT'])
@login_required
def update_data(id):
    data = Data.query.get_or_404(id)
    if data.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    content = request.json.get('content')
    if not content:
        return jsonify({'error': 'Content is required'}), 400
    
    data.content = content
    db.session.commit()
    return jsonify({'id': data.id, 'content': data.content})

@data_bp.route('/api/data/<int:id>', methods=['DELETE'])
@login_required
def delete_data(id):
    data = Data.query.get_or_404(id)
    if data.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.session.delete(data)
    db.session.commit()
    return jsonify({'message': 'Data deleted successfully'})
