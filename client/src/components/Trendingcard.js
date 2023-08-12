import React from 'react'
import '../pagecss/trendcard.css'

export default function Trendingcard() {

    const trenddata = [
        {
            name: "Minions",
            shares: 97,
        },
        {
            name: "Avangers",
            shares: 80.5,
        }
    ];

    return (
        <div className='trendingbox'>
            <div className="h3box">
                <h3>What's Trending Today</h3>
            </div>


            {
                trenddata.map((item, index) => {
                    return <div className="singletrend" key={index * 2}>
                        <span>#{item.name}</span>

                        <span>{item.shares} shares</span>
                    </div>
                })
            }

        </div>
    )
}
