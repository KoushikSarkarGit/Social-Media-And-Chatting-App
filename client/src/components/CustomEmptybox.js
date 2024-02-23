import React, { useEffect, useState } from 'react'

export default function CustomEmptybox({ lodaingTime, cfontsize, textshown, loadingstatus }) {


    // const [fakeloadingtime, setFakeloadingtime] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            loadingstatus = false
        }, lodaingTime || 3000);

    }, []);


    return (
        <div>


            {
                loadingstatus ?
                    <>
                        <div className='text-center'>

                            <div className='Cemptyboxtxt text-center' style={{ fontSize: cfontsize || '1 rem' }}>
                                Please Wait. Loading...
                            </div>

                            <div className="spinner-border text-warning text-center " role="status" style={{ fontSize: cfontsize || '1 rem' }}>
                                <span className="visually-hidden text-center" style={{ fontSize: cfontsize || '1 rem' }}>Loading...</span>
                            </div>

                        </div>

                    </>
                    :
                    <>
                        <div className='Cemptyboxtxt text-center' style={{ fontSize: cfontsize || '1 rem' }}>
                            {textshown || 'No Results'}
                        </div>

                    </>
            }

        </div>
    )
}
