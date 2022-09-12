import {useForm, Controller} from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    FormControl,
    TextField, Typography
} from "@mui/material";
import {toast} from "react-hot-toast";

import * as React from "react";
import {useEffect} from "react";
import {useRouter} from "next/router";
import Layout from "../../../components/Layout";


type FormularioSistemaSolar = {
    nombre_sistema: String,
    radio_sistema: Number,
    satelites_sistema: Number,
    nombre_sol: String
}


export default function editarSistema(props: any) {

    const router = useRouter();

    const controlarSubmitRHF = async (data: any) => {
        const response = await realizarCambio(JSON.stringify(data), props.lista[0].id)
        toast.success('El sistema ha sido editado correctamente 👍',);
        console.log(response)
        await (500)
        router.replace("/sistemaSolar")
    }

    const {control, trigger, setValue,handleSubmit, register, formState: {errors, isValid}} = useForm<FormularioSistemaSolar>(
        {
            mode: "all",
        }
    )

    useEffect(() => {
        setValue('nombre_sistema',props.lista[0].nombre_sistema)
        setValue('radio_sistema',props.lista[0].radio_sistema)
        setValue('satelites_sistema',props.lista[0].satelites_sistema)
        setValue('nombre_sol',props.lista[0].nombre_sol)
        trigger()

    }, []);


    return (


        <Layout title_head="Editar un Sistema Solar">

            <form onSubmit={handleSubmit(controlarSubmitRHF)}>


                {/*nombre_sistema*/}
                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('nombre_sistema', {
                            required: {value: true, message: 'Campo Obligatorio'},
                            maxLength: {value: 40, message: 'Longitud max 40'},
                            minLength: {value: 3, message: 'Longitud min 3'},
                        })}
                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="nombre_sistema_id"
                                label="Nombre del Sistema"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={props.lista[0].nombre_sistema}
                            />


                        }}
                    />
                    {errors.nombre_sistema &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.nombre_sistema.message}
                            </Typography>
                        </Alert>
                    }
                </FormControl>

                {/*radio_sistema*/}
                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('radio_sistema', {
                            required: {value: true, message: 'Campo Obligatorio'},
                            validate: {
                                soloNumeros: (valorActual) => {
                                    if (Number.isNaN(+valorActual)) {
                                        return 'Ingrese solo numeros';
                                    } else {
                                        return true; //Esta correcto
                                    }
                                }
                            },
                        })}
                        name="radio_sistema"

                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="radio_sistema_id"
                                label="Radio del Sistema"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={props.lista[0].radio_sistema}

                            />


                        }}
                    />
                    {errors.radio_sistema &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.radio_sistema.message}
                            </Typography>
                        </Alert>
                    }
                </FormControl>

                {/*satelites_sistema*/}
                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('satelites_sistema', {
                            required: {value: true, message: 'Campo Obligatorio'},
                            validate: {
                                soloNumeros: (valorActual) => {
                                    if (Number.isNaN(+valorActual)) {
                                        return 'Ingrese solo numeros';
                                    } else {
                                        return true; //Esta correcto
                                    }
                                }
                            },
                        })}
                        name="satelites_sistema"
                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="satelites_sistema_id"
                                label="Numero de Satelites en el Sistema"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={props.lista[0].satelites_sistema}
                            />


                        }}
                    />
                    {errors.satelites_sistema &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.satelites_sistema.message}
                            </Typography>
                        </Alert>
                    }
                </FormControl>

                {/*nombre_sol*/}
                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('nombre_sol', {
                            required: {value: true, message: 'Campo Obligatorio'},
                            maxLength: {value: 40, message: 'Longitud max 40'},
                            minLength: {value: 3, message: 'Longitud min 3'},
                        })}
                        name="nombre_sol"
                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="nombre_sol_id"
                                label="Nombre del Sol del Sistema"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={props.lista[0].nombre_sol}
                            />


                        }}
                    />
                    {errors.nombre_sol &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.nombre_sol.message}
                            </Typography>
                        </Alert>
                    }
                </FormControl>


                <Box
                    component="span"
                    m={1}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button
                        variant="contained"
                        href="/sistemaSolar"
                        color="secondary"
                    >
                        Cancelar
                    </Button>

                    <Button type="submit"
                            disabled={!isValid}
                            variant="contained"
                            className="btn btn-primary"
                    >
                        Guardar
                    </Button>
                </Box>

            </form>

        </Layout>

    )
}



export async function realizarCambio(data: any,id:any) {

    const response = await fetch("http://localhost:3000/api/sistemas/"+id, {
        method: 'PUT',
        body: data
    });

    return await response.json()
}

export async function getServerSideProps(context:any) {

    const res = await fetch('http://localhost:3000/api/sistemas/' + context.params.sistemaSolarId, {
        method: 'GET',
    });

    const sistemas = await res.json()

    return {
        props: {
            lista: sistemas,
        },
    };


}
