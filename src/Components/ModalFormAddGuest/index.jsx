import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { collection, updateDoc, setDoc, doc, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from '../Firebase/config';
import { ListItemText } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function ModalFormAddTGuest(tableData) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(null)
  const [lastName, setLastName] = React.useState(null)
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false); 
  
  const vertical = 'top'
  const horizontal = 'center'

  console.log(tableData.tableData.tableData.tableNum)

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
    const id = `${capitalizeFirstLetter(nameCreated)} ${capitalizeFirstLetter(lastNameCreated)}`

    const tableDataMin = tableData.tableData.tableData
 
    if (await getDataFirebase(id)){
        console.log("YAAESTAAA")
        setOpenAlert(true);
        await updateDataFirebase(tableDataMin.tableNum, tableDataMin.chairNum, nameCreated, lastNameCreated)
    } else {
        await setDoc(doc(db, "People", id), {
            name: name,
            lastName: lastName
        }).then(()=>{
            setOpenConfirm(true);
        });

        await updateDataFirebase(tableData.tableData.tableData.tableNum)

    }
  }

  const updateDataFirebase = async(tableId, chair, name, lastName) => {
    const tableRef = doc(db, "tables", tableId);

    const first = query(collection(db, "tables"));
      const documentSnapshots = await getDocs(first);
      let table

      console.log(chair, name, lastName)
      documentSnapshots.forEach((data)=>{
        if (data.id === tableId){
          table = data.data()
        }
        // tablesLists.push({id: data.id, ...data.data()})
      });

      table.people[chair-1].name = name
      table.people[chair-1].lastName = lastName

      await setDoc(doc(db, "tables", tableId), table);


      console.log((table))

      // const tablesListsFiltered = tablesLists.map((data)=> {
      //   data.find((el) => {
      //       // el == tableId
      //   })
      // })

    // await updateDoc(tableRef, {people:{}})
    // console.log(tablesListsFiltered)
  }

  const getDataFirebase = async (id) => {
    // Query the first page of docs
    const first = query(collection(db, "People"));
    const documentSnapshots = await getDocs(first);

    // Get the last visible document
    const peopleList = []
    documentSnapshots.docs.map((el) => {
        peopleList.push(el.id.toLowerCase())
    })

    return peopleList.includes(id.toLowerCase());
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleCloseConfirm = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenConfirm(false);
  };

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
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
          Ya se está en el listado
        </Alert>
      </Snackbar>
      <Snackbar open={openConfirm} autoHideDuration={6000} onClose={handleCloseConfirm} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleCloseConfirm} severity="success" sx={{ width: '100%' }}>
          Se agregó al listado
        </Alert>
      </Snackbar>
    </div>
  );
}
