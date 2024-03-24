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
            "_id": "659573f32454f4234c7fcadc",
            "postdescription": "Testing post",
            "postimage": "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
            "postPublicID": "SocialMediaStorage/Post Of 659572c12454f4234c7fcacb on Wed Jan 03 2024 20:19:20 GMT+0530 (India Standard Time)",
            "tags": [
                {
                    "tagname": "bird"
                }
            ],
            "createdAt": "2024-01-03T14:49:23.422Z",
            "updatedAt": "2024-01-24T08:43:21.965Z",
            "userDetails": [
                {
                    "username": "MainKoushik",
                    "firstname": "Koushik",
                    "lastname": "Sarkar",
                    "profilePicture": "http://res.cloudinary.com/dcyrnfucz/image/upload/v1704373789/SocialMediaStorage/%24profilepic%20of%20659572c12454f4234c7fcacb.png"
                }
            ],
            "likescount": 0,
            "repostscount": 0,
            "commentNo": 0
        },
        {
            "_id": "6596ac5ea925fd7223f283b3",
            "postdescription": "testing post 1",
            "postimage": null,
            "postPublicID": "Post Of 659570632454f4234c7fcabd on Thu Jan 04 2024 18:32:22 GMT+0530 (India Standard Time)",
            "tags": [],
            "createdAt": "2024-01-04T13:02:22.705Z",
            "updatedAt": "2024-01-24T11:05:38.591Z",
            "userDetails": [
                {
                    "username": "koushik",
                    "firstname": "koushik",
                    "lastname": "sarkar"
                }
            ],
            "likescount": 0,
            "repostscount": 0,
            "commentNo": 0
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
