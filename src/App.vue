<template>
    <div class="container">
        <img src="./assets/logo.jpeg" alt="logo" />
        <form autocomplete="off" @submit.prevent="handleSubmit">
            <label>Nombre del Negocio</label>
            <input
                type="text"
                v-model="nombre_negocio"
                placeholder="Nombre del Negocio..."
                maxlength="255"
                required
            />
            <label>Direcci&oacute;n</label>
            <input
                type="text"
                v-model="direccion"
                placeholder="Dirección..."
                maxlength="500"
                required
            />
            <label>Tel&eacute;fono</label>
            <input
                type="tel"
                v-model="telefono"
                placeholder="Teléfono..."
                maxlength="10"
                required
            />
            <label>Celular</label>
            <input
                type="tel"
                v-model="celular"
                placeholder="Celular..."
                maxlength="10"
            />
            <label>Descripción</label>
            <input
                type="text"
                v-model="descripcion"
                placeholder="Descripción..."
                maxlength="500"
            />
            <button type="submit">Enviar Ticket de Reporte</button>
        </form>
    </div>
</template>

<script>
import emailjs from "emailjs-com";
import Sweetalert from "sweetalert2";

export default {
    name: "App",
    data() {
        return {
            nombre_negocio: "",
            direccion: "",
            telefono: "",
            celular: "",
            descripcion: ""
        };
    },
    methods: {
        async handleSubmit(e) {
            Sweetalert.fire({
                title: "Enviando Correo",
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Sweetalert.showLoading();
                }
            });

            const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
            const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
            const EMAILJS_USER_ID = process.env.EMAILJS_USER_ID;

            console.log({
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                EMAILJS_USER_ID
            });

            try {
                emailjs
                    .sendForm(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        e.target,
                        EMAILJS_USER_ID,
                        {
                            nombre_negocio: this.nombre_negocio,
                            direccion: this.direccion,
                            telefono: this.telefono,
                            celular: this.celular,
                            descripcion: this.descripcion
                        }
                    )
                    .then(() => {
                        Sweetalert.fire({
                            title: "Ticket enviado exitosamente",
                            text: "El ticket ha sido enviado exitosamente",
                            icon: "success",
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            confirmButtonText: "Ok"
                        }).then(() => {
                            this.nombre_negocio = "";
                            this.direccion = "";
                            this.telefono = "";
                            this.celular = "";
                            this.descripcion = "";
                        });
                    })
                    .catch(e => {
                        console.og(e.message);
                        Sweetalert.fire({
                            title: "Ha ocurrido un error",
                            text: "Por favor reportar a administrador",
                            icon: "error",
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            confirmButtonText: "Ok"
                        });
                    });
            } catch (e) {
                console.log(e.message);
                Sweetalert.fire({
                    title: "Ha ocurrido un error",
                    text: "Por favor reportar a administrador",
                    icon: "error",
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    confirmButtonText: "Ok"
                });
            }
        }
    }
};
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.container {
    display: block;
    margin: auto;
    text-align: center;
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
    width: 50%;
}

label {
    float: left;
}

input[type="text"],
[type="tel"] {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
}

button[type="submit"] {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #45a049;
}

img {
    width: 100%;
    padding-bottom: 15px;
}
</style>
