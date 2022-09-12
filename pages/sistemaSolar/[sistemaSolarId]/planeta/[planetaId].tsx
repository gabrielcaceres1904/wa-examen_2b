import {useForm, Controller} from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Select,
    TextField, Typography
} from "@mui/material";
import {toast} from "react-hot-toast";

import * as React from "react";
import {useEffect} from "react";
import {useRouter} from "next/router";
import Layout from "../../../../components/Layout";



type FormularioSistemaSolar = {
    nombre_planeta: String,
    radio_planeta: Number,
    duracion_dia: Number,
    lunas: Number,
    es_habitable: Number
}


export default function editarSistema(props: any) {

    const router = useRouter();

    const controlarSubmitRHF = async (data: any) => {
        const response = await realizarCambio(JSON.stringify(data), props.lista[0].sistemaId, props.lista[0].id)
        toast.success('El planeta ha sido editado correctamente 👍',);
        console.log(response)
        await (500)
        router.replace("/sistemaSolar/" + props.lista[0].sistemaId)
    }

    const {
        control,
        trigger,
        setValue,
        handleSubmit,
        register,
        formState: {errors, isValid}
    } = useForm<FormularioSistemaSolar>(
        {
            mode: "all",
        }
    )

    useEffect(() => {
        setValue('nombre_planeta', props.lista[0].nombre_planeta)
        setValue('radio_planeta', props.lista[0].radio_planeta)
        setValue('duracion_dia', props.lista[0].duracion_dia)
        setValue('lunas', props.lista[0].lunas)
        setValue("es_habitable", props.lista[0].es_habitable ? 1 : 0)

        trigger()

    }, []);


    return (


        <Layout title_head="Editar un planeta">

            <form onSubmit={handleSubmit(controlarSubmitRHF)}>

                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('nombre_planeta', {
                            required: {value: true, message: 'Campo Obligatorio'},
                            maxLength: {value: 20, message: 'Longitud max 30'},
                            minLength: {value: 3, message: 'Longitud min 3'},
                        })}
                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="nombre_planeta_id"
                                label="Nombre del Planeta"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={props.lista[0].nombre_planeta}
                            />


                        }}
                    />
                    {errors.nombre_planeta &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.nombre_planeta.message}
                            </Typography>
                        </Alert>
                    }
                </FormControl>

                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('radio_planeta', {
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


                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="radio_planeta_id"
                                label="Radio del Planeta"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={props.lista[0].radio_planeta}

                            />


                        }}
                    />
                    {errors.radio_planeta &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.radio_planeta.message}
                            </Typography>
                        </Alert>
                    }
                </FormControl>

                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('duracion_dia', {
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

                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="duracion_dia_id"
                                label="Duracion del dia en el planeta"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={props.lista[0].duracion_dia}
                            />


                        }}
                    />
                    {errors.duracion_dia &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.duracion_dia.message}
                            </Typography>
                        </Alert>
                    }
                </FormControl>

                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('lunas', {
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

                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="lunas_id"
                                label="Numero de Lunas del Planeta"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={props.lista[0].lunas}
                            />


                        }}
                    />
                    {errors.lunas &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.lunas.message}
                            </Typography>
                        </Alert>
                    }
                </FormControl>

                <FormLabel>¿Es el planeta habitable?</FormLabel>
                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('es_habitable', {
                            required: {value: true, message: 'Campo Obligatorio'},
                        })}
                        render={({field: {onChange, onBlur}}) => {
                            return <RadioGroup
                                id="es_habitable_id"
                                onChange={onChange}
                                onBlur={onBlur}
                                defaultValue={props.lista[0].es_habitable ? 1 : 0}
                            >
                                <FormControlLabel value="true" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="false" control={<Radio/>} label="No"/>
                            </RadioGroup>


                        }}
                    />
                    {errors.es_habitable &&
                        <Alert severity="error">
                            <Typography>
                                Tiene errores: {errors.es_habitable.message}
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
                        href={"/sistemaSolar/" + props.lista[0].sistemaId}
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


export async function realizarCambio(data: any, sistemaId: any, id: any) {

    const response = await fetch("http://localhost:3000/api/sistemas/" + sistemaId + "/" + id, {
        method: 'PUT',
        body: data
    });

    return await response.json()
}

export async function getServerSideProps(context: any) {

    const res = await fetch('http://localhost:3000/api/sistemas/' + context.params.sistemaSolarId + "/" + context.params.planetaId, {
        method: 'GET',
    });

    const planeta = await res.json()

    return {
        props: {
            lista: planeta,
        },
    };


}