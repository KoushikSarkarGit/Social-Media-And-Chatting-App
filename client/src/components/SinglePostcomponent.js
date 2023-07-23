import React from 'react'
import "../pagecss/singlepostcomp.css";
import Comment from '../img/comment.png'
import Share from '../img/share.png'
import Heart from '../img/like.png'
import NotLike from '../img/notlike.png'



export default function SinglePostcomponent({ pdata }) {
    return (
        <div className='singlepostbox'>
            <img src={pdata.img} alt="postimage" />

            <div className="spostfeatures">
                <img src={pdata.liked ? Heart : NotLike} alt="" />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>


            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{pdata.likes} likes</span>

            <div className="detail">
                <span><b>{pdata.name}</b></span>
                <span> {pdata.desc}</span>
            </div>


        </div>
    )
}
