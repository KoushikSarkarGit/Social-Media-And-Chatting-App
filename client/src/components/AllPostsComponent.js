import React, { useContext, useEffect, useState } from 'react'



import '../pagecss/allpostcomp.css'
// import '../pagecss/followercard.css'
import SinglePostcomponent from './SinglePostcomponent'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Appcontext } from '../ContextFolder/ContextCreator'
import CustomEmptybox from './CustomEmptybox'


export default function AllPostsComponent() {

    const [feed, setFeed] = useState([])
    const [page, setPage] = useState(1)
    const [isloading, setIsloading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [endReached, setEndReached] = useState(false)
    const [followerindex, setFollowerindex] = useState(0)
    const [popularindex, setPopularindex] = useState(0)

    const cur = useContext(Appcontext);
    const { jwtToken, userId } = cur;



    const getFeedOfLoggedUser = async (mfollowerindex, mpopularindex) => {
        try {

            if (jwtToken && userId) {
                setLoading2(true)

                await axios.post(`http://localhost:9000/api/v1/user/get-feed/${userId}`,
                    {
                        "followerindex": mfollowerindex,
                        "popularindex": mpopularindex
                    },
                    {
                        headers: {
                            token: jwtToken
                        }
                    }).then(async (res) => {

                        if (res.data.success === true) {
                            setFeed(prevfeed => [...prevfeed, ...res.data.feed])
                            setFollowerindex(followerindex + res.data.followingpostcount)
                            setPopularindex(popularindex + res.data.popularpostcount)
                            if (res.data.feed.length < 1 || res.data.feed == []) { setEndReached(true) }



                        }
                        setIsloading(false)
                        setLoading2(false)

                    }).catch((err) => {
                        setIsloading(false)
                        setLoading2(false)
                        console.log(err)
                        toast.error('some internal axios error occured')
                    })
            }

        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
            setIsloading(false)
            setLoading2(false)
        }
    }



    const getGeneralFeed = async (manualpage) => {
        try {

            setLoading2(true)
            await axios.get(`http://localhost:9000/api/v1/user/get-general-feed/${manualpage}`

            ).then(async (res) => {

                if (res.data.success === true) {
                    if (res.data.feed.length < 1 || res.data.feed == []) { setEndReached(true) }
                    setFeed(prevfeed => [...prevfeed, ...res.data.feed])
                    // setPopularindex(popularindex + res.data.popularpostcount)


                }

                setIsloading(false)
                setLoading2(false)

            }).catch((err) => {
                console.log(err)
                toast.error('some internal axios request error occured')
                setIsloading(false)
                setLoading2(false)
            })


        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
            setIsloading(false)
            setLoading2(false)
        }
    }





    useEffect(() => {
        setFeed([])
        if (jwtToken && userId) {
            setIsloading(true)
            getFeedOfLoggedUser(0, 0)
        }
        else {
            setIsloading(true)
            getGeneralFeed(1)
        }


    }, []);







    return (
        <div className='allpostbox'>


            {(isloading && loading2) ?





                <CustomEmptybox loadingTime={15000} cfontsize={'40px'} textshown={'Follow people or Search to Explore'} />

                :
                <>
                    {feed.map((item, index) => {
                        return <SinglePostcomponent pdata={item} key={index} />
                    })

                    }

                    {!endReached &&
                        <button className="morefeed" onClick={async () => {
                            if (jwtToken && userId) {

                                getFeedOfLoggedUser(followerindex, popularindex)
                            }
                            else {
                                await getGeneralFeed(page + 1)
                                setPage(page + 1)
                            }

                            // await console.log(pageno, morefollowerlist)
                        }} ><hr className='morefeedhr' />

                            {
                                loading2 ? <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                    :
                                    <h6> Load More</h6>
                            }

                        </button>
                    }
                </>




            }



        </div>
    )
}
