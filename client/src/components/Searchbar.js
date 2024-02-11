import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import '../pagecss/rightofhome.css'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export default function Searchbar({ selectedoption }) {

    const navigate = useNavigate();
    const { keyword } = useParams();


    const [searchval, setSearchval] = useState(keyword ? keyword : '')


    const handleKeyPress = async (event) => {


        if ((event.key === 'Enter' || event.keyCode === 13) && searchval.trim() === '') {
            event.preventDefault();
            toast.error('Please enter some value');
        } else if (event.key === 'Enter' || event.keyCode === 13) {

            navigate(`/explore/${selectedoption || 'people'}/${searchval}`);


        }
    };


    const handleSearchIconClick = async () => {


        if (searchval.trim() === '' || searchval === null) {
            toast.error('Please enter some value');
        } else {
            navigate(`/explore/${selectedoption || 'people'}/${searchval}`);

        }
    };












    return (

        <div className="logosearchbar">

            <input type="text"
                placeholder='Search People or Post'
                value={searchval}
                onChange={(e) => {
                    setSearchval(e.target.value)
                    // console.log(searchval)
                }}
                onKeyDown={handleKeyPress}
            />

            <button className="btn btn-primary searchicon" onClick={handleSearchIconClick}>
                <UilSearch />
            </button>

        </div>

    )
}
