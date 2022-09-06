import React, { useEffect, useState } from 'react'
import Tables from '../../Components/Tables'
import { collection, setDoc, doc, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import { db } from '../../Components/Firebase/config';


const TableListContainer = () => {

  const [list, setList] = useState([])
  

  useEffect(() => {
    const getDataFirebase = async () => {
      // Query the first page of docs
      const first = query(collection(db, "tables"));
      const documentSnapshots = await getDocs(first);
      const tablesLists = []
    
      // Get the last visible document
      const lastTable = documentSnapshots.docs[documentSnapshots.docs.length-1];
      // console.log("last", await documentSnapshots.docs[0].data().people);
      documentSnapshots.docs.map((data)=>{
        tablesLists.push({table: data.data()})
      });
      setList(tablesLists)

    }
    getDataFirebase()
    
    console.log(list)
  }, [])
  
  

  return (
    <div>
        {
          list.map( (table)=>{
            return <Tables key={table.num}/>
          }
          )
        }
        
    </div>
  )
}

export default TableListContainer