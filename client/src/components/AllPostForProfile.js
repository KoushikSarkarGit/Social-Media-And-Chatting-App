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
import CommentLiteComp from './CommentLiteComp'

export default function AllPostForProfile({ selectedtab }) {

    const [postlist, setPostlist] = useState([])
    const [likedpostlist, setLikedpostlist] = useState([])
    const [repostedlist, setRepostedlist] = useState([])
    const [commentlist, setCommentlist] = useState([])
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
                        // console.log(res.data)
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
                        setTotalpostno(res.data.res.data.fetchedLikedPost[0].likedpostCount)
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



    const getRepostedPostsofLoggedUser = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/post/get-reposted-post-of-logged-user/${page}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {
                    if (res.data.success === true) {

                        setRepostedlist([...repostedlist, ...res.data.fetchedRepostedPosts[0].repostedposts])
                        setTotalpostno(res.data.fetchedRepostedPosts[0].totalrepostcount)
                        // console.log(res.data.fetchedRepostedPosts[0].repostedposts)
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


    const getCommentsofLoggedUser = async () => {
        try {
            if (jwtToken) {

                await axios.get(`http://localhost:9000/api/v1/comments/get-comments-of-logged-user/${page}`, {
                    headers: {
                        token: jwtToken
                    }
                }).then(async (res) => {
                    if (res.data.success === true) {

                        setCommentlist([...commentlist, ...res.data.LoggedUserComments])
                        setTotalpostno(res.data.totalCommentCount)
                        console.log(res.data.LoggedUserComments)
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
        setLikedpostlist([])
        setPostlist([])
        setRepostedlist([])
        setTotalpostno(0)
        setPage(1)
        if (selectedtab === 'YourPosts') {
            getUserPosts()
        }


        else if (selectedtab === 'Liked') {

            getLikedPostsofLoggedUser()

        }
        else if (selectedtab === 'Reposts') {

            getRepostedPostsofLoggedUser()

        }
        else if (selectedtab === 'Comments') {

            getCommentsofLoggedUser()

        } else {
            console.log('others are not implimented yet')
        }

    }, [jwtToken, selectedtab]);






    return (
        <div className='allpostbox'>



            {selectedtab === 'YourPosts' &&
                postlist.map((item, index) => {
                    return <SinglePostForProfile pdata={item} key={index} />
                })
            }

            {selectedtab === 'Liked' &&
                likedpostlist.map((item, index) => {
                    return <SinglePostIterable pid={item} jwtToken={jwtToken} key={index} />
                })
            }


            {selectedtab === 'Reposts' &&
                repostedlist.map((item, index) => {
                    return <SinglePostIterable pid={item} jwtToken={jwtToken} key={index} />
                })
            }


            {selectedtab === 'Comments' &&
                commentlist.map((item, index) => {
                    return <CommentLiteComp commentdata={item} jwtToken={jwtToken} key={index} />
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
