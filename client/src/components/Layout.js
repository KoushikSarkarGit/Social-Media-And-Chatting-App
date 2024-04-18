import React, { useContext } from 'react'
import { Toaster } from 'react-hot-toast';
import { Helmet } from "react-helmet";
import { Appcontext } from '../ContextFolder/ContextCreator';
import Navbar from './Navbar';





export default function Layout({ children, title, description, keywords, author }) {

    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>


            <Toaster />
            <main className='main '>

                {children}



            </main>

            {(curdevice === 'mobile') && <Navbar />}
        </div>
    )
}
