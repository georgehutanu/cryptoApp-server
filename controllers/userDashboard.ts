import { NextFunction, Request, Response } from "express"

import User from "../models/user"
import catchError from "../utils/catchError"


export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID } = req.params
        const user = await User.findOne({ userID })
        if (!user) {
            res.status(200).json({ message: 'User doesn\'t exist', data: {} })
            return
        }
        res.status(200).json({ message: 'Success', data: { user } })
    } catch (err) {
        catchError(err, next)
    }
}

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userID, firstName, lastName, email } = req.body
    try {
        const user = await User.findOne({ userID })
        if (user) {
            res.status(200).json({ message: 'User already exists' })
            return
        }
        await new User({
            userID,
            firstName,
            lastName,
            email,
            watchlist: [],
            portfolio: [{ coinID: '', amount: 0 }]
        }).save()
        res.status(200).json({ message: 'Success' })
    } catch (err) {
        catchError(err, next)
    }
}

export const postAddFavoriteCoin = async (req: Request, res: Response, next: NextFunction) => {
    const { coinID, userID } = req.body
    try {
        const user = await User.findOneAndUpdate({ userID }, { $push: { watchlist: coinID } })
        if (user) {
            res.status(200).json({ message: 'Success', })
            return
        }
        res.status(404).json({ message: 'User doesn\'t exist' })
    } catch (err) {
        catchError(err, next)
    }
}

export const postRemoveFavoriteCoin = async (req: Request, res: Response, next: NextFunction) => {
    const { coinID, userID } = req.body
    try {
        const user = await User.findOne({ userID })
        if (!user) {
            res.status(404).json({ message: 'User doesn\'t exist' })
            return
        }
        const updatedWatchlist = user.watchlist.filter((coin: string) => coin !== coinID)
        await User.updateOne({ userID }, { watchlist: updatedWatchlist })
        res.status(200).json({ message: 'Success' })
    } catch (err) {
        catchError(err, next)
    }
}

export const postAddPortfolioCoin = async (req: Request, res: Response, next: NextFunction) => {
    const { coinID, userID, amount } = req.body
    try {
        const user = await User.findOne({ userID })
        if (!user) {
            res.status(404).json({ message: 'User doesn\'t exist' })
            return
        }
        const checkIfCoinExistsInPortfolio = user.portfolio.find(portfolioCoin => portfolioCoin.id === coinID)
        const updatedPortfolio = checkIfCoinExistsInPortfolio ?
            (
                user.portfolio.map((portfolioCoin) => portfolioCoin.id === coinID ?
                    ({ id: coinID, amount: amount + portfolioCoin.amount }) :
                    portfolioCoin)
            ) :
            [...user.portfolio, { id: coinID, amount }]
        await User.updateOne({ userID }, { portfolio: updatedPortfolio })
        res.status(200).json({ message: 'Success' })
    } catch (err) {
        catchError(err, next)
    }
}

export const postRemovePortfolioCoin = async (req: Request, res: Response, next: NextFunction) => {
    const { coinID, userID, amount } = req.body
    try {
        const user = await User.findOne({ userID })
        if (!user) {
            res.status(404).json({ message: 'User doesn\'t exist' })
            return
        }
        const filteredPortfolio = user.portfolio.filter(portfolioCoin => !(portfolioCoin.id === coinID && portfolioCoin.amount <= amount))
        const updatedPortfolio = amount === 0 ?
            user.portfolio.filter(portfolioCoin => portfolioCoin.id !== coinID) :
            (
                filteredPortfolio.map((portfolioCoin) => portfolioCoin.id === coinID ?
                    {id: coinID, amount: portfolioCoin.amount - amount} :
                    portfolioCoin)
            )
        await User.updateOne({ userID }, { portfolio: updatedPortfolio })
        res.status(200).json({ message: 'Success', data: {portfolio: updatedPortfolio} })
    } catch (err) {
        catchError(err, next)
    }
}

