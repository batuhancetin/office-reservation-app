import { Request, Response } from "express";
import { createOffice, deleteOffice, findAllOffices, findAndUpdateOffice, findOffice } from "../services/office.service";
import logger from "../utils/logger";

export async function createOfficeHandler(req: Request, res: Response) {
    try {
        
        const office = await createOffice(req.body);
        return res.send(office);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getAllOfficesHandler(req: Request, res: Response) {
    try {
        const offices = await findAllOffices();
        return res.send(offices);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
}

export async function getOfficeHandler(req: Request, res: Response) {
    try {
        const id = req.params.id;    
        const office = await findOffice(id);    
        return res.send(office);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
  }
  
  export async function updateOfficeHandler(req: Request, res: Response) {
    try {
        const _id = req.params.id;
        const body = req.body;
        const updatedOffice = await findAndUpdateOffice({ _id }, body, { new: true });
        return res.send(updatedOffice);
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
  }
  
  export async function deleteOfficeHandler(req: Request, res: Response) {
    try {
        const _id = req.params.id;
        const deleted = await deleteOffice({ _id });
        return res.status(200).send("Office is successfully deleted.");
    } catch (e: any) {
        logger.error(e);
        return res.status(409).send(e.message);
    }
  }