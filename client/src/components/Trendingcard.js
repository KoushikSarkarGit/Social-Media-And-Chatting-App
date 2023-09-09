import React, { useState } from 'react'
import '../pagecss/trendcard.css'
import '../pagecss/followercard.css'
import MoretrendingModal from './MoretrendingModal'

export default function Trendingcard() {

    const [opentrending, setopentrending] = useState(false)

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
                    trenddata.map((item, index) => {
                        return <div className="singletrend" key={index * 2}>
                            <span>#{item.name}</span>

                            <span>{item.shares} shares</span>
                        </div>
                    })
                }


                <MoretrendingModal opentrending={opentrending} setopentrending={setopentrending} />





            </div>
            <button className="morefollowers" onClick={() => setopentrending(true)}><hr className='morefhr' /> <h6> See All Trending</h6> </button>
        </div>
    )
}
