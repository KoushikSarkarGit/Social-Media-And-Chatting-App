import React, { useContext } from 'react'
import LeftsideOfHome from '../components/LeftsideOfHome'
import RightofHome from '../components/RightofHome'

import '../pagecss/viewpostpage.css'
// import SinglePostcomponent from '../components/SinglePostcomponent'
// import postPic1 from '../img/postpic2.jpg'
// import postPic1 from '../img/postpic1.jpg'
import postPic1 from '../img/profileImg.jpg'
import ViewSinglepost from '../components/ViewSinglepost'
import { useParams } from 'react-router-dom/dist/umd/react-router-dom.development'
import Layout from '../components/Layout'
import { Appcontext } from '../ContextFolder/ContextCreator'


export default function ViewPostpage() {
    const params = useParams()

    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <Layout title={'View Post'}>
            <div className='viewpostpagebox'>
                {(curdevice === 'pc' || curdevice === 'tablet') && <LeftsideOfHome />}

                <div className="mainpost">


                    <ViewSinglepost pid={params.postId} />
                </div>
                {(curdevice === 'pc') && <RightofHome />}
            </div>
        </Layout>

    )
}
