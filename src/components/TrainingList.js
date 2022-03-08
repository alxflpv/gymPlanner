import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
 
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment/moment';





function TrainingList () {

 const [trainings, setTrainings] = useState([]);
 const [open, setOpen] = useState(false);
 const [msg, setMsg] = useState('List of trainings');

 const gridRef = useRef();


 const columns = [
    {headerName: 'Date', field: 'date', sortable: true, filter: true, cellRenderer:(data) => {
        return moment(data.value).format('dd.MM.yyyy HH:mm')
    }},
    {headerName: 'Duration', field: 'duration', sortable: true, filter: true},
    {headerName: 'Activity', field: 'activity', sortable: true, filter: true},
    
    
     
    {headerName: '', 
     field: 'id', 
     width: 100,
     cellRendererFramework: params => <Button color="secondary" size="small" onClick={() =>deleteTraining(params)}>Delete
      </Button> 
    }
  
]



 const getTrainings = () => {
     fetch('https://customerrest.herokuapp.com/gettrainings')
     .then(response => response.json())
     .then(data => setTrainings(data))
     .then(_=> setOpen(true))
     .catch(err => console.error(err))
 }




 const deleteTraining = (link) => {
    if (window.confirm('Are you sure you want to delete this training?')) {
    fetch('https://customerrest.herokuapp.com/api/trainings/' + link.data.id, {
        method: 'DELETE'
    })
    .then(_ => getTrainings())
    .then(_ => setMsg('Training was deleted successfully'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
    }   
}

 useEffect(() => {
  getTrainings();
 }, [])



 const handleClose = () => {
     setOpen(false);
 }



 return(

     <div className = "ag-theme-material" style = {{height: '700px', width: '40%', margin: 'auto'}}>
         <AgGridReact
             ref = {gridRef}
             onGridReady = {params => {
                 gridRef.current = params.api
             }}
             suppressCellSelection={true} 
             columnDefs = {columns}
             rowData = {trainings}
             pagination = {true}
             paginationPageSize = {10} >

         </AgGridReact>
         <Snackbar
             open={open}
             autoHideDuration={3000}
             onClose={handleClose}
             message={msg}
        />
     </div>
    
 )
}

export default TrainingList;