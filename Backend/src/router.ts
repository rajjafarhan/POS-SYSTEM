import {Router} from 'express'
import { createVendor, deleteAllVendors, deleteVendor, getAllVendors } from './handlers/vendor'
import { get } from 'http'
import { createCustomer, getAllCustomers } from './handlers/customer'


const router = Router()
//**************VENDOR*******************/
router.get('/vendor/:setNo', getAllVendors)
router.post('/vendor', createVendor) 
router.delete('/vendor/:id', deleteVendor)
router.delete('/vendor', deleteAllVendors)


//*****************CUSTOMER************ */

router.get('/customer/:setNo',getAllCustomers)
router.post('/customer', createCustomer)  
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

router.get('/allsale',()=>{})



export default router
