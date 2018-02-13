const {spawn} = require('child_process');
const https = require('https');
const {
  TRAVIS_REPO_SLUG: travisRepoSlug,
  STORYBOOK_DIST: storybookDist,
  TRAVIS_PULL_REQUEST: travisPullRequest,
  GITHUB_API_TOKEN: githubApiToken
} = process.env;


const [repoOwner, repoName] = (travisRepoSlug.split('/'));
const deployPath = `/home/travis/build/${repoOwner}/${repoName}/${storybookDist}`;

const deploySubdomain = `pr-${travisPullRequest}`;
const deployDomain = `https://${repoOwner}-${repoName}-${deploySubdomain}.surge.sh`;

let surgeResults = '';

const childProcess = spawn('node', [`${process.cwd()}/node_modules/.bin/surge`, '--project', deployPath, '--domain', deployDomain]);

childProcess.stdout.on('data', data => {
  surgeResults += data;
});

childProcess.on('error', e => {
  console.error('Error on surge process', e);
});

childProcess.on('close', () => {
  console.log(surgeResults);
});

const githubCommentsPath = `/repos/${travisRepoSlug}/issues/${travisPullRequest}/comments`;
const githubCommentsData = {
  body: `View storybook at: AA`
};

const options = {
  hostname: 'api.github.com',
  path: githubCommentsPath,
  port: 443,
  method: 'POST',
  headers: {
    Authorization: `token ${githubApiToken}`
  }
};
const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(JSON.stringify(githubCommentsData));
req.end();