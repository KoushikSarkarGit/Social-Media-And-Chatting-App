import React, { useContext } from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import '../pagecss/profiledetails.css'
import { Appcontext } from '../ContextFolder/ContextCreator';

export default function Profiledetailsmodal({ pmodal, setpmodal, jwtToken, userlastname, userfristname, username, userdata }) {

    const theme = useMantineTheme();
    const cur = useContext(Appcontext);
    const { curdevice } = cur;

    return (
        <>
            <Modal title={<><h2 className='mx-4' >Your details</h2> </>}



                overlayProps={{
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[3],
                    opacity: 0.55,
                    blur: 3,
                }}

                size={curdevice == 'mobile' ? "99%" : "70%"}
                opened={pmodal}
                onClose={() => setpmodal(false)}


            >



                <hr style={{ width: '99%', color: 'var(--hrColor)', marginTop: '-1rem', border: '2px solid', borderRadius: '15rem' }} />





                <div className='py-2 px-4'>

                    <div className="info2">
                        {userfristname ? <div><b>Name:</b>  {userfristname} {userlastname}  </div> : <div><b>Name:</b>  ...  </div>}
                    </div>


                    <div className="info2">
                        {username ? <div><b>Username:</b>  @{username}   </div> : <div><b>Username:</b>  ...  </div>}
                    </div>

                    <div className="info2">
                        {userdata?.email ? <div><b>Email:</b>  {userdata?.email}   </div> : <div><b>Email:</b>  ...  </div>}
                    </div>

                    <div className="info2">
                        {userdata?.sex ? <div><b>Gender:</b>  {userdata.sex}  </div> : <div><b>Gender:</b>  ...  </div>}
                    </div>

                    <div className="info2">
                        {userdata?.phone ? <div><b>Phone No:</b>  {userdata.sex}  </div> : <div><b>Phone No:</b>  ...  </div>}
                    </div>


                    <div className="info2">
                        {userdata?.livesin ? <div> <b>Lives in:</b>  {userdata.livesin}  </div> : <div><b>Lives in:</b>  ...  </div>}
                    </div>


                    <div className="info2">
                        {userdata?.worksAt ? <div> <b>Works At:</b>  {userdata.worksAt}  </div> : <div><b>Works At:</b>  ...  </div>}
                    </div>


                    <div className="info2">
                        {userdata?.relationship ? <div> <b>Relationship Status:</b>   {userdata.relationship}  </div> : <div><b>Relationship Status:</b>  ...  </div>}
                    </div>


                    <div className="info2">
                        {userdata?.bio ? <div> <b>Bio:</b>   {userdata?.bio}  </div> : <div><b>Bio:</b>  ...  </div>}
                    </div>


                </div>




            </Modal>


        </>
    )
}
