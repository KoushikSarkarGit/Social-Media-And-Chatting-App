import React from 'react'
import Searchbar from './Searchbar'
import SinglePostcomponent from './SinglePostcomponent'
import '../pagecss/explorepage.css'

import postPic1 from '../img/postpic1.jpg'
import postPic2 from '../img/postpic2.jpg'
import postPic3 from '../img/postpic3.JPG'






export default function ExploreMiddle() {

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
        <div className='exploremiddlebox'>
            <Searchbar />

            <div className="chooseSearchOption">
                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Posts
                        </label>
                    </div>
                </div>


                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            People
                        </label>
                    </div>
                </div>


                <div className='indivradio'>
                    <div className="form-check ms-2">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                        <label className="form-check-label" htmlFor="flexRadioDefault3">
                            Tags
                        </label>
                    </div>
                </div>


            </div>

            <div className="searchResultsBox">

                <div><h4 className='px-2 text-center'>results for </h4></div>

                {/* {
                    allpostdata.map((item, index) => {
                        return <SinglePostcomponent pdata={item} key={index} />
                    })

                } */}



                <div className='srUser'>
                    <div className="srUserImg">
                        <img src={postPic1} alt="myprofilepic" />
                    </div>

                    <div className="srUserDetails">
                        <span> <b> Koushik Sarkar</b> </span>
                        <span >@koushik</span>
                    </div>


                </div>


            </div>



        </div>
    )
}
