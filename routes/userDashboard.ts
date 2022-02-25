import { Router } from 'express'

import {
    getUser, postUser,
    postAddFavoriteCoin, postAddPortfolioCoin,
    postRemoveFavoriteCoin, postRemovePortfolioCoin,

} from "../controllers/userDashboard"
import isAuth from "../middlewares/isAuth"


const router = Router()

router.route('/userDashboard/:userID')
    .get(isAuth, getUser)

router.route('/addUser')
    .post(isAuth, postUser)

router.route('/addUpdateWatchlist')
    .post(isAuth, postAddFavoriteCoin)

router.route('/removeUpdateWatchlist')
    .post(isAuth, postRemoveFavoriteCoin)

router.route('/addPortfolioCoin')
    .post(isAuth, postAddPortfolioCoin)

router.route('/removePortfolioCoin')
    .post(isAuth, postRemovePortfolioCoin)

export default router