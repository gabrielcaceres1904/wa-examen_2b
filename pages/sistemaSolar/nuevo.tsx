import {useForm, Controller} from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    FormControl, FormControlLabel,
    FormLabel,
    Input,
    InputLabel,
    MenuItem, RadioGroup,
    Select,
    TextField, Typography
} from "@mui/material";
import {toast} from "react-hot-toast";
import * as React from "react";
import {useRouter} from "next/router";
import Layout from "../../components/Layout";



type FormularioSistemaSolar = {
    nombre_sistema: String,
    radio_sistema: Number,
    satelites_sistema: Number,
    nombre_sol: String
}



export default function nuevoSistema() {

    const router = useRouter();

    const controlarSubmitRHF = async (data: any) => {
        const response = await realizarIngreso(JSON.stringify(data))
        toast.success('El sistema ha sido añadido correctamente 👍',);
        console.log(response)
        router.replace("/sistemaSolar")
    }

    const {control, handleSubmit ,register, formState: {errors, isValid}} = useForm<FormularioSistemaSolar>(
        {
            defaultValues: {
                nombre_sistema: "",
                radio_sistema: "",
                satelites_sistema: "",
                nombre_sol: ""
            },
            mode: "onTouched",
        }
    )

    return (
        <Layout title_head="Nuevo Sistema Solar">

            <form onSubmit={handleSubmit(controlarSubmitRHF)}>

                {/*nombre_sistema*/}
                <FormControl fullWidth margin="normal">

                    <Controller
                        control={control}
                        {...register('nombre_sistema', {
                            required: {value: true, message: 'Campo Obligatorio'},
                            maxLength: {value: 20, message: 'Longitud max 30'},
                            minLength: {value: 3, message: 'Longitud min 3'},
                        })}
                        name="nombre_sistema"
                        render={({field: {onChange, onBlur}}) => {
                            return <TextField
                                id="nombre_sistema_id"
                                label="Nombre del Sistema"
                                onChange={onChange}
                                onBlur={onBlur}
                                margin="normal"
                                defaultValue={''}
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
                            maxLength: {value: 20, message: 'Longitud max 30'},
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


export async function realizarIngreso(data?: any) {

    const response = await fetch("http://localhost:3000/api/sistemas/nuevo", {
        method: 'POST',
        body: data
    });

    return await response.json()
}
