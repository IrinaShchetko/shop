import { Router } from 'express'
import { routerCatalog } from './routeCatalog.js'
import { routerGoods } from './routeGoods.js'
import { routerFavorites } from './routeFavorites.js'
import { routerBasket } from './routeBasket.js'
import { routerCompressed } from './routeCompressed.js'
// import {routerCrud} from './routeUn.js'

export const router = Router()
router.use('/catalog', routerCatalog)
router.use('/category', routerGoods)
router.use('/favorites', routerFavorites)
router.use('/basket', routerBasket)
router.use('/compressed-images', routerCompressed)
// router.use('', routerCrud)
