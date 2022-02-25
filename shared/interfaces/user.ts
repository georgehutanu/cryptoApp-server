export default interface IUser {
    userID: string
    firstName: string
    lastName: string
    email: string
    portfolio: IPortfolioCoin[]
    watchlist: string[]
}

interface IPortfolioCoin {
    id: string
    amount: number
}