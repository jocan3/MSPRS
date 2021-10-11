import { Router } from 'express';
import { getAllPullRequests, getMyPullRequests} from './PullRequests';


// PullRequest-route
const pullRequestRouter = Router();
pullRequestRouter.get('/all', getAllPullRequests);
pullRequestRouter.get('/my-prs', getMyPullRequests);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/prs', pullRequestRouter);
export default baseRouter;
