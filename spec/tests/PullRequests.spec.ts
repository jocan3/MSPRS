import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test } from 'supertest';

import app from '@server';
import { pErr } from '@shared/functions';
import { IResponse } from '../support/types';
import PullRequestDao from '@daos/PullRequest/PullRequestDao';

describe('Pull Requests Routes', () => {

    const path = '/api/prs';
    const getAllPath = `${path}/all`;
    const getMyPRsPath = `${path}/my-prs`;

    const { OK, BAD_REQUEST } = StatusCodes;
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"GET:${path}"`, () => {

        it(`should return a JSON object with all the PRs and a status code of "${OK}" if the
            request was successful.`, (done) => {
            // Setup spy
            const prs = [
                {
                    "title": "Test PR title",
                    "description": "Your request !1544691 into master",
                    "image": "images/4.png",
                    "createdBy": "me",
                    "assignedToMe": false,
                    "numComments": 1
                  },
                  {
                    "title": "Test PR title 2",
                    "description": "Test SWE request !1542370 into master",
                    "image": "images/1.png",
                    "createdBy": "swetest",
                    "assignedToMe": true,
                    "numComments": 2
                  }
            ];
            spyOn(PullRequestDao.prototype, 'getAll').and.returnValue(Promise.resolve(prs));
            // Call API
            agent.get(getAllPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    const resp = res.body.prs;
                    expect(resp).toEqual(prs);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'Could not fetch PRs.';
            spyOn(PullRequestDao.prototype, 'getAll').and.throwError(errMsg);
            // Call API
            agent.get(getAllPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });

        it(`should return a JSON object with my PRs and a status code of "${OK}" if the
            request was successful.`, (done) => {
            // Setup spy
            const prs = [
                {
                    "title": "Test PR title",
                    "description": "Your request !1544691 into master",
                    "image": "images/4.png",
                    "createdBy": "me",
                    "assignedToMe": false,
                    "numComments": 1
                  },
                  {
                    "title": "Test PR title 2",
                    "description": "Test SWE request !1542370 into master",
                    "image": "images/1.png",
                    "createdBy": "swetest",
                    "assignedToMe": true,
                    "numComments": 2
                  }
            ];
            spyOn(PullRequestDao.prototype, 'getMyPullRequests').and.returnValue(Promise.resolve(prs));
            // Call API
            agent.get(getMyPRsPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    const resp = res.body.prs;
                    expect(resp).toEqual(prs);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the getMyPullRequests call was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'Could not fetch PRs.';
            spyOn(PullRequestDao.prototype, 'getMyPullRequests').and.throwError(errMsg);
            // Call API
            agent.get(getMyPRsPath)
                .end((err: Error, res: IResponse) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });
});
