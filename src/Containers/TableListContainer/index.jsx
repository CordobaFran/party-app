import React, { useEffect, useState } from 'react'
import Tables from '../../Components/Tables'
import { collection, setDoc, doc, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from '../../Components/Firebase/config';
import { Grid } from '@mui/material';


const TableListContainer = () => {

  const [list, setList] = useState([])

  useEffect(() => {
    const getDataFirebase = async () => {
      // Query the first page of docs
      const first = query(collection(db, "tables"));
      const documentSnapshots = await getDocs(first);
      const tablesLists = []

      documentSnapshots.forEach((data)=>{
        tablesLists.push({id: data.id, ...data.data()})
      });
      setList(tablesLists)
    }

    getDataFirebase()
    
  }, [])

  return (
      <Grid container align='center' spacing={2} marginTop={5}>
        {
          list.map( (table)=>{
            return  <Grid item marginBottom={6} md={6} xl={4} key={table.id} >
                      <Tables data={table}/>
                    </Grid>
          }
          )
        }
      </Grid>
  )
}

export default TableListContainer