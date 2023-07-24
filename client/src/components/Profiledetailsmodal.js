import React from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import '../pagecss/profiledetails.css'

export default function Profiledetailsmodal({ pmodal, setpmodal }) {

    const theme = useMantineTheme();


    return (
        <>
            <Modal title="Sharepost"



                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}

                size="50%"
                opened={pmodal}
                onClose={() => setpmodal(false)}

                ov
            >



                <hr style={{ width: '99%', color: 'var(--hrColor)', marginTop: '-1rem', border: '2px solid', borderRadius: '15rem' }} />
                <div className="info">
                    <span>
                        <b>Status </b>
                    </span>
                    <span>Single</span>
                </div>

                <div className="info">
                    <span>
                        <b>Lives in </b>
                    </span>
                    <span>Mumbai</span>
                </div>

                <div className="info">
                    <span>
                        <b>Works at </b>
                    </span>
                    <span>PWC India </span>
                </div>

                <div className="info">
                    <span>
                        <b>Bio </b>
                    </span>
                    <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea temporibus sunt nostrum consequuntur esse deleniti aperiam sit at...</span>
                </div>

            </Modal>


        </>
    )
}
