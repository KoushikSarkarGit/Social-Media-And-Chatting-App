import React from 'react'



import { Modal, useMantineTheme } from '@mantine/core';
import SharePostWithTexarea from './SharePostWithTexarea';


export default function SharePostModal({ opensharemodal, setopensharemodal }) {
    const theme = useMantineTheme();


    return (
        <>
            <Modal title="Sharepost"


                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}

                size="70%"
                opened={opensharemodal}
                onClose={() => setopensharemodal(false)}

            >


                {/* <SharePostComponent /> */}

                <SharePostWithTexarea setopensharemodal={setopensharemodal} />

            </Modal>


        </>
    )
}
