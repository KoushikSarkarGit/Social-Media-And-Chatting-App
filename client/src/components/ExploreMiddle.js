import React, { useState } from 'react'
import Searchbar from './Searchbar'
import SinglePostcomponent from './SinglePostcomponent'
import '../pagecss/explorepage.css'
import '../pagecss/followercard.css'

import postPic1 from '../img/postpic1.jpg'
import postPic2 from '../img/postpic2.jpg'
import postPic3 from '../img/postpic3.JPG'
import SearchUserElement from './SearchUserElement'
import axios from 'axios'
import toast from 'react-hot-toast'






export default function ExploreMiddle() {


    const [searchval, setSearchval] = useState([])
    const [uselist, setUselist] = useState([])
    const [selectedoption, setSelectedoption] = useState([])


    const getSearcgedUsers = async () => {
        try {

            await axios.get(`http://localhost:9000/api/v1/user/get-people-by-keyword/${searchval}/1`).then(async (res) => {

                if (res.data.success === true) {

                    setUselist(res.data.matchingUsers)

                    console.log(res.data)
                }



            }).catch((err) => {
                console.log(err)
                toast.error('some internal axios error occured')
            })


        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }


    const handleSearch = async (searchInput) => {
        await setSearchval(searchInput);
        await getSearcgedUsers(searchInput);
    };


    const allpostdata = [
        {
            img: postPic1,
            name: 'Tzuyu',
            desc: "Happy New Year all friends! #2023",
            likes: 2300,
            liked: true
        },
        {
            img: postPic2,
            name: 'Maryam',
            desc: "Party time :)",
            likes: 2300,
            liked: false

        },
        {
            img: postPic3,
            name: "Salena Gomez",
            desc: "At Archery Festival",
            likes: 3800,
            liked: false
        }
    ]

    return (
        <div className='exploremiddlebox'>
            <Searchbar onSearch={handleSearch} />

            <div className="chooseSearchOption">
                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Posts
                        </label>
                    </div>
                </div>


                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            People
                        </label>
                    </div>
                </div>


                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                            Tags
                        </label>
                    </div>
                </div>


            </div>

            <div className="searchResultsBox">

                <div><h4 className='px-2 text-center'>results for </h4></div>

                {/* {
                    allpostdata.map((item, index) => {
                        return <SinglePostcomponent pdata={item} key={index} />
                    })

                } */}


                {/* <SearchUserElement /> */}


                {
                    uselist.map((item, index) => {
                        return <SearchUserElement udata={item} key={index} />
                    })

                }


            </div>



        </div>
    )
}
