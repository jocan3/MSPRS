import jsonfile from 'jsonfile';

export interface IPullRequest {
    title: string;
    description: string;
    image: string;
    createdBy: string;
    assignedToMe: boolean;
    numComments: number;
}

interface IDatabase {
    all_pull_requests: IPullRequest[];
    my_pull_requests: IPullRequest[];
}

class PullRequestDao {

    private readonly dbFilePath = 'src/daos/MockDb/MockDb.json';

    public async getAll(): Promise<IPullRequest[]> {
        let db = jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
        return (await db).all_pull_requests;
    }

    public async getMyPullRequests(): Promise<IPullRequest[]> {
        let db = jsonfile.readFile(this.dbFilePath) as Promise<IDatabase>;
        return (await db).my_pull_requests;
    }

}

export default PullRequestDao;