import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, setDoc, doc, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from '../Firebase/config';


export default function ModalFormAddTable() {
  const [open, setOpen] = React.useState(false);
  const [chairQty, SetChairQty] = React.useState(1)
  
  const chairQtyRead = e =>{
    SetChairQty(e.target.value)
  }

  const handleCreateTable =()=>{
    addDataFirebase(chairQty)
    console.log(chairQty)
    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addDataFirebase = async (numberOfTable)=>{       
    // Add a new document with a generated id.

    const emptyPlacesObj = []

    for (let i = 1; i <= numberOfTable; i++) {
      emptyPlacesObj.push({num: i, name: "vacio", lastName: "vacio"})
    }

    console.log(emptyPlacesObj)

    const tableNum = (await getDataFirebase() + 1).toString()
    await setDoc(doc(db, "tables", tableNum), {

        num: parseInt(tableNum),
        qty: parseInt(numberOfTable),
        people: emptyPlacesObj
    });

    // const docRef = await addDoc(collection(db, "tables"), {
    //         table1: {                   
    //             num: 1,
    //             qty: 10
    //         },
    //         table2: {                   
    //             num: 2,
    //             qty: 10
    //         }
        
    // });
  }

  const getDataFirebase = async () => {
    // Query the first page of docs
    const first = query(collection(db, "tables"));
    const documentSnapshots = await getDocs(first);

    // Get the last visible document
    const lastTable = documentSnapshots.docs[documentSnapshots.docs.length-1];
    // console.log("last", documentSnapshots.docs);
    return documentSnapshots.docs.length
  }

  getDataFirebase()

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Agregar Mesa
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Su mesa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Indique la cantidad de sillas que ocupará la mesa.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="sillas"
            label="N° de sillas"
            type="number"
            fullWidth
            variant="standard"
            onChange={chairQtyRead}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCreateTable}>Crear Mesa</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
