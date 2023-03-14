import {Request, Response} from "express";

export async function getPong(req: Request, res: Response) {
    res.status(201)
    res.send('Pong')
}
