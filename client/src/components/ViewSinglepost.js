import React from 'react'

import "../pagecss/viewpostpage.css";

import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'
import { AiTwotoneLike } from 'react-icons/ai'




export default function ViewSinglepost({ pdata }) {
    return (
        <div className='singlepostviewbox'>
            <img src={pdata.img} alt="postimage" className='postimage' />

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


            <div className="commentsection">
                <h1>comments</h1>
            </div>


        </div>
    )
}
