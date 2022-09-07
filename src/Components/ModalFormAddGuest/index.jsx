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
import { ListItemText } from '@mui/material';


export default function ModalFormAddTGuest() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(null)
  const [lastName, setLastName] = React.useState(null)
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nameRead = e =>{
    setName(e.target.value)
  }
  const lastNameRead = e =>{
    setLastName(e.target.value) 
  }

  const handleCreatePerson =()=>{
    addDataFirebase(name, lastName)
    setOpen(false);
  }


  const addDataFirebase = async (nameCreated, lastNameCreated)=>{       
    // Add a new document with a generated id.
    const id = `${name} ${lastName}`
    // const emptyPlacesObj = []

    //   emptyPlacesObj.push({name: name, lastName: name})

    // console.log(emptyPlacesObj)

    // const tableNum = (await getDataFirebase() + 1).toString()
    await setDoc(doc(db, "People", id), {
        name: name,
        lastName: lastName
    });
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
      <ListItemText onClick={handleClickOpen}>
        Agregar
      </ListItemText>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nuevo Invitado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Agregue los datos del invitado:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            fullWidth
            variant="standard"
            onChange={nameRead}
          />
          <TextField
            autoFocus
            margin="dense"
            id="apellido"
            label="Apellido"
            type="text"
            fullWidth
            variant="standard"
            onChange={lastNameRead}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCreatePerson}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
