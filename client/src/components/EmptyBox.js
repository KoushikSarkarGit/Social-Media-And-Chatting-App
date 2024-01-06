import React, { useEffect, useState } from 'react'




export default function EmptyBox() {

    const [fakeloadingtime, setFakeloadingtime] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setFakeloadingtime(false)
        }, 2000);

    }, []);



    return (
        <div className='text-center emptybox'>

            {
                fakeloadingtime ?
                    <>
                        <div className='emptyboxtxt'>
                            Please Wait. Loading...
                        </div>

                        <div className="spinner-border text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </>
                    :
                    <>
                        <div className='emptyboxtxt'>
                            Nothing Here
                        </div>

                    </>
            }





        </div>
    )
}
