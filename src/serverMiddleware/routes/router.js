import express from 'express'
import tokenvalidate from '../tokenvalidate.js'
import { Product } from '../../models/product.model.js'
import { User } from '../../models/userSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

//client-side navigation between routes 
router.post('/register', async (req, res) => {
  try{
  const { email, password } = req.body;
  if(!email || !password) {
    throw new Error('All fields are required')
  };
  const findUser = await User.findOne({email});
  if(findUser) {
    res.status(400);
    throw new Error('User is already registered')
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword
  })
  if(user){
    res.status(201).json({email: user.email})
  }else {
    res.status(400)
    throw new Error('invalid credentials')
  }
}catch(err) {
  res.status(500).json({message: err.message})
}
})

router.post('/login', async (req, res) => {
  try{
  const { email, password } = await req.body;
  if(!email || !password) {
    res.status(400).json({message: "User credentials are required"})
  }
  const loginUser = await User.findOne({ email });
  if(!loginUser) {
    res.status(400)
    throw new Error("Unable to find user")
  }
  if(loginUser && await (bcrypt.compare(password, loginUser.password))) {
    const accessToken = jwt.sign({
      user: {
        useremail: loginUser.email,
        userid: loginUser.id
      }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "4m" }
  )
  return res.status(200).json({ accessToken })
  }else {
  res.status(400)
  throw new Error("email and password are invalid")
  }
}catch(err) {
  res.status(500).json({message: err.message})
}
})

router.get('/products', async (req, res) => {
  try {
    const product = await Product.find({})
    res.status(200).json(product)
  }catch(err) {
    res.status(500).json({message: err.message})
  }
})

router.get('/home', tokenvalidate, (req, res) => 
  res.json({message: "User login successful"})
)

router.get('/login/LGalegacy', async (req, res) => {
  try {
    const legacy = await User.findOne({ email: "user0021admin@gmail.com" })
    legacy['password']='12345555'

    res.status(200).json(legacy)
  }catch(err) {
    res.status(500).json({message: err.message})
  }
})

export default router