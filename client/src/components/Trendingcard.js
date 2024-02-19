import React, { useContext, useEffect, useState } from 'react'
import '../pagecss/trendcard.css'
import '../pagecss/followercard.css'
import MoretrendingModal from './MoretrendingModal'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Trendingcard() {

    const [opentrending, setopentrending] = useState(false)





    const [trendingTagsList, setTrendingTagsList] = useState([])

    const [totalTags5days, setTotalTags5days] = useState(0)
    const [totalTags15days, setTotalTags15days] = useState(0)





    const getTrendingTagsList = async (manualpage) => {
        try {

            await axios.get(`http://localhost:9000/api/v1/tags/get-trending-tags/${manualpage || 1}`
            ).then(async (res) => {
                console.log(res.data)
                setTrendingTagsList(prevTaglist => [...prevTaglist, ...res.data.trendingTags])
                setTotalTags5days(res.data.totalTagsUpdatedinpast5days)
                setTotalTags15days(res.data.totalTagsUpdatedinpast10days)

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
        getTrendingTagsList(1)
    }, []);














    const trenddata = [
        {
            name: "Minions",
            shares: 97,
        },
        {
            name: "Avangers",
            shares: 80.5,
        },
        {
            name: "Minions",
            shares: 97,
        },
        {
            name: "Minions",
            shares: 97,
        },
        {
            name: "Minions",
            shares: 97,
        },
        {
            name: "Minions",
            shares: 97,
        },
        {
            name: "Minions",
            shares: 97,
        },
        {
            name: "Avangers",
            shares: 80.5,
        },
        {
            name: "Avangers",
            shares: 80.5,
        }
    ];

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className='trendingbox'>
                <div className="h3box">
                    <h5>What's Trending Today</h5>
                </div>


                {
                    trendingTagsList.map((item, index) => {
                        return <div className="singletrend" key={index * 2}>
                            <span>#{item.tagname}</span>

                            <div className='tagdetails'>
                                <div className="indivclassname">
                                    <span> shares in last 5 days</span>
                                    <span>{item.fiveDaysAgoCount} </span>
                                </div>

                                <div className="indivclassname">
                                    <span> total shares</span>
                                    <span>{item.count}</span>
                                </div>

                            </div>

                        </div>
                    })
                }


                <MoretrendingModal opentrending={opentrending} setopentrending={setopentrending} />





            </div>
            <button className="morefollowers" onClick={() => setopentrending(true)}><hr className='morefhr' /> <h6> See All Trending</h6> </button>
        </div>
    )
}
