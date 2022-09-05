import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../Firebase/config';
import swal from 'sweetalert';
import ModalFormAddTable from '../ModalFormAddTable';

const BtnAddTable = () => {

    const addTable = async ()=>{

        
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "tables"), {
                table1: {                   
                    num: 1,
                    qty: 10
                },
                table2: {                   
                    num: 2,
                    qty: 10
                }
            
        }).then(()=>{
            swal("Excelente", "La mesa se generó con éxito", "success");
            console.log("Document written with ID: ", docRef.id);
        }
            
        );
    }

  return (
    <div>
        {/* <Box>
            <Button variant="outlined" onClick={handleClickOpen}>
                Agregar Mesa
            </Button>
        </Box> */}
        <ModalFormAddTable/>
    </div>
  )
}

export default BtnAddTable