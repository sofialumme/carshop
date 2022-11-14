import React, { useState, useRef, useEffect } from 'react';
import AddCar from './AddCar';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditCar from './EditCar';

function CarList() {
    const [cars, setCars] = useState([]);
    const gridRef = useRef();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const snackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={snackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    const columns = [
        { field: 'brand', sortable: true, filter: true, floatingFilter: true },
        { field: 'model', sortable: true, filter: true, floatingFilter: true },
        { field: 'color', sortable: true, filter: true, floatingFilter: true },
        { field: 'fuel', sortable: true, filter: true, floatingFilter: true },
        { field: 'year', sortable: true, filter: true, floatingFilter: true },
        { field: 'price', sortable: true, filter: true, floatingFilter: true },
        {
            field: '_links.self.href', headerName: '', maxWidth: 150,
            cellRenderer: params => {
                return <Button variant='text' color='error' size='small'
                    onClick={() => deleteCar(params.value)}>Delete</Button>
            }
        },
        {
            field: '_links.self.href', headerName: '', maxWidth: 150,
            cellRenderer: params => {
                return <EditCar link={params.value} updateCar={updateCar} />
            }
        }
    ]

    const fetchCars = () => {
        fetch('http://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars));
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => {
                    fetchCars();
                    setMessage('Car deleted.');
                    setSnackbarOpen(true);
                })
                .catch(err => {
                    console.error(err);
                    setMessage('An error occurred.' + err);
                    setSnackbarOpen(true);
                });
        }
    }

    const saveCar = (car) => {
        fetch('http://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => {
                fetchCars();
                setMessage('Car added.');
                setSnackbarOpen(true);
            })
            .catch(err => {
                console.error(err);
                setMessage('An error occurred.' + err);
                setSnackbarOpen(true);
            });
    }

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
            .then(res => {
                fetchCars();
                setMessage('Car edited.');
                setSnackbarOpen(true);
            })
            .catch(err => {
                console.error(err);
                setMessage('An error occurred.' + err);
                setSnackbarOpen(true);
            });
    }

    useEffect(() => {
        fetchCars();
    }, [])

    return (
        <div>
            <AddCar saveCar={saveCar} />
            <div className='ag-theme-material'
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={cars}
                    animateRows={true}>
                </AgGridReact>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={snackbarClose}
                    message={message}
                    action={action}
                />
            </div>
        </div>
    );
};

export default CarList;