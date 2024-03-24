import React, { useEffect, useState } from 'react'
import '../pagecss/followercard.css'
import '../pagecss/trendcard.css'

import { Modal, useMantineTheme } from '@mantine/core';
import axios from 'axios';
import toast from 'react-hot-toast';
import CustomEmptybox from './CustomEmptybox';
import { useNavigate } from 'react-router-dom';




export default function TrendingModal({ opentrending, setopentrending, initialtaglist, pretotalTags5days, pretotalTags15days }) {
    const theme = useMantineTheme();

    const navigate = useNavigate()

    const [trendingTagsList, setTrendingTagsList] = useState([])

    const [totalTags5days, setTotalTags5days] = useState(pretotalTags5days)
    const [totalTags15days, setTotalTags15days] = useState(pretotalTags15days)

    const [pageno, setpageno] = useState(1)

    const updateTotalTags = () => {
        setTotalTags5days(pretotalTags5days);
        setTotalTags15days(pretotalTags15days);
    };



    const getTrendingTagsList = async (manualpage) => {
        try {

            await axios.get(`http://localhost:9000/api/v1/tags/get-trending-tags/${manualpage || 1}`
            ).then(async (res) => {
                // console.log(res.data)
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
        updateTotalTags();
    }, [pretotalTags5days, pretotalTags15days]);

    useEffect(() => {
        setTrendingTagsList(initialtaglist)
        setpageno(1)

    }, [opentrending]);


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
                onClose={() => {

                    setpageno(1)

                    setopentrending(false)
                }

                }

            >

                <>
                    <div className="morefollowerbox">

                        {trendingTagsList.length >= 1 ?

                            <>
                                {
                                    trendingTagsList.map((item, index) => {
                                        return <div className="singletrend"
                                            key={index * 2}
                                            onClick={() => { navigate(`/explore/tags/${item.tagname}`) }}
                                        >
                                            <span>#{item.tagname}</span>

                                            <div className='tagdetails'>
                                                <span>{item?.fiveDaysAgoCount ? item?.fiveDaysAgoCount : item?.tenDaysAgoCount} shares recently </span>

                                                <span>{item?.count} total</span>
                                                <span></span>


                                            </div>

                                        </div>
                                    })
                                }
                            </>
                            :

                            <CustomEmptybox lodaingTime={10000} cfontsize={'18px'} textshown={'Nothing Here'} loadingstatus={true} />
                        }




                        {(pageno * 10 <= totalTags15days || pageno * 10 <= totalTags5days) &&
                            <div className="seemorebtn"

                                onClick={async () => {
                                    await getTrendingTagsList(pageno + 1)
                                    await setpageno(pageno + 1)
                                }}

                            > See More</div>}

                    </div>
                </>


            </Modal>


        </>
    )
}
