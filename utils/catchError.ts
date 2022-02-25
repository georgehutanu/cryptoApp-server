import { NextFunction } from "express"

const catchError = (error: any, next: NextFunction) => {
    !error.statusCode ? error.statusCode = 500 :
    next(error)
}

export default catchError