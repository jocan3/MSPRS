import { IPullRequest } from '@daos/PullRequest/PullRequestDao';
import { Response } from 'supertest';

export interface IResponse extends Response {
    body: {
        prs: IPullRequest[];
        error: string;
    };
}

export interface IReqBody {
    pr?: IPullRequest;
}
