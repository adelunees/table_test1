import React from 'react';
import './styles/UserModal.css';

const UserModal = ({ user, onClose }) => {
    return (
        <div className="modal">
            <div className="ticket">
                <span className="close" onClick={onClose}>&times;</span>
                <div className="ticket-header">
                    <h2>{`${user.firstName} ${user.lastName}`}</h2>
                </div>
                <div className="ticket-details">
                    <p><strong>Имя:</strong> {user.firstName}</p>
                    <p><strong>Фамилия:</strong> {user.lastName}</p>
                    <p><strong>Возраст:</strong> {user.age}</p>
                    <p><strong>Пол:</strong> {user.gender}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                    <p><strong>Адрес:</strong> {user.address.city}, {user.address.address}</p>
                    <p><strong>Рост:</strong> {user.height} см</p>
                    <p><strong>Вес:</strong> {user.weight} кг</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
