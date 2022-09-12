import {useForm, Controller} from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography
} from "@mui/material";
import {toast} from "react-hot-toast";
import Layout from "../../../../../../../Documents/rest-nextjs-api-routes/components/Layout";
import * as React from "react";
import {useRouter} from "next/router";

type FormularioSistemaSolar = {
    nombre_planeta: String,
    radio_planeta: Number,
    duracion_dia: Number,
    lunas: Number,
    es_habitable: Number
}


export default function nuevoPlaneta() {

    const router = useRouter();

    const controlarSubmitRHF = async (data: any) => {
        const response = await realizarCambio(JSON.stringify(data), router.query.sistemaSolarId)
        toast.success('El planeta ha sido añadido correctamente 👍',);
        console.log(response)
        await (500)
        router.replace("/sistemaSolar/" + router.query.sistemaSolarId)
    }

    const {
        control,
        handleSubmit,
        register,
        formState: {errors, isValid}
    } = useForm<FormularioSistemaSolar>(
        {
            mode: "all",
        }
    )




    return (


        <Layout title_head="Crear un planeta">

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
                                label="Duracion del dia en el planeta en el Sistema"
                                onChange={onChange}
                                onBlur={onBlur}
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
                            >
                                <FormControlLabel value="1" control={<Radio/>} label="Si"/>
                                <FormControlLabel value="0" control={<Radio/>} label="No"/>
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
                        href={"/sistemaSolar/" + router.query.sistemaSolarId}
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


export async function realizarCambio(data: any, id_sistema: any) {

    const response = await fetch("http://localhost:3000/api/sistemaSolar/" + id_sistema , {
        method: 'POST',
        body: data
    });

    return await response.json()
}




