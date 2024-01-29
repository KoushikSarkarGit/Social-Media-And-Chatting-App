import React, { useContext, useEffect, useState } from 'react'


import '../pagecss/allpostcomp.css'
import '../pagecss/followercard.css'

import axios from 'axios'
import toast from 'react-hot-toast'
import { Appcontext } from '../ContextFolder/ContextCreator'
import SinglePostForProfile from './SinglePostForProfile'
import SinglePostIterable from './SinglePostIterable'
import CommentLiteComp from './CommentLiteComp'
import EmptyBox from './EmptyBox'
import UserSinglePostIterable from './UserSinglePostIterable'
import UserSinglePostForProfile from './UserSinglePostForProfile'
import UserCommentLiteComp from './UserCommentLiteComp'

export default function UserAllPostForProfile({ selectedtab, userId }) {


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


            await axios.post(`http://localhost:9000/api/v1/post/userprofile-get-posts-of-logged-user/${page}`,
                {
                    curuserid: userId
                }).then(async (res) => {

                    if (res.data.success === true) {
                        setPostlist(prevPostlist => [...prevPostlist, ...res.data.fetchedpost])
                        setTotalpostno(res.data.totalPostsCount.totalpostno)
                        // console.log(res.data)
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



    const getLikedPostsofLoggedUser = async () => {
        try {


            await axios.post(`http://localhost:9000/api/v1/post/userprofile-get-liked-post-of-logged-user/${page}`,
                {
                    curuserid: userId
                }
            ).then(async (res) => {

                if (res.data.success === true) {


                    setLikedpostlist(prevPostlist => [...prevPostlist, ...res.data.fetchedLikedPost[0].likedposts])
                    setTotalpostno(res.data.fetchedLikedPost[0].totalLikecount)
                    // console.log(res.data)
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



    const getRepostedPostsofLoggedUser = async () => {
        try {


            await axios.post(`http://localhost:9000/api/v1/post/userprofile-get-reposted-post-of-logged-user/${page}`,
                {
                    curuserid: userId
                }
            ).then(async (res) => {
                if (res.data.success === true) {

                    setRepostedlist(prevPostlist => [...prevPostlist, ...res.data.fetchedRepostedPosts[0].repostedposts])
                    setTotalpostno(res.data.fetchedRepostedPosts[0].totalrepostcount)
                    // console.log(res.data.fetchedRepostedPosts[0].repostedposts)
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


    const getCommentsofLoggedUser = async () => {
        try {


            await axios.post(`http://localhost:9000/api/v1/comments/userprofile-get-comments-of-logged-user/${page}`,

                {
                    curuserid: userId
                }

            ).then(async (res) => {
                if (res.data.success === true) {

                    setCommentlist(prevCommentlist => [...prevCommentlist, ...res.data.LoggedUserComments])
                    setTotalpostno(res.data.totalCommentCount)
                    // console.log(res.data.LoggedUserComments)
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
        setLikedpostlist([])
        setPostlist([])
        setRepostedlist([])
        setCommentlist([])
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
                <>
                    {
                        postlist.length > 0 ?
                            postlist.map((item, index) => {
                                return <UserSinglePostForProfile pdata={item} key={index} />
                            })
                            :
                            <EmptyBox />
                    }
                </>
            }

            {selectedtab === 'Liked' &&
                <>
                    {likedpostlist.length > 0 ?
                        likedpostlist.map((item, index) => {
                            return <UserSinglePostIterable pid={item} userId={userId} jwtToken={jwtToken} key={index} />
                        })
                        :


                        <EmptyBox />

                    }
                </>

            }


            {selectedtab === 'Reposts' &&
                <>
                    {repostedlist.length > 0 ?
                        repostedlist.map((item, index) => {
                            return <UserSinglePostIterable pid={item} userId={userId} jwtToken={jwtToken} key={index} />
                        })
                        :
                        <EmptyBox />
                    }
                </>
            }


            {selectedtab === 'Comments' &&
                <>
                    {commentlist.length > 0 ?
                        commentlist.map((item, index) => {
                            return <UserCommentLiteComp commentdata={item} jwtToken={jwtToken} key={index} />
                        })
                        :
                        <EmptyBox />

                    }
                </>

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
