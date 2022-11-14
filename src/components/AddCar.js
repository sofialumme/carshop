import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

function AddCar(props) {
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        fuel: '',
        year: '',
        price: ''
    });

    const [addCarOpen, setAddCarOpen] = useState(false);

    const dialogOpen = () => {
        setAddCarOpen(true);
    }

    const dialogClose = () => {
        setAddCarOpen(false);
    }

    const handleInputChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value })
    }

    const addCar = () =>  {
        props.saveCar(car);
        dialogClose();
    }

    return (
        <div>
            <Button style={{ margin: 10 }} variant='outlined' onClick={dialogOpen}>Add Car</Button>
            <Dialog onClose={dialogClose} open={addCarOpen}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='brand'
                        value={car.brand}
                        onChange={e => handleInputChange(e)}
                        label='Brand'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='model'
                        value={car.model}
                        onChange={e => handleInputChange(e)}
                        label='Model'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='color'
                        value={car.color}
                        onChange={e => handleInputChange(e)}
                        label='Color'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='fuel'
                        value={car.fuel}
                        onChange={e => handleInputChange(e)}
                        label='Fuel'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='year'
                        value={car.year}
                        onChange={e => handleInputChange(e)}
                        label='Year'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='price'
                        value={car.price}
                        onChange={e => handleInputChange(e)}
                        label='Price'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose}>Cancel</Button>
                    <Button onClick={addCar}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCar;