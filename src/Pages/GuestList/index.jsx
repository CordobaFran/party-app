import React from 'react'
import BtnAddTable from '../../Components/BtnAddTable'
import ModalFormAddTable from '../../Components/ModalFormAddTable'
import SideNavbar from '../../Components/Navbar'
import Tables from '../../Components/Tables'


const GuestList = () => {

const content = (
    <>
        <h1>Lista de Invitados</h1>
        <ModalFormAddTable/>
        <Tables/>
    </>
)

  return (
    <div>
        <SideNavbar content={content} props={""}/>   
    </div>
  )
}

export default GuestList