import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
 
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';



function CustomerList () {

 const [customers, setCustomers] = useState([]);
 const [open, setOpen] = useState(false);
 const [msg, setMsg] = useState('List of customers');

 const gridRef = useRef();


 const columns = [
    {headerName: 'First Name', field: 'firstname', sortable: true, filter: true},
    {headerName: 'Last Name', field: 'lastname', sortable: true, filter: true},
    {headerName: 'Street address', field: 'streetaddress', sortable: true, filter: true},
    {headerName: 'Postcode', field: 'postcode', sortable: true, filter: true},
    {headerName: 'City', field: 'city', sortable: true, filter: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
    {
      headerName: '',
      width: 80,
      field: 'links.0.href',
      cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params}/>
     },
     
    {headerName: '', 
     field: 'links.0.href', 
     width: 100,
     cellRendererFramework: params => <Button  color="secondary" size="small" onClick={() =>deleteCustomer(params)}>Delete
      </Button> 
    },
    {headerName: '',
    width:180,
    field: 'links.0.href',
    cellRendererFramework: params => <AddTraining addTrainings={addTrainings} params={params}/>
   }
]




 const getCustomers = () => {
     fetch('https://customerrest.herokuapp.com/api/customers')
     .then(response => response.json())
     .then(data => setCustomers(data.content))
     .then(_=> setOpen(true))
     .catch(err => console.error(err))
 }




 const deleteCustomer = (link) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
    fetch(link.data.links[0].href, {
        method: 'DELETE'
    })
    .then(_ => getCustomers())
    .then(_ => setMsg('Customer was deleted successfully'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
    }   
}




 useEffect(() => {
  getCustomers();
 }, [])



 const handleClose = () => {
     setOpen(false);
 }


 const updateCustomer = (link, customer) => {
    fetch (link.data.links[0].href, {
        method: 'PUT',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(_ => getCustomers())
    .then(_ => setMsg('Edit successful'))
    .then(_ => setOpen(true))
    .catch(err => console.error(err))
}  


 const addCustomer = (newCustomer) => {
   fetch('https://customerrest.herokuapp.com/api/customers', {
       method: 'POST', 
       headers: {'Content-type': 'application/json'},
       body: JSON.stringify(newCustomer)
   })
   .then(_=> getCustomers())  
   .then(_=> setMsg("Customer is added succefully!"))
   .then(_=> setOpen(true))
   .catch(err => console.error(err))
 }

 const addTrainings = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(training)
    })
        .then(_ => getCustomers())
        .then(_ => setMsg('New Training Added'))
        .then(_ => setOpen(true))
        .catch(err => console.log(err))
}
 



 return( 
     <div >
         
         <div style = {{width: '15%', margin: 'auto'}}>
         <AddCustomer  addCustomer={addCustomer}
         
         />
         </div>
     <div className = "ag-theme-material" style = {{height: '700px', width: '70%', margin: 'auto'}}>
         <AgGridReact
             ref = {gridRef}
             onGridReady = {params => {
                 gridRef.current = params.api
             }}
             suppressCellSelection={true} 
             columnDefs = {columns}
             rowData = {customers}
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
     </div>
 )
}

export default CustomerList;