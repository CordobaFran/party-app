import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

const Form = () => {
  return (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
        }}
    >
        <Paper
            elevation={16}
            sx={{
                display: 'flex',
                width:'45ch',
                justifyContent: 'center',
                padding: 4,
                borderRadius: 5,
                // marginLeft: '240px'
            }}
        >
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField label='Nombre' id="outlined-basic" />
                <br/>
                <TextField label='Apellido' id="outlined-basic"S/>
                <br/>
                <TextField label='Mesa' id="outlined-basic" />
                <br/>
                <TextField label='Vendedor' id="outlined-basic" />
                <br/>
                <Button variant="outlined" size="large" endIcon={<SaveIcon />}>Guardar</Button>
            </Box>
        </Paper>
    </Box>
  )
}

export default Form