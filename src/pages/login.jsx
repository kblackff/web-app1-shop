import { useEffect, useRef, useState } from 'react'
import { SwalGA, SwalLogin, SwalReg, SwalReg2 } from './alert24'
import Swal from 'sweetalert2'
import NewH1 from './h1page'

import './login.css'

function LoginComponent({ RegComp }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userLegacy, setuserLegacy] = useState([{}])
    const [register, setRegister] = useState(RegComp)
    const key = 'LGalegacy'
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
          await fetch("/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })
          .then((response) => {
            if(response.ok) {
                setEmail('')
                setPassword('')
            }else {
                throw new Error('Network response not successful')
            } 
            return response.json()
          })
          .then((token) => {
            fetch("/user/home", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.accessToken}`
                }
            })
            .then((res) => {
                if(res.ok) {
                    Swal.fire({ 
                        timer: 2000,
                        titleText: 'Login success',
                        showConfirmButton: false,
                        willOpen: ()=> Swal.showLoading(),
                        willClose: ()=> window.location.href = '/web-app1-shop/home'
                    })
                }
                if(!res.ok) {
                    throw Error('Operation was not completed successfully')
                }
                return res.json()
            })
           })
        }catch(err){
            setEmail('')
            setPassword('')
            SwalReg2.fire({
                icon: 'warning',
                title: `<h2>Account credentials are invalid</h2>`,
                didClose: ()=> modal.showModal()
             })
            throw new Error('operation not successful', err.stack)
        }
    }else {
        try {
            await fetch('/user/register', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({ email, password })
            })
            .then(res => {
                if(res.ok){
                const input = res.json().then(info => {
                SwalReg2.fire({
                    icon: 'success',
                    footer: `<h4>redirecting...</h4>`,
                    didOpen: ()=> {
                        SwalReg2.showLoading()
                        const swalN = SwalReg2.getPopup().querySelector('h3')
                        swalN.textContent = `email:`+ ' ' + `${info.email}`
                    },
                    willClose: ()=> modal.showModal(),
                    didClose: ()=> location.href='/web-app1-shop/login'
                })
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
            }})    
        }catch(err){
            throw new Error(err.stack)
        }
    }}
    
    function handleLegacy() {
    const modal = document.querySelector('dialog')
    const LGa = document.querySelector('.btn')
    const btn = document.querySelector('[type=\'submit\']')
    try {
        if(userLegacy != '')
            setEmail(userLegacy.email)
            setPassword(userLegacy.password)
            modal.close()
            return SwalGA.fire({confirmButtonText: 'Confirm'})
            .then((res)=> {
               if(res.isConfirmed) modal.showModal(); LGa.disabled=true;  btn.focus()
            })
    }catch(err) {
        throw new Error({ message: 'Use legacy operation not successful' })
    }
    }
    
useEffect(() => {
    const modal = document.querySelector('dialog')

    async function fetchLegacy(id=key) {
        await fetch(`/user/login/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }})
        .then(res => res.json())
        .then(data => setuserLegacy(data))
    }

    if(RegComp == ''){ setRegister(!RegComp) }

    if(confirm2){
        fetchLegacy()
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
                    <a href={!register ?'/web-app1-shop/register' : '/web-app1-shop/login'}>
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
}

export default LoginComponent