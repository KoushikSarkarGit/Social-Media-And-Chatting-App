import React, { useEffect, useRef, useState } from 'react'

import "../pagecss/viewpostpage.css";

import { UilThumbsUp } from '@iconscout/react-unicons'
import { UilRedo } from '@iconscout/react-unicons'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilShare } from '@iconscout/react-unicons'
import { AiTwotoneLike } from 'react-icons/ai'
import postPic2 from '../img/postpic2.jpg'



export default function ViewSinglepost({ pdata }) {


    const commenterdata = [
        {
            commenter_id: '33423232322',
            commentText: 'This is First Comment knsdf ldslkfd slldsfkldskldsnflkdsnlkfdsnof dskolfdsokfndslksfnldsnflkdsn kldnfkf fndkjnfdkjbf jdbfd bhjfb jhdbfj djfb dj fdj bfhjdfbjdbfkjdb kjfb dkjfbdkjbfjdbjhfbdjfdjbfhjdbfjhdvfhjdfhjdvfjdvjfvdsjvdsjfvdsjfvdshvfdshvdgshfvdshvfdsjvfdsvfkdvfhjdsvfjhdsvfjdsvfkjdvsjfvdsjvdskjfdsfdskjvfjdsvfkjdsvfjhfdsjf udsfuhdsvfhudsv'
        },
        {
            commenter_id: '33423232322',
            commentText: 'This is Second Comment'
        },
        {
            commenter_id: '33423232322',
            commentText: 'This is Third Comment'
        }
    ]

    const textarearef = useRef(null)

    const [textareaval, settextareaval] = useState('');

    const onchangehandler = (event) => {

        settextareaval(event.target.value)

    }

    useEffect(() => {

        textarearef.current.style.height = 'auto';
        textarearef.current.style.height = textarearef.current.scrollHeight + 'px';
        if (textarearef.current.clientHeight < 100) { // Adjust the minimum height as needed
            textarearef.current.style.height = '55px';
        }

    }, [textareaval])

    return (
        <div className="superviewsinglepostbox">


            <div className='singlepostviewbox'>
                <div className="imgcontainer">
                    <img src={pdata.img} alt="postimage" className='postimage' />
                </div>


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


            <div className="commentsection">


                <div className="commentbox">
                    <label><h2> Comment </h2></label>
                    <textarea className="commentinput" name='textareaval' placeholder='Add a comment Here' value={textareaval} ref={textarearef} onChange={(event) => onchangehandler(event)} />
                    <div className=" commentbtnsection ">
                        <div className="commentbtn basicbutton">Post Comment</div>
                        <div className="commentbtn basicbutton">Cancel</div>
                    </div>

                </div>

                <div className="commentlistbox">
                    {
                        commenterdata.map((item) => {
                            return <div className="singlecomment">
                                <img src={postPic2} alt="profpic" className='commenterpic' />
                                <div className="usersection">
                                    <span className='commenterdetails'><b>{item.commenter_id}</b> </span>
                                    <span className='commentdesc'>{item.commentText} </span>
                                </div>



                            </div>
                        })
                    }
                </div>

                <div className="seemorecomments"> See More Comments</div>

            </div>


        </div>
    )
}
