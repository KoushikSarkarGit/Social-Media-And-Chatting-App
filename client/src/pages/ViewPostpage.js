import React from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome'
import RightofHome from '../components/RightofHome'

import '../pagecss/viewpostpage.css'
// import SinglePostcomponent from '../components/SinglePostcomponent'
// import postPic1 from '../img/postpic2.jpg'
// import postPic1 from '../img/postpic1.jpg'
import postPic1 from '../img/profileImg.jpg'
import ViewSinglepost from '../components/ViewSinglepost'
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development'


export default function ViewPostpage() {
    const params = useParams()


    const allpostdata = {
        img: postPic1,
        name: 'Tzuyu',
        desc: "Happy New Year all friends! #2023 😂🤣 dfdhifdifdifdf idfihdbfhudbhfbdfdbfudbu  duyf duyfydudbfuhjbhjgfhdfcfdf dbfdfgffhfhcfhgfcghgfhgf uhdb fhudfuhdbfuhduhfbd ",
        likes: 2300,
        liked: true
    }
    return (
        <div className='viewpostpagebox'>

            <LeftsideOfHome />
            <div className="mainpost">


                <ViewSinglepost pdata={allpostdata} pid={params.postId} />
            </div>
            <RightofHome />
        </div>


    )
}
