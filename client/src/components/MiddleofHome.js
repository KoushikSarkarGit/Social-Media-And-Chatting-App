import React from 'react'
import SharePostComponent from './SharePostComponent'
import AllPostsComponent from './AllPostsComponent'
import '../pagecss/middleofHome.css'

export default function middleofHome() {
    return (
        <div className='middleofhomebox'>
            <SharePostComponent />
            <AllPostsComponent />
        </div>
    )
}
