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
                        <div className='Cemptyboxtxt' style={{ fontSize: cfontsize || '1 rem' }}>
                            Please Wait. Loading...
                        </div>

                        <div className="spinner-border text-warning" role="status" style={{ fontSize: cfontsize || '1 rem' }}>
                            <span className="visually-hidden" style={{ fontSize: cfontsize || '1 rem' }}>Loading...</span>
                        </div>
                    </>
                    :
                    <>
                        <div className='Cemptyboxtxt' style={{ fontSize: cfontsize || '1 rem' }}>
                            {textshown || 'No Results'}
                        </div>

                    </>
            }

        </div>
    )
}
