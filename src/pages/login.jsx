import { useEffect, useRef, useState } from 'react'
import { SwalGA, SwalLogin, SwalReg, SwalReg2 } from './alert24'
import Swal from 'sweetalert2'
import NewH1 from './h1page'
import App from '../App'
import { userLegacy } from '../assets/database/dataV1'
import AuthDB, { authLogin } from '../middlewareV1/middlewareAuth.v1'


import './login.css'

function LoginComponent({ RegComp }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginUser, setLoginUser] = useState('Login')
    const [register, setRegister] = useState(false)
    const [userLogin, setUserLogin] = useState([userLegacy])
    let confirm2 = true

    async function handleSubmit(e) {
        e.preventDefault()
        const modal = document.querySelector('dialog')
        modal.close()
        Swal.fire({ 
            timer: 4000,
            showConfirmButton: false,
            willOpen: ()=> Swal.showLoading()
            })
        if(!register) {
        try{
          const token = await authLogin(email, password, userLogin)
          if(token) {
                    Swal.fire({ 
                        timer: 2000,
                        titleText: 'Login success',
                        showConfirmButton: false,
                        willOpen: ()=> Swal.showLoading(),
                        willClose: ()=> setLoginUser('Success')
                    })
                } else {
                    throw new Error('could not find account')
                }
        }catch(err){
            setEmail('')
            setPassword('')
            SwalReg2.fire({
                icon: 'warning',
                title: `<h2>Account credentials are invalid</h2>`,
                timer: false,
                footer: `${err.stack}`,
                didClose: ()=> modal.showModal()
             })
            throw new Error('registration not successful', err.stack)
        }
    }else {
        try {
            const newUser = await new AuthDB(email, password, userLogin)
                if(newUser){ 
                setUserLogin([...userLogin, newUser])
                SwalReg2.fire({
                    icon: 'success',
                    footer: `<h4>redirecting...</h4>`,
                    didOpen: ()=> {
                        SwalReg2.showLoading()
                        const swalN = SwalReg2.getPopup().querySelector('h3')
                        swalN.textContent = `email:`+ ' ' + `${newUser.email}`
                    },
                    willClose: ()=> modal.showModal(),
                    didClose: ()=> setRegister(false)
                })
            } else{
            setEmail('')
            setPassword('')
            modal.close()
            SwalReg2.fire({
                icon: 'warning',
                title: `<h2>Account not created\n credentials invalid / account already registered</h2>`,
                didClose: ()=> modal.showModal()
             })
            }} catch(err){
            throw new Error(err.stack)
        }
    }}
    
    function handleLegacy() {
    const modal = document.querySelector('dialog')
    const LGa = document.querySelector('.btn')
    const btn = document.querySelector('[type=\'submit\']')
    try {
        userLogin.some(em => {
            if(em.email == 'user0021admin@gmail.com'){
            setEmail(em.email)
            setPassword('12345555')
            modal.close()
            return SwalGA.fire({confirmButtonText: 'Confirm'})
            .then((res)=> {
               if(res.isConfirmed) modal.showModal(); LGa.disabled=true;  btn.focus()
            })}
    })}catch(err) {
        throw new Error({ message: 'Use legacy operation not successful' })
    }
    }
    
useEffect(() => {
    const modal = document.querySelector('dialog')

    if(confirm2){
        setTimeout(()=> {
            !register ? SwalLogin.fire({
                confirmButtonColor: '#0b0c14cc',
                willOpen: ()=> {
                if(document.querySelectorAll('dialog').length >= 2){ 
                Swal.fire({
                text: 'redirecting, Please try again',
                icon: 'warning',
                iconColor: '#0b0c14cc',
                showConfirmButton: false,
                timer: 2000,
                didOpen: ()=> Swal.showLoading(),
                didClose: ()=> window.location.reload(true)
                })}
            }
        }).then(async (res)=> {
        if(await res.isConfirmed) 
            modal.showModal()
        }) : SwalReg.fire({confirmButtonColor: '#0b0c14cc'}).then(async (res)=> {
        if(await res.isConfirmed)
            modal.showModal()
        })
    }, 500)
    }
    
    return () => confirm2=false

}, [confirm2])

if(loginUser == 'Login'){ 
    return (
        <>
        <NewH1 />
          <dialog closedby='none'>
            <div className='modalbox'>
              <form onSubmit={handleSubmit} id='forminput' target='_blank'> 
                  <input 
                  type='email' 
                  required  
                  minLength={18} 
                  placeholder={!register ?'Enter email address':'Enter new email'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                  <input 
                  type='password' 
                  required
                  title='password value more text and numbers'
                  minLength={8}
                  placeholder={!register ?'Enter password':'Enter new password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                <div className='btncon'>
                    {!register && (<button className='btn' type='button' onClick={handleLegacy}>Use legacy</button>)}
                    <a onClick={() => {!register ? setRegister(true):setRegister(false)}}>
                    {!register ? 
                    'don\'t have an account? go to register' : 'have an account? go to login'}
                    </a>
                </div>
                <button type='submit' value={!register ? 'Login' : 'Register'} formMethod='dialog'>
                    {!register ? 'Login' : 'Register'}
                </button>
              </form>
            </div>
            <footer style={{ height: '72vh' }}>
                <input type='date' defaultValue='2017-06-01' name='datevalue'  />
            </footer>
        </dialog>
        </>
    )
} else if (loginUser == 'Success') {
    return (<App />)
}
}

export default LoginComponent