import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import '../pagecss/rightofhome.css'
import toast from 'react-hot-toast';

export default function Searchbar({ onSearch }) {

    const [searchInput, setSearchInput] = useState('');

    const handleKeyPress = (event) => {
        if ((event.key === 'Enter' || event.keyCode === 13) && searchInput.trim() === '') {
            event.preventDefault();
            toast.error('Please enter some value');
        } else if (event.key === 'Enter' || event.keyCode === 13) {
            onSearch(searchInput);
            console.log(searchInput)
        }
    };


    const handleSearchIconClick = () => {
        if (searchInput.trim() === '' || searchInput === null) {
            toast.error('Please enter some value');
        } else {
            onSearch(searchInput);
            console.log(searchInput)
        }
    };

    return (

        <div className="logosearchbar">

            <input type="text"
                placeholder='Search People or Post'
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyPress}
            />

            <button className="btn btn-primary searchicon" onClick={handleSearchIconClick}>
                <UilSearch />
            </button>

        </div>

    )
}
