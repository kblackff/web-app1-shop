import Swal from "sweetalert2";

const SwalM = Swal.mixin({
    toast: true,
    position: "bottom-left",
    showConfirmButton: false,
    iconColor: '#0b0c14cc',
    timer: 1500,
    timerProgressBar: true
})

export const SwalLogin = Swal.mixin({
    width: '500px',
    title: `<h2>Welcome to the store</h2> <br /> Shop the store for wears, informed and quality wears`,
    footer: `Access store after login`,
    allowOutsideClick: false,
    allowEscapeKey: false,
    focusConfirm: true
})

export const SwalGA = Swal.mixin({
    width: '500px',
    html: `Use leagcy offers store access through admin login`,
    focusConfirm: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    confirmButtonColor: '#0b0c14cc'
})

export const SwalReg = Swal.mixin({
    title: `<h1>Register New Account</h1>\n<h2>Enter details and successfully create an account`,
    toast: true,
    width: '70%',
    allowEscapeKey: false
})

export const SwalReg2 = Swal.mixin({
    title: `<h2>Account created successfully</h2>`,
    html: `<h3></h3>`,
    timer: 5500,
    showConfirmButton: true
})

export default SwalM