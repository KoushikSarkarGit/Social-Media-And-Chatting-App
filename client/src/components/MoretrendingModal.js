import React from 'react'
import '../pagecss/followercard.css'
import '../pagecss/trendcard.css'

import { Modal, useMantineTheme } from '@mantine/core';




export default function TrendingModal({ opentrending, setopentrending }) {
    const theme = useMantineTheme();
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
        <>
            <Modal title="See What's Trending"


                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}

                size="30%"
                opened={opentrending}
                onClose={() => setopentrending(false)}

            >

                <>
                    <div className="morefollowerbox">

                        {
                            trenddata.map((item, index) => {
                                return <div className="singletrend" key={index * 2}>
                                    <span>#{item.name}</span>

                                    <span>{item.shares} shares</span>
                                </div>
                            })
                        }

                        <div className="seemorebtn"> See More</div>

                    </div>
                </>


            </Modal>


        </>
    )
}
