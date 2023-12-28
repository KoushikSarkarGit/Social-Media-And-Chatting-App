import React, { useContext, useEffect, useState } from 'react'
import postPic1 from '../img/postpic1.jpg'
import postPic2 from '../img/postpic2.jpg'
import postPic3 from '../img/postpic3.JPG'


import '../pagecss/allpostcomp.css'
// import '../pagecss/followercard.css'
import SinglePostcomponent from './SinglePostcomponent'
// import axios from 'axios'
// import toast from 'react-hot-toast'
// import { Appcontext } from '../ContextFolder/ContextCreator'


export default function AllPostsComponent() {

    // const [postlist, setPostlist] = useState([])
    // const [page, setPage] = useState(2)
    // const [totalpostno, setTotalpostno] = useState()

    // const cur = useContext(Appcontext);
    // const { jwtToken } = cur;



    const allpostdata = [
        {
            img: postPic1,
            name: 'Tzuyu',
            desc: "Happy New Year all friends! #2023",
            likes: 2300,
            liked: true
        },
        {
            img: postPic2,
            name: 'Maryam',
            desc: "Party time :)",
            likes: 2300,
            liked: false

        },
        {
            img: postPic3,
            name: "Salena Gomez",
            desc: "At Archery Festival",
            likes: 3800,
            liked: false
        }
    ]


    return (
        <div className='allpostbox'>

            {allpostdata.map((item, index) => {
                return <SinglePostcomponent pdata={item} key={index} />
            })

            }


            {/* <button className="morefollowers" onClick={async () => {
                await setPage(page + 1)
                await getUserPosts();
                // await console.log(pageno, morefollowerlist)
            }} ><hr className='morefhr' /> <h6> Load More</h6> </button> */}

        </div>
    )
}
