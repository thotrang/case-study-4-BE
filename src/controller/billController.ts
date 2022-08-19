import {Bill} from "../model/bill";
import {Request, Response,NextFunction} from "express";

class billController{
    getAll = async (req: Request, res: Response) => {
        let bill = await Bill.find();
        res.status(200).json(bill);
    }
    addBill = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let bill = req.body;
            bill = await bill.create(bill);
            let newbill = await bill.findById(bill._id).populate('category', 'name');
            res.status(201).json(newbill);
        }catch (error){
            next(error);
        }
    }

    deleteBill = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let bill = await Bill.findById(id);
            if (!bill) {
                res.status(404).json();
            } else {
                bill.delete();
                res.status(204).json();
            }
        } catch (error) {
            next(error);
        }
    }

    getBill = async (req: Request, res: Response, next: NextFunction) => {
        let id = req.params.id;
        try {
            let bill = await Bill.findById(id).populate('category', 'name');
            if (!bill) {
                res.status(404).json();
            } else {
                res.status(200).json(bill);
            }
        } catch (error) {
            next(error)
        }
    }

    updateBill = async (req: Request, res: Response) => {
        let id = req.params.id;
        let bill = await Bill.findById(id);
        if (!bill) {
            res.status(404).json();
        } else {
            let data = req.body;
            await Bill.findOneAndUpdate({
                _id: id
            }, data);
            data._id = id;
            bill = await Bill.findById(id).populate('category','name');
            res.status(200).json(bill);
        }
    }
}
export default new billController();