import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import PullRequestDao from "@daos/PullRequest/PullRequestDao";


const pullRequestsDao = new PullRequestDao();
const { OK } = StatusCodes;

/**
 * Get all PRs.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getAllPullRequests(req: Request, res: Response) {
    const prs = await pullRequestsDao.getAll();
    console.log(prs);
    return res.status(OK).json({prs});
}

/**
 * Get my PRs.
 * 
 * @param req 
 * @param res 
 * @returns 
 */
 export async function getMyPullRequests(req: Request, res: Response) {
    const prs = await pullRequestsDao.getMyPullRequests();
    return res.status(OK).json({prs});
}