import React, { useState } from 'react';
import './styles/SearchInput.css'; // Подключаем файл стилей для поиска

const SearchInput = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    const performSearch = () => {
        onSearch(searchTerm.trim()); // Вызываем функцию onSearch с поисковым запросом
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Поиск..."
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="search-input"
            />
            <button className="search-button" onClick={performSearch}>
                &#128269; {/* Символ лупы */}
            </button>
        </div>
    );
};

export default SearchInput;
