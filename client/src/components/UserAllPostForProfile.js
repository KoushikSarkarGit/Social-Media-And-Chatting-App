import React, { useContext, useEffect, useState } from 'react'


import '../pagecss/allpostcomp.css'
import '../pagecss/followercard.css'

import axios from 'axios'
import toast from 'react-hot-toast'
import { Appcontext } from '../ContextFolder/ContextCreator'
import EmptyBox from './EmptyBox'
import UserSinglePostIterable from './UserSinglePostIterable'
import UserSinglePostForProfile from './UserSinglePostForProfile'
import UserCommentLiteComp from './UserCommentLiteComp'
import { useParams } from 'react-router-dom'

export default function UserAllPostForProfile({ selectedtab, userId }) {

    const { viewOtherUserProfileuserId } = useParams()

    const [postlist, setPostlist] = useState([])
    const [likedpostlist, setLikedpostlist] = useState([])
    const [repostedlist, setRepostedlist] = useState([])
    const [commentlist, setCommentlist] = useState([])
    const [page, setPage] = useState(1)
    const [totalpostno, setTotalpostno] = useState()

    const cur = useContext(Appcontext);
    const { jwtToken } = cur;

    const getUserPosts = async (manualpage) => {
        try {


            await axios.post(`http://localhost:9000/api/v1/post/userprofile-get-posts-of-logged-user/${manualpage}`,
                {
                    curuserid: userId
                }).then(async (res) => {

                    if (res.data.success === true) {
                        setPostlist(prevPostlist => [...prevPostlist, ...res.data.fetchedpost])
                        setTotalpostno(res.data.totalPostsCount?.totalpostno)
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



    const getLikedPostsofLoggedUser = async (manualpage) => {
        try {


            await axios.post(`http://localhost:9000/api/v1/post/userprofile-get-liked-post-of-logged-user/${manualpage}`,
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



    const getRepostedPostsofLoggedUser = async (manualpage) => {
        try {


            await axios.post(`http://localhost:9000/api/v1/post/userprofile-get-reposted-post-of-logged-user/${manualpage}`,
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


    const getCommentsofLoggedUser = async (manualpage) => {
        try {


            await axios.post(`http://localhost:9000/api/v1/comments/userprofile-get-comments-of-logged-user/${manualpage}`,

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
            getUserPosts(1)
        }


        else if (selectedtab === 'Liked') {

            getLikedPostsofLoggedUser(1)

        }
        else if (selectedtab === 'Reposts') {

            getRepostedPostsofLoggedUser(1)

        }
        else if (selectedtab === 'Comments') {

            getCommentsofLoggedUser(1)

        } else {
            console.log('others are not implimented yet')
        }

    }, [jwtToken, selectedtab, viewOtherUserProfileuserId]);
















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


                    {!(page * 10 > totalpostno) && <button className="morefollowers"
                        onClick={async () => {
                            await getUserPosts(page + 1);
                            await setPage(prevPage => prevPage + 1)

                            // await console.log(pageno, morefollowerlist)
                        }} ><hr className='morefhr' /> <h6> Load More</h6> </button>}
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



                    {!(page * 10 > totalpostno) && <button className="morefollowers"
                        onClick={async () => {
                            await getLikedPostsofLoggedUser(page + 1);
                            await setPage(prevPage => prevPage + 1)

                            // await console.log(pageno, morefollowerlist)
                        }} ><hr className='morefhr' /> <h6> Load More</h6> </button>}



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


                    {!(page * 10 > totalpostno) && <button className="morefollowers"
                        onClick={async () => {
                            await getRepostedPostsofLoggedUser(page + 1);
                            await setPage(prevPage => prevPage + 1)

                            // await console.log(pageno, morefollowerlist)
                        }} ><hr className='morefhr' /> <h6> Load More</h6> </button>}
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


                    {!(page * 10 > totalpostno) && <button className="morefollowers"
                        onClick={async () => {
                            await getCommentsofLoggedUser(page + 1);
                            await setPage(prevPage => prevPage + 1)

                            // await console.log(pageno, morefollowerlist)
                        }} ><hr className='morefhr' /> <h6> Load More</h6> </button>}
                </>

            }







        </div>
    )
}
