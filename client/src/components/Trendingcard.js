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
        },
        {
            name: "Zainkeepscode",
            shares: 75.5,
        },
        {
            name: "Reactjs",
            shares: 72,
        },
        {
            name: "Elon Musk",
            shares: 71.9,
        },
        {
            name: "Need for Speed",
            shares: 20,
        },
    ];

    return (
        <div className='trendingbox'>
            <div className="h3box">
                <h3>What's Trending Today</h3>
            </div>


            {
                trenddata.map((item) => {
                    return <div className="singletrend">
                        <span>#{item.name}</span>

                        <span>{item.shares} shares</span>
                    </div>
                })
            }

        </div>
    )
}
