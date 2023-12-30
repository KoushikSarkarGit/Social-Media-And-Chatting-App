import React, { useContext, useEffect, useState } from 'react'
import postPic1 from '../img/postpic1.jpg'
import postPic2 from '../img/postpic2.jpg'
import postPic3 from '../img/postpic3.JPG'

import '../pagecss/allpostcomp.css'
import '../pagecss/followercard.css'

import axios from 'axios'
import toast from 'react-hot-toast'
import { Appcontext } from '../ContextFolder/ContextCreator'
import SinglePostForProfile from './SinglePostForProfile'
import SinglePostIterable from './SinglePostIterable'


export default function AllPostForProfile({ selectedtab }) {

    const [postlist, setPostlist] = useState([])
    const [likedpostlist, setLikedpostlist] = useState([])
    const [page, setPage] = useState(1)
    const [totalpostno, setTotalpostno] = useState()

    const cur = useContext(Appcontext);
    const { jwtToken } = cur;

    const getUserPosts = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/post/get-posts-of-logged-user/${page}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {

                    if (res.data.success === true) {
                        setPostlist([...postlist, ...res.data.fetchedpost])
                        setTotalpostno(res.data.totalPostsCount.totalpostno)
                        console.log(res.data)
                    }



                }).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')
                })
            }

        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }



    const getLikedPostsofLoggedUser = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/post/get-liked-post-of-logged-user/${page}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {
                    if (res.data.success === true) {
                        setLikedpostlist([...likedpostlist, ...res.data.fetchedLikedPost[0].likedPost])
                        // setTotalpostno(res.data.res.data.fetchedLikedPost[0].likedpostCount)
                        console.log(res.data.fetchedLikedPost[0].likedPost)
                    }

                }).catch((err) => {
                    console.log(err)
                    toast.error('some internal axios error occured')
                })
            }

        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
        }
    }


    useEffect(() => {
        if (selectedtab === 'YourPosts') {
            getUserPosts()
        }
        if (selectedtab === 'Liked') {

            getLikedPostsofLoggedUser()

        } else {
            console.log('others are not implimented yet')
        }

    }, [jwtToken, selectedtab]);






    return (
        <div className='allpostbox'>

            {/* {postlist.map((item, index) => {
                return <SinglePostForProfile pdata={item} key={index} />
            })

            } */}


            {
                likedpostlist.map((item, index) => {
                    return <SinglePostIterable pid={item} jwtToken={jwtToken} key={index} />
                })
            }


            {!(page * 10 > totalpostno) && <button className="morefollowers"
                onClick={async () => {
                    await setPage(page + 1)
                    await getUserPosts();
                    // await console.log(pageno, morefollowerlist)
                }} ><hr className='morefhr' /> <h6> Load More</h6> </button>}

        </div>
    )
}
