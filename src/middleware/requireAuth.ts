import { Request, Response, NextFunction } from "express";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user;	

	if (!user) {
    	return res.sendStatus(403);
	}

	return next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
	
	const user = res.locals.user;
	
  	if (!user || user.role !== "ADMIN" || user.role !== "SUPER_ADMIN") {
    	return res.sendStatus(403);
  	}

	return next();
};

export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
	const user = res.locals.user;

  	if (!user || user.role !== "SUPER_ADMIN") {
    	return res.sendStatus(403);
  	}

	return next();
};