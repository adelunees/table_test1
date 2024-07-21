import React, { useState } from 'react';
import './styles/UserTable.css';
import UserModal from './UserModal';

const UserTable = ({ users }) => {
    // Состояние для конфигурации сортировки и выбранного пользователя
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [selectedUser, setSelectedUser] = useState(null);

    // Функция для сортировки пользователей в зависимости от конфигурации сортировки
    const sortedUsers = [...users].sort((a, b) => {
        if (sortConfig.key) {
            let aValue, bValue;
            if (sortConfig.key.includes('.')) {
                // Если ключ содержит точку, обрабатываем вложенные свойства
                const keys = sortConfig.key.split('.');
                aValue = keys.reduce((obj, key) => obj[key], a);
                bValue = keys.reduce((obj, key) => obj[key], b);
            } else {
                aValue = a[sortConfig.key];
                bValue = b[sortConfig.key];
            }

            // Сравнение строк и чисел
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
            }
        }
        return 0;
    });

    // Функция для обработки клика по заголовку столбца и установки конфигурации сортировки
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Функция для получения индикатора сортировки (стрелка вверх или вниз)
    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) {
            return null;
        }
        return sortConfig.direction === 'asc' ? '▲' : '▼';
    };

    // Функция для обработки клика по строке таблицы и установки выбранного пользователя
    const handleRowClick = (user) => {
        setSelectedUser(user);
    };

    // Функция для закрытия модального окна
    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    return (
        <>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('firstName')}>
                        ФИО {getSortIndicator('firstName')}
                    </th>
                    <th onClick={() => handleSort('age')}>
                        Возраст {getSortIndicator('age')}
                    </th>
                    <th onClick={() => handleSort('gender')}>
                        Пол {getSortIndicator('gender')}
                    </th>
                    <th>Номер телефона</th>
                    <th onClick={() => handleSort('address.city')}>
                        Адрес {getSortIndicator('address.city')}
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map((user) => (
                    <tr
                        key={user.id}
                        onClick={() => handleRowClick(user)}
                        className={selectedUser && selectedUser.id === user.id ? 'selected' : ''}
                    >
                        <td>{`${user.firstName} ${user.lastName}`}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{user.phone}</td>
                        <td>{`${user.address.city}, ${user.address.address || 'Unknown street'}`}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
        </>
    );
};

export default UserTable;
