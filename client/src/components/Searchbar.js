import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import '../pagecss/rightofhome.css'
import toast from 'react-hot-toast';

export default function Searchbar({ searchval, setSearchval, getSearchedUsers, getSearchedPosts, selectedoption, getSearchedTaggedPosts, setifsearched, setPostlist, setTaggedpostlist, setuserlist }) {



    const handleKeyPress = async (event) => {








        if ((event.key === 'Enter' || event.keyCode === 13) && searchval.trim() === '') {
            event.preventDefault();
            toast.error('Please enter some value');
        } else if (event.key === 'Enter' || event.keyCode === 13) {

            if (selectedoption === 'posts') {
                await setPostlist([])
                getSearchedPosts()
                setifsearched(true)
            }
            else if (selectedoption === 'people') {

                await setuserlist([])
                getSearchedUsers()
                setifsearched(true)
            }
            else if (selectedoption === 'tags') {
                await setTaggedpostlist([])
                getSearchedTaggedPosts()
                setifsearched(true)
            }

            // console.log(searchval)
        }
    };


    const handleSearchIconClick = async () => {


        if (searchval.trim() === '' || searchval === null) {
            toast.error('Please enter some value');
        } else {

            if (selectedoption === 'posts') {
                await setPostlist([])
                getSearchedPosts()
                setifsearched(true)
            }
            else if (selectedoption === 'people') {
                await setuserlist([])
                getSearchedUsers()
                setifsearched(true)
            }
            else if (selectedoption === 'tags') {
                await setTaggedpostlist([])
                getSearchedTaggedPosts()
                setifsearched(true)
            }
            // console.log(searchval)
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
