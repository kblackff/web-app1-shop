import { useState, useEffect, useRef } from 'react'
import IMG from './pages/slides'
import SwalM from './pages/alert24'
import { handleCheckAmt, handlePayts } from './payments/paystackpop'
import { HeaderImg, hero } from './assets/images.js'

import './App.css'

function App() {
  const [ products, setProducts ] = useState([{}])
  const [ cartItem, setCartItem ] = useState([])
  const [ cartState, setCartState ] = useState(false)
  const [ checkout, setCheckout ] = useState(0)
  const Pref = useRef()
  let textC = false
  let num = 0
  let ignore = false
  
  useEffect(() => {
    const $cartV = document.getElementsByClassName("cart")[0]
    const cartOpen = document.getElementsByClassName("cart-popup")[0]
    const spanN = document.getElementsByClassName("close")[0]
    const payCheck = document.querySelector('.bfg>button')
    const dMYY = new Date().getFullYear()
    const setdateH = Pref.current 
    
    if(!ignore) {
      fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
    }

    $cartV.addEventListener('click', ()=> cartOpen.style.display='block')
    spanN.addEventListener('click', ()=> cartOpen.style.display='none')
    payCheck.addEventListener('click', ()=> cartOpen.style.display='none')
    window.addEventListener('click', (e) => { 
      if(e.target == cartOpen) {
      cartOpen.style.display = 'none'
    }
  })
  setdateH.innerHTML = `&copy; ${dMYY} Inc. All rights reserved`

  return () => ignore=true
}, [ignore])

  function handleClick(id){
    const node = document.querySelectorAll('figure')
    let nodeList

    switch(id) {
        case id=0 :
          nodeList=node[0]
          handleCart(nodeList)
          break
        case id=1 :
          nodeList=node[1]
          handleCart(nodeList)  
          break
        case id=2 :
          nodeList=node[2]
          handleCart(nodeList)
          break
        case id=3 :
          nodeList=node[3]
          handleCart(nodeList) 
          break
        case id=4 :
          nodeList=node[4]
          handleCart(nodeList)
          break
        case id=5 :
          nodeList=node[5]
          handleCart(nodeList)
          break
        default :
          return
        }

    function handleCart(nodelist) {
      const nodeElem = nodelist.childNodes
      let dscrV 
      let pcrV 
      let imgV = nodeElem[0].querySelector('.img22').getAttribute('src')
      if(nodeElem.length == 4){
        dscrV = nodeElem[2].textContent
        pcrV = nodeElem[3].textContent
      }else {
        dscrV = nodeElem[1].textContent
        pcrV = nodeElem[2].textContent
      }
      setCartState(!false)
      
      return setCartItem([
        ...cartItem,
        {
          image: imgV,
          price: pcrV,    
          description: dscrV,
          id: id,
        }
      ])
      ? SwalM.fire({
        icon: 'warning',
        title: 'Add to cart not successful'
      }) : SwalM.fire({
        icon: 'success',
        title: 'Added to cart successfully'
      })
    }
  }

  function CartItem({ cartstate }) {
    return (cartstate != true ? null :
      cartItem.map((itm, inx) => {
        const reg = itm.price.match(/\d+/i)
        reg.forEach(vaul => { setCheckout((num += parseInt(vaul))) })
        return (
        <div id='cart-item' key={inx+1}>
          <img src={itm.image} />
          <code>{itm.description}</code>
          <h3>{itm.price}</h3>
        </div>
      )})
    )
  }

  return (
      <>
      <main>
      <header id='header'>
        <nav id='navb'>
          <a href='#sec-dev2'>Shop</a>
          <a href='#sec-dev'>Wears<img src={ hero } style={{display:'inline', width:'15px', background:'#646e8709'}} />Pricing</a>
          <a href='#cart'>Cart</a>
          <a href='#sec-dev3'>About</a>
        </nav> 
      </header>
        
      <section id='sec-dev'>
        <div className='headerimg'>
          <img src={ HeaderImg } />
        {typeof products == 'undefined' ? (
          <p>Loading... </p>) : products.map((product, index) => (product.v1 == 2) && (
          <div key={index + 1} className='container1'>
          <figure>
            <IMG src={product.image} alt={product.name} />
            <figcaption>{product.description}</figcaption>
            <span className='leftspan'><h2><sup>$</sup>{product.price}0</h2></span>
          </figure>
          <div className='button'>
            <button onClick={()=> handlePayts({ id:0, amt:(product.price)*100*100 })}>Buy</button>
            <button onClick={()=> handleClick(0)}>Add to cart</button>
          </div>
          </div>
        ))}
        </div>
        <h1>Welcome to the Store for Wears <p>Shop store for best & quality wears</p></h1>
      </section>
      </main>

      <div id='cart' className='cart'>
        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" color="#646E87">
	        <rect width="24" height="24" fill="none" />
	          <g fill="none" stroke="#646E87" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
		          <path d="M3 3h2l.5 3m0 0L7 15h11l3-9z" />
		            <circle cx="8" cy="20" r="1" />
		              <circle cx="17" cy="20" r="1" />
	          </g>
        </svg>
      </div>
        <div className="cart-popup" id="cart-popup">
          <div className='cartbox'>
            <div><span className='close'>&times;</span>
            {(!cartState) && <h3 id='textC'><em>{textC ?'Add to your cart' : 'Cart Order success\n You can add new items'}</em></h3>}
              <CartItem cartstate={cartState} /></div>
              <div className='bfg'>
                <button onClick={async()=> {
                  const value = await handleCheckAmt((checkout)*1000) 
                  console.log(value)
                  if( !value ) setCartItem([]), setCartState(false), textC=true, setCheckout(0)
                }}
                  >Checkout</button>
              <h4><sup>Total:</sup><p>${checkout}</p></h4></div>
          </div>
        </div>

      <section id='sec-dev2'>
        <div className='container2'>
        {products.map((product, index) => (product.v1 == 3) && (
        <div key={index+1} className='productid'>
            <figure>
              <IMG src={product.image} alt={product.name} id={3} />
                <figcaption>{product.description}</figcaption>
                  <span className='leftspan'><h2><sup>$</sup>{product.price}0</h2></span>
            </figure>
          <div className='button'>
            <button onClick={()=> handlePayts({ id:1, amt:(product.price)*100*100 })}>Buy</button>
            <button onClick={()=> handleClick(1)}>Add to cart</button>
          </div>
        </div>
      ))}
      {products.map((product, index) => (product.v1 == 4) && (
        <div key={index+1} className='productid'>
          <figure>
            <IMG src={product.image} alt={product.name} id={4} />
              <figcaption>{product.description}</figcaption>
                <span className='leftspan'><h2><sup>$</sup>{product.price}0</h2></span>
          </figure>
          <div className='button'>
              <button onClick={()=> handlePayts({ id:2, amt:(product.price)*100*100 })}>Buy</button>
              <button onClick={()=> handleClick(2)}>Add to cart</button>
          </div>
        </div>
      ))}
      {products.map((product, index) => (product.v1 == 5) && (
        <div key={index+1} className='productid'>
          <figure>
            <IMG src={product.image} alt={product.name} id={5} />
              <figcaption>{product.description}</figcaption>
                <span className='leftspan'><h2><sup>$</sup>{product.price}0</h2></span>
            </figure>
            <div className='button'>
              <button onClick={()=> handlePayts({ id:3, amt:(product.price)*100*100 })}>Buy</button>
              <button onClick={()=> handleClick(3)}>Add to cart</button>
          </div>
        </div>
      ))}
      {products.map((product, index) => (product.v1 == 6) && (
        <div key={index+1} className='productid'>
          <figure>
            <IMG src={product.image} alt={product.name} id={6} />
              <figcaption>{product.description}</figcaption>
                <span className='leftspan'><h2><sup>$</sup>{product.price}0</h2></span>
            </figure>
            <div className='button'>
              <button onClick={()=> handlePayts({ id:4, amt:(product.price)*100*100 })}>Buy</button>
              <button onClick={()=> handleClick(4)}>Add to cart</button>
          </div>
        </div>
      ))}
      {products.map((product, index) => (product.v1 == 7) && (
        <div key={index+1} className='productid'>
          <figure>
            <IMG src={product.image} alt={product.name} id={7} />
              <figcaption>{product.description}</figcaption>
                <span className='leftspan'><h2><sup>$</sup>{product.price}0</h2></span>
            </figure>
            <div className='button'>
              <button onClick={()=> handlePayts({ id:5, amt:(product.price)*100*100 })}>Buy</button>
              <button onClick={()=> handleClick(5)}>Add to cart</button>
          </div>
        </div>
      ))}
        </div>
      </section>

      <hr />
      <footer id='sec-dev3'>
        <div className='footer'>
          <p>Bringing beautiful and quality wears. Avaliable in store, shop today</p>
          <a href='#.'><li>Company</li></a>
          <a href='#.'><li>Resources</li></a>
          <a href='#.'><li>Categories</li></a>
          <a href='#sec-dev3'><li>About</li></a>
        </div>
          <div>
            <h4>Contact our developer</h4>
            <fieldset id='contact-dev' className='contact-dev'>
              
              <a aria-label="view dev on X"  target="_blank" rel="noopener nofollow" href="https://x.com/nwachukwu2353">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              
              <a aria-label="View dev on github" target="_blank" rel="noopener nofollow" href="https://github.com/kblackff">
                <svg width="16" height="16" viewBox="0 0 16 16">
	                <path fill="currentColor" d="M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656c0-.781.281-1.625.75-2.188c-.203-.515-.172-1.609.063-2.062c.625-.078 1.468.25 1.968.703c.594-.187 1.219-.281 1.985-.281c.765 0 1.39.094 1.953.265c.484-.437 1.344-.765 1.969-.687c.218.422.25 1.515.046 2.047c.5.593.766 1.39.766 2.203c0 1.922-1.453 3.375-3.547 3.64c.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03C16 3.61 12.406 0 7.984 0C3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156c-1.031 0-1.64-.562-2.078-1.609c-.172-.422-.36-.672-.719-.719c-.187-.015-.25-.093-.25-.187c0-.188.313-.328.625-.328c.453 0 .844.281 1.25.86c.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656" />
                </svg>
              </a>

              <a aria-label="View dev on Linkedin" target="_blank" rel="noopener nofollow" href="https://www.linkedin.com/in/ebenezern-nwachukwu-21799b394/">
                <svg width="35" height="52" viewBox="0 0 24 24">
	                <path fill="currentColor" d="M17.303 2.25H6.697A4.447 4.447 0 0 0 2.25 6.697v10.606a4.447 4.447 0 0 0 4.447 4.447h10.606a4.447 4.447 0 0 0 4.447-4.447V6.697a4.447 4.447 0 0 0-4.447-4.447m-8.46 15.742a.4.4 0 0 1-.4.423h-1.78a.41.41 0 0 1-.4-.412V10.6a.4.4 0 0 1 .4-.411h1.78a.4.4 0 0 1 .4.411zM7.52 8.632a1.467 1.467 0 1 1 .022-2.935A1.467 1.467 0 0 1 7.52 8.63m10.817 9.35a.39.39 0 0 1-.378.388H16.08a.39.39 0 0 1-.378-.389v-3.424c0-.511.156-2.223-1.356-2.223c-1.179 0-1.412 1.2-1.457 1.734v3.991a.39.39 0 0 1-.378.39h-1.823a.39.39 0 0 1-.389-.39v-7.493a.39.39 0 0 1 .39-.378h1.822a.39.39 0 0 1 .39.378v.645a2.59 2.59 0 0 1 2.434-1.112c3.035 0 3.024 2.835 3.024 4.447z" />
                </svg>
              </a>
              
              <a aria-label="Send email" target="_blank" rel="noopener nofollow" href="mailto:ebenezer24x@gmail.com">
                <svg width="100" height="100" viewBox="0 0 24 24">
	                <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8.263-7.212q.137-.038.262-.113L19.6 8.25q.2-.125.3-.312t.1-.413q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037t.263-.037" />
                </svg>
              </a>

            </fieldset>
        </div>
        <div className='tobottom'>
          <div>
            <p ref={Pref} id='setdate'></p>
          </div>
          <nav id='navfooter'>
            <a href='#.'>Terms</a>
            <a href='#.'>Policy Privacy</a>
            <a href='#contact-dev'>Contact</a>
            <a href='#.'>Cookies</a>
          </nav>
        </div>
      </footer>
      <hr />
      </>
  )
}

export default App