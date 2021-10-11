# CODING CHALLENGE - Pull Requests using WebComponents

## Design and considerations

* The project was created using a typescript webapp template from [ExpressJs](https://expressjs.com/). It follows a simple folder structure that contains a `/spec` folder for unit tests and `/src` folde for source code.
* All API calls and database were mocked. The API calls are done using `fetch` method for http requests and the endpoints are handled using the express built-in `Router`. This logic is locate din the `\routes` folder.
  * Get All: API call to obtain all Pull Requests from my team. In a real API this request should probably require information about the user's team (either as a param or form the session)
  * Get All my PRs: API call to obtain all Pull Requests created by the user. In a real API this request should probably require information about the user (either as a param or form the session)  
* Databases are stored as json objects in the `MockDB.json` as a list of Pull Requests.
* Main view and buttons logic is handled using Javascript in the `/public/scripts/index.js` file.
* [Fast Web Components](https://www.fast.design/) are imported as a module in the `index.html` and then used in the dynamic DOM attached using JS. The web components used in this project are:
  * `fast-card`: To display each Pull Request as a separate element in the list view
  * `fast-button`: For the options to filter Pull Requests by *Active* or *Mine*.
  * `fast-badge`: To highlight when a Pull Request is assigned to be reviewed by the user. 
* Development requirements: 
  * NodeJS 16.0 or higher
  * Run project locally: `$ npm run start:dev`

## Testing

* Unit test is done using Jasmine library.
* Tests logic is located in the `PullRequests.spec.ts` file. It tests *happy paths* for both API calls and failures.
* Executing unit tests: `$ npm run test`

## Metrics 

Metrics (telemetry) is not included in this version. The `/public/scripts/index.js` file contains comments on which the metrics can be included to track user interactions.

## Error handling

Error handling and logging for debbuging is not included in this version. The file `Server.ts` contins logic to handle API requests errors in case of failure.

## Demo

[Watch video](https://microsoft-my.sharepoint.com/:v:/p/jmenaarias/ESECU1dizmdLiksMxSoTMegBrb0pf3IRsTYB8doWp8LH2w?e=x3FGFq)
