import React, { useEffect, useState } from 'react'

export default function CustomEmptybox({ loadingTime, cfontsize, textshown }) {


    const [loadingstatus, setLoadingstatus] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoadingstatus(false)
        }, loadingTime || 3000);

    }, []);


    return (
        <div>


            {
                loadingstatus ?
                    <>
                        <div className='text-center'>

                            <div className='Cemptyboxtxt text-center' style={{ fontSize: cfontsize || '1 rem', color: '#7f8188' }}>
                                Please Wait. Loading...
                            </div>

                            <div className="spinner-border text-warning text-center " role="status" style={{ fontSize: cfontsize || '1 rem' }}>
                                <span className="visually-hidden text-center" style={{ fontSize: cfontsize || '1 rem' }}>Loading...</span>
                            </div>

                        </div>

                    </>
                    :
                    <>
                        <div className='Cemptyboxtxt text-center' style={{ fontSize: cfontsize || '1 rem', color: '#7f8188' }}>
                            {textshown || 'No Results'}
                        </div>

                    </>
            }

        </div>
    )
}
