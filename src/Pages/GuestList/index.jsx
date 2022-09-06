import React, { useState } from 'react'
import BtnAddTable from '../../Components/BtnAddTable'
import ModalFormAddTable from '../../Components/ModalFormAddTable'
import SideNavbar from '../../Components/Navbar'
import Tables from '../../Components/Tables'
import TableListContainer from '../../Containers/TableListContainer'
import { collection, setDoc, doc, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from '../../Components/Firebase/config';

const GuestList = () => {

  const [list, setList] = useState([])
  
  const getDataFirebase = async () => {
    // Query the first page of docs
    const first = query(collection(db, "tables"));
    const documentSnapshots = await getDocs(first);
  
    // Get the last visible document
    const lastTable = documentSnapshots.docs[documentSnapshots.docs.length-1];
    // console.log("last", await documentSnapshots.docs[0].data().people);
    return documentSnapshots.docs.map((data)=>{
      list.push(data.data())
    })
  }

  getDataFirebase()
  console.log(list)


  const content = (
    <>
      <h1>Lista de Invitados</h1>
      <ModalFormAddTable/>
      <TableListContainer/>
    </>
)

  return (
  <div>
    <SideNavbar content={content} props={""}/>
  </div>
  )
}
export default GuestList