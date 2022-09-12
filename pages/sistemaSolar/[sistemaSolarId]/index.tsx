import {
    Box,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import * as React from 'react';

import {useState} from 'react';
import {useRouter} from "next/router";
import Layout from "../../../components/Layout";


interface Props {
    lista: any[]
}



export default function index(props: Props) {
    const router = useRouter()

    let [open, setOpen] = useState(false);

    let [id_planeta, setId_planeta] = useState(0);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseYes = async () => {
        setOpen(false);
        console.log(await borrarSistema(router.query.sistemaSolarId,JSON.stringify(id_planeta)))
        location.reload();
    };

    const handleCloseNo = () => {
        setOpen(false);
    };


    return (

        <Layout title_head="Planetas">

            <Box display="flex"
                 justifyContent="flex-end"
                 alignItems="flex-end"
                 marginY={3}
            >
                <Button
                    href={"/sistemaSolar/"+router.query.sistemaSolarId+"/planeta/nuevo"}
                    variant="contained"
                >
                    Crear un nuevo planeta
                </Button>
            </Box>


            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant='h6'>
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant='h6'>
                                    Planeta
                                </Typography>

                            </TableCell>
                            <TableCell align="center">
                                <Typography variant='h6'>
                                    Radio del Planeta
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant='h6'>
                                    Duración del Día
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant='h6'>
                                    Lunas
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant='h6'>
                                    Es habitable
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant='h6'>
                                    Acciones
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.lista.map((row) => (
                            <TableRow
                                key={row.id_planeta}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id_planeta}
                                </TableCell>
                                <TableCell align="center">{row.nombre_planeta}</TableCell>
                                <TableCell align="center">{row.radio_planeta}</TableCell>
                                <TableCell align="center">{row.duracion_dia}</TableCell>
                                <TableCell align="center">{row.lunas}</TableCell>
                                <TableCell align="center">
                                    {row.es_habitable.toString() === "true" ? "Si" : "No"}
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setId_planeta(row.id_planeta)
                                            handleClickOpen()
                                        }}
                                    >
                                        Eliminar
                                    </Button>

                                    <Button
                                        variant="contained"
                                        href={"/sistemaSolar/"+ row.sistemaId+"/planeta/"+row.id}
                                    >
                                        Editar
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleCloseNo}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">¿Esta seguro que quiere borrar el planeta de id {id_planeta}?</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta accion no se puede deshacer
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNo} variant="contained" color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleCloseYes}  variant="contained" color="secondary">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>

        </Layout>


    )


}

export async function getServerSideProps(context: any) {


    const res = await fetch('http://localhost:3000/api/sistemas/' + context.params.sistemaSolarId +"/planetas", {
        method: 'GET',
    })

    const planetas = await res.json()

    return {
        props: {
            lista: planetas,
        },
    };

}

export async function borrarSistema(id_sistema: any,id_planeta:any) {

    const response = await fetch("http://localhost:3000/api/sistemaSolar/" + id_sistema+"/"+id_planeta, {
        method: 'DELETE',
    });

    return await response.json()
}