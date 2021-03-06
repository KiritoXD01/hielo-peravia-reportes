import React, { useEffect } from "react";
import { Form, Input, Button, Image } from "semantic-ui-react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import "./App.css";
import logo from "./logo.jpeg";

const EMAIJS_SERVICE_ID = process.env.REACT_APP_EMAIJS_SERVICE_ID;
const EMAIJS_TEMPLATE_ID = process.env.REACT_APP_EMAIJS_TEMPLATE_ID;
const EMAIJS_USER_ID = process.env.REACT_APP_EMAIJS_USER_ID;

const App = () => {
    useEffect(() => {
        document.title = "Hielo Peravia";
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Espera por favor",
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        emailjs
            .sendForm(
                EMAIJS_SERVICE_ID,
                EMAIJS_TEMPLATE_ID,
                e.target,
                EMAIJS_USER_ID
            )
            .then(
                (result) => {
                    console.log(result);
                    Swal.fire({
                        icon: "success",
                        title: "Ticket Enviado existosamente",
                    });
                },
                (error) => {
                    console.log(error.text);
                    Swal.fire({
                        icon: "error",
                        title: "Ha ocurrido un error, favor de contactar al administrador",
                        text: error.text,
                    });
                }
            );

        e.target.reset();
    };

    return (
        <div className="App">
            <Image src={logo} />
            <Form className="form" onSubmit={handleSubmit} autoComplete="off">
                <Form.Field>
                    <label htmlFor="tipo_reporte">Tipo Reporte</label>
                    <select
                        id="tipo_reporte"
                        label="Tipo de Reporte"
                        name="tipo_reporte"
                        placeholder="Tipo de Reporte"
                        defaultValue=""
                        required
                    >
                        <option value="" disabled hidden>
                            Seleccione una opcion
                        </option>
                        <option value="Reporte de Averia">
                            Reporte de Averia
                        </option>
                        <option value="Solicitud de Nevera">
                            Solicitud de Nevera
                        </option>
                    </select>
                </Form.Field>

                <Form.Field
                    id="nombre_negocio"
                    control={Input}
                    label="Nombre de Negocio"
                    name="nombre_negocio"
                    placeholder="Nombre del Negocio"
                    required
                    icon="building"
                />
                <Form.Field
                    id="direccion"
                    control={Input}
                    label="Direcci??n"
                    name="nombre_negocio"
                    placeholder="Direcci??n"
                    required
                    icon="location arrow"
                />
                <Form.Field
                    id="telefono"
                    control={Input}
                    label="Tel??fono"
                    name="telefono"
                    placeholder="Tel??fono"
                    required
                    icon="phone"
                />
                <Form.Field
                    id="celular"
                    control={Input}
                    label="Celular"
                    name="celular"
                    placeholder="Celular"
                    icon="mobile"
                />
                <Form.Field
                    id="descripcion"
                    control={Input}
                    label="Descripci??n"
                    name="descripcion"
                    placeholder="Descripci??n"
                    icon="keyboard outline"
                />
                <Button type="submit" color="green">
                    Enviar Reporte
                </Button>
            </Form>
        </div>
    );
};

export default App;
