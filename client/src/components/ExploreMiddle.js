import React, { useEffect, useState } from 'react'
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


    const [searchval, setSearchval] = useState('')
    const [userlist, setuserlist] = useState([])
    const [taggedpostlist, setTaggedpostlist] = useState([])
    const [postlist, setPostlist] = useState([])
    const [pageno, setPageno] = useState(1)
    const [selectedoption, setSelectedoption] = useState('people')


    const getSearchedUsers = async () => {
        try {

            await axios.get(`http://localhost:9000/api/v1/user/get-people-by-keyword/${searchval}/1`).then(async (res) => {

                if (res.data.success === true) {

                    setuserlist(res.data.matchingUsers)

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


    const getSearchedPosts = async () => {
        try {

            await axios.get(`http://localhost:9000/api/v1/post/get-post-by-keyword/${searchval}/${pageno}`).then(async (res) => {

                if (res.data.success === true) {

                    setPostlist(res.data.matchingPosts)

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


    const getSearchedTaggedPosts = async () => {
        try {

            await axios.get(`http://localhost:9000/api/v1/post/get-post-by-tags-keyword/${searchval}/${pageno}`).then(async (res) => {

                if (res.data.success === true) {

                    setTaggedpostlist(res.data.matchingPosts)

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

    useEffect(() => {

        setSearchval('')
    }, [selectedoption]);





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
            <Searchbar searchval={searchval} setSearchval={setSearchval} getSearchedUsers={getSearchedUsers} getSearchedPosts={getSearchedPosts} selectedoption={selectedoption} getSearchedTaggedPosts={getSearchedTaggedPosts} />

            <div className="chooseSearchOption">
                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onClick={() => setSelectedoption('posts')} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Posts
                        </label>
                    </div>
                </div>


                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked onClick={() => setSelectedoption('people')} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            People
                        </label>
                    </div>
                </div>


                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" onClick={() => setSelectedoption('tags')} />
                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                            Tags
                        </label>
                    </div>
                </div>


            </div>

            <div className="searchResultsBox">

                <div><h4 className='px-2 text-center'>results for </h4></div>

                {selectedoption === 'posts' &&
                    postlist?.map((item, index) => {
                        return <SinglePostcomponent pdata={item} key={index} />
                    })

                }


                {selectedoption === 'tags' &&
                    taggedpostlist?.map((item, index) => {
                        return <SinglePostcomponent pdata={item} key={index} />
                    })

                }






                {selectedoption === 'people' &&
                    userlist?.map((item, index) => {
                        return <SearchUserElement udata={item} key={index} />
                    })

                }


            </div>



        </div>
    )
}
