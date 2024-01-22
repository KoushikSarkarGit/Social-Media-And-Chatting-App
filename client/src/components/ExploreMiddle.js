import React, { useEffect, useState } from 'react'
import Searchbar from './Searchbar'
import SinglePostcomponent from './SinglePostcomponent'
import '../pagecss/explorepage.css'
import '../pagecss/followercard.css'


import SearchUserElement from './SearchUserElement'
import axios from 'axios'
import toast from 'react-hot-toast'
import CustomEmptybox from './CustomEmptybox'






export default function ExploreMiddle() {


    const [searchval, setSearchval] = useState('')
    const [userlist, setuserlist] = useState([])
    const [taggedpostlist, setTaggedpostlist] = useState([])
    const [postlist, setPostlist] = useState([])
    const [pageno, setPageno] = useState(1)
    const [selectedoption, setSelectedoption] = useState('people')
    const [ifsearched, setifsearched] = useState(false)
    const [totalpostno, setTotalpostno] = useState()
    const [isloading, setIsloading] = useState(false)

    const getSearchedUsers = async () => {
        try {
            setIsloading(true)
            await axios.get(`http://localhost:9000/api/v1/user/get-people-by-keyword/${searchval}/${pageno}`).then(async (res) => {

                if (res.data.success === true) {

                    // setuserlist([...userlist, ...res.data.matchingUsers])
                    setuserlist(prevUserlist => [...prevUserlist, ...res.data.matchingUsers])
                    setTotalpostno(res.data.totalResults)
                    // console.log(res.data)
                }

                setIsloading(false)

            }).catch((err) => {
                setIsloading(false)
                console.log(err)
                toast.error('some internal axios error occured')
            })


        } catch (error) {
            setIsloading(false)
            console.log(error)
            toast.error('some internal error occured')
        }
    }


    const getSearchedPosts = async () => {
        try {
            setIsloading(true)
            await axios.get(`http://localhost:9000/api/v1/post/get-post-by-keyword/${searchval}/${pageno}`).then(async (res) => {

                if (res.data.success === true) {

                    // setPostlist([...postlist, ...res.data.matchingPosts])
                    setPostlist(prevPostlist => [...prevPostlist, ...res.data.matchingPosts]);
                    setTotalpostno(res.data.totalResults)
                    // console.log(res.data)
                }
                setIsloading(false)


            }).catch((err) => {
                console.log(err)
                toast.error('some internal axios error occured')
                setIsloading(false)
            })


        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
            setIsloading(false)
        }
    }


    const getSearchedTaggedPosts = async () => {
        try {
            setIsloading(true)
            await axios.get(`http://localhost:9000/api/v1/post/get-post-by-tags-keyword/${searchval}/${pageno}`).then(async (res) => {

                if (res.data.success === true) {

                    // setTaggedpostlist([...taggedpostlist, ...res.data.matchingPosts])
                    setTaggedpostlist(prevTaggedpostlist => [...prevTaggedpostlist, ...res.data.matchingPosts])
                    setTotalpostno(res.data.totalResults)

                    // console.log(res.data)
                }

                setIsloading(false)

            }).catch((err) => {
                console.log(err)
                toast.error('some internal axios error occured')
                setIsloading(false)
            })


        } catch (error) {
            console.log(error)
            toast.error('some internal error occured')
            setIsloading(false)
        }
    }

    useEffect(() => {
        //resetting all the lists
        setPostlist([])
        setTaggedpostlist([])
        setuserlist([])
        setifsearched(false)
        setSearchval('')
        setPageno(1)
    }, [selectedoption]);






    return (
        <div className='exploremiddlebox'>
            <Searchbar
                searchval={searchval}
                setSearchval={setSearchval}
                getSearchedUsers={getSearchedUsers}
                getSearchedPosts={getSearchedPosts}
                selectedoption={selectedoption}
                getSearchedTaggedPosts={getSearchedTaggedPosts}
                setifsearched={setifsearched}
                setPostlist={setPostlist}
                setTaggedpostlist={setTaggedpostlist}
                setuserlist={setuserlist} />

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

                {(searchval === '' && ifsearched === false) && <div><h3 className='px-2 text-center' style={{ color: 'grey' }}>Search people, posts or tags </h3></div>

                }




                {selectedoption === 'posts' ?
                    <>
                        {(ifsearched === true) &&

                            <>
                                {postlist.length < 1 ?

                                    <div className='px-2 text-center' style={{ color: 'grey' }}> <CustomEmptybox lodaingTime={2000} textshown={`No results found for "${searchval}"`} cfontsize={'1.75rem'} loadingstatus={isloading} />  </div>

                                    :
                                    <>

                                        <div className='px-2 text-center' style={{ color: 'grey' }}> <CustomEmptybox lodaingTime={2000} textshown={`Results for "${searchval}"`} cfontsize={'1.75rem'} loadingstatus={isloading} />  </div>

                                        {postlist?.map((item, index) => {
                                            return <SinglePostcomponent pdata={item} key={index} />
                                        })}

                                        {!(pageno * 10 > totalpostno) && ifsearched === true && <button className="morefollowers"
                                            onClick={async () => {
                                                await setPageno(pageno + 1)
                                                await getSearchedPosts();
                                                // await console.log(pageno, morefollowerlist)
                                            }} ><hr className='morefhr' /> <h6> Load More</h6> </button>}
                                    </>
                                }
                            </>

                        }

                    </>
                    :
                    null

                }





                {selectedoption === 'tags' ?
                    <>
                        {(ifsearched === true) &&

                            <>
                                {taggedpostlist.length < 1 ?

                                    <div className='px-2 text-center' style={{ color: 'grey' }}> <CustomEmptybox lodaingTime={2000} textshown={`No results found for "${searchval}"`} cfontsize={'1.75rem'} loadingstatus={isloading} />  </div>
                                    :
                                    <>
                                        <div className='px-2 text-center' style={{ color: 'grey' }}> <CustomEmptybox lodaingTime={2000} textshown={`Results for "${searchval}"`} cfontsize={'1.75rem'} loadingstatus={isloading} />  </div>

                                        {taggedpostlist?.map((item, index) => {
                                            return <SinglePostcomponent pdata={item} key={index} />
                                        })}

                                        {!(pageno * 10 > totalpostno) && ifsearched === true && <button className="morefollowers"
                                            onClick={async () => {
                                                await setPageno(pageno + 1)
                                                await getSearchedTaggedPosts();
                                                // await console.log(pageno, morefollowerlist)
                                            }} ><hr className='morefhr' /> <h6> Load More</h6> </button>}
                                    </>
                                }
                            </>
                        }

                    </>
                    :
                    null
                }






                {selectedoption === 'people' ?
                    <>
                        {(ifsearched === true) &&

                            <>
                                {userlist?.length < 1 ?
                                    <div className='px-2 text-center' style={{ color: 'grey' }}> <CustomEmptybox lodaingTime={2000} textshown={`No results found for "${searchval}"`} cfontsize={'1.75rem'} loadingstatus={isloading} />  </div>
                                    :
                                    <>
                                        <div className='px-2 text-center' style={{ color: 'grey' }}> <CustomEmptybox lodaingTime={2000} textshown={`Results for "${searchval}"`} cfontsize={'1.75rem'} loadingstatus={isloading} />  </div>

                                        {userlist?.map((item, index) => {
                                            return <SearchUserElement udata={item} key={index} />
                                        })}

                                        {!(pageno * 10 >= totalpostno) && ifsearched === true && <button className="morefollowers"
                                            onClick={async () => {
                                                await setPageno(pageno + 1)
                                                await getSearchedTaggedPosts();
                                                // await console.log(pageno, morefollowerlist)
                                            }} ><hr className='morefhr' /> <h6> Load More</h6> </button>}
                                    </>
                                }
                            </>

                        }

                    </>

                    :
                    null
                }

            </div>

        </div>
    )
}
