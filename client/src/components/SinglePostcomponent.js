import React from 'react'
import "../pagecss/singlepostcomp.css";

import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'
import { AiTwotoneLike } from 'react-icons/ai'

export default function SinglePostcomponent({ pdata }) {
    return (
        <div className='singlepostbox'>
            <img src={pdata.img} alt="postimage" />

            <div className="spostfeatures">
                <div className='featureicon'>
                    {pdata.liked ? <UilThumbsUp style={{ width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} /> :
                        <AiTwotoneLike style={{ color: 'orange', width: '28px', height: '28px', marginTop: '-3px', paddingLeft: '2px', marginRight: '-3px' }} />}

                    <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.likes}</span>
                </div>


                <div className='featureicon'>
                    <UilRedo />
                    <span style={{ color: "var(--gray)", fontSize: '12px' }}>3333</span>
                </div>


                <div className='featureicon'>

                    <UilCommentAltNotes />
                    <span style={{ color: "var(--gray)", fontSize: '12px' }}>2222</span>
                </div>


                <div className='featureicon'>

                    <UilShare />
                    <span style={{ color: "var(--gray)", fontSize: '12px' }}>11</span>

                </div>





            </div>




            <div className="detail">
                <span><b>From {pdata.name}:</b></span>
                <span> {pdata.desc}</span>
            </div>


        </div>
    )
}
