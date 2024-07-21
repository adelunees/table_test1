import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import SearchInput from './components/SearchInput';
import UserModal from './components/UserModal';
import './App.css';

const App = () => {
  // Состояния для хранения списка пользователей, отфильтрованных пользователей, статуса загрузки, ошибок и выбранного пользователя
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Использование useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    fetchUsers();
  }, []);

  // Функция для получения списка пользователей с внешнего API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      // Установка полученных данных в состояния
      setUsers(data.users);
      setFilteredUsers(data.users);
      setLoading(false);
    } catch (error) {
      // Обработка ошибок и установка состояния ошибки
      setError(error.message);
      setLoading(false);
    }
  };

  // Функция для обработки поиска пользователей
  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      // Если поисковый запрос пуст, возвращаем полный список пользователей
      setFilteredUsers(users);
      return;
    }
    try {
      // Фильтрация пользователей по имени или фамилии
      const result = users.filter(user =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(result);
    } catch (error) {
      // Обработка ошибок поиска
      setError(error.message);
    }
  };

  // Функция для обработки клика по строке таблицы пользователя
  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  // Отображение состояния загрузки
  if (loading) {
    return <div>Loading...</div>;
  }

  // Отображение ошибки, если она есть
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className="app-container">
        <SearchInput onSearch={handleSearch} />
        <UserTable users={filteredUsers} onRowClick={handleRowClick} />
        {selectedUser && (
            <UserModal user={selectedUser} onClose={handleCloseModal} />
        )}
      </div>
  );
};

export default App;
