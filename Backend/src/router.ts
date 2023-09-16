import {Router} from 'express'


const router = Router()
//*****************VENDOR ******************** */
router.get('/vendor', (req, res) => {})
router.post('/vendor', (req, res) => {}) 
router.delete('/vendor', (req, res) => {})


//*****************CUSTOMER ******************** */

router.get('/customer', (req, res) => {})
router.post('/customer', (req, res) => {})  
router.delete('/customer', (req, res) => {})


//*****************PRODUCT/INVENTORY ******************** */

router.get('/product', (req, res) => {})    
router.post('/product', (req, res) => {})
router.put('/product',  (req,res)=>{})
router.delete('/product', (req, res) => {})

//*****************BASICINFO ******************** */
router.get('/basicinfo', (req, res) => {})
router.put('/basicinfo', (req, res) => {})
router.post('/basicinfo',(req,res)=>{})



//*****************Dashboard ******************** */


