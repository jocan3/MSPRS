/******************************************************************************
 *                          Fetch and display PRs
 ******************************************************************************/

 displayPullRequests();


function displayPullRequests() {
    httpGet('/api/prs/all')
        .then(response => response.json())
        .then((response) => {
            var allPullRequests = response.prs;
            // Empty the anchor
            var allPrsAnchor = document.getElementById('all-prs-anchor');
            allPrsAnchor.innerHTML = '';
            // Append PRs to anchor
            allPullRequests.forEach((pr) => {
                allPrsAnchor.innerHTML += getPRDisplayEle(pr);
            });
        });
};

function displayMyPullRequests() {
    httpGet('/api/prs/my-prs')
        .then(response => response.json())
        .then((response) => {
            var allPullRequests = response.prs;
            // Empty the anchor
            var allPrsAnchor = document.getElementById('all-prs-anchor');
            allPrsAnchor.innerHTML = '';
            // Append Prs to anchor
            allPullRequests.forEach((pr) => {
                allPrsAnchor.innerHTML += getPRDisplayEle(pr);
            });
        });
};

function getReviewerTag(assignedToMe) {
    if (assignedToMe) {
        return `<fast-badge fill="danger" color="white">Assigned to you</fast-badge>`
    }
    return ``;
}


function getPRDisplayEle(pr) {
    return `<div class="pr-column">
        <div class="pr-display-ele">
            <fast-card class="pr-card">
                <h3>${pr.title}</h3>
                <p> ${pr.description} </p>
                ${getReviewerTag(pr.assignedToMe)}
                <div>
                    <p><i class="ms-Icon ms-Icon--ActivityFeed" aria-hidden="true"></i>${pr.numComments}</p>
                <div>
            </fast-card>
        </div>
    <div>`;
}


/******************************************************************************
 *                       Event listeners
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    var ele = event.target;
    if (ele.matches('#filter-my-prs-btn')) {
        displayMyPullRequests();
    }
    if (ele.matches('#filter-all-prs-btn')) {
        displayPullRequests();
    }
}, false)


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}

function getOptions(verb, data) {
    var options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}