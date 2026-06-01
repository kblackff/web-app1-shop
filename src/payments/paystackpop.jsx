import Paystack from '@paystack/inline-js'
import Swal from 'sweetalert2'
import SwalM from '../pages/alert24'

const publicKey = import.meta.env.VITE_PAYSTACK_KEY

const config = {
    email: 'newsample@email.com',
    phone: '0000011111222',
    text: 'Checkout',
    key: publicKey,
    reference: (new Date()).getTime().toString(),
    metadata: {
        custom_fields: [
            { display_name: 'Shop store for more wears'}
        ]
    },
    onSuccess: ({ reference }) =>
        SwalM.fire({
        title: `Transaction ref: ${reference}`,
        html: '<h2>Order Processed</h2><br />Shop store for more wears',
        timer: 4000,
        icon: 'success'
    }),
    onCancel: ()=> SwalM.fire({title: 'Transaction cancelled'}),
    onError: (err) => {
        SwalM.fire({title: `${err.message}`, topLayer: true})
     }
}

export const handlePayts = ({ id, amt })=> {
    
    const popup = new Paystack()

    if(popup)
    Swal.fire({
            title: `<h2>Transaction Log(${popup.id})${id}</h2>`,
            text: 'This is a demo transaction. Actions in this transaction are invalid and not recorded',
            confirmButtonColor: '#0b0c14cc',
            focusConfirm: true,
            allowOutsideClick: false,
            showCancelButton: true
        })
        .then(res => {
            if(res.isConfirmed)
            popup.newTransaction({...config, amount: amt})
        })
    }

export const handleCheckAmt = ( amt )=> {

    const popup = new Paystack()
    let value = false

    if(popup){
    const payCheckout = Swal.fire({
            title: `<h2>Transaction Log(${popup.id})</h2>`,
            text: 'This is a demo transaction. Actions in this transaction are invalid and not recorded',
            confirmButtonColor: '#0b0c14cc',
            focusConfirm: true,
            allowOutsideClick: false,
            showCancelButton: true
        })
        .then(async(res) => {
            if(res.isConfirmed){
            await popup.checkout({...config, amount: amt }) 
            return value
        }
        else if(res.dismiss === Swal.DismissReason.cancel){
            return value = true
        }
    }) 
    return payCheckout
}}