import React from 'react'
import Form from '../../Components/Form'
import Box from '@mui/material/Box';
import SideNavbar from '../../Components/Navbar';

const content = (
    <>
        <h1>Datos Invitado</h1>
        <Form/>
    </>
)

const AddGuest = () => {
  return (
    <div>
        <SideNavbar content={content} props={""}/>
        {/* <Box
            sx={{
                marginLeft: '240px'
            }}
        >
            
        </Box> */}
        {/* <Form/> */}
    </div>
  )
}

export default AddGuest