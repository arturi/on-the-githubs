var assert       = require('assert');
var onTheGithubs = require('..');
var agg          = onTheGithubs.aggregate(null, {});
// Overwrite getJson to avoid api call. have fixture_json
agg.getJson = function(task, cb) {
  cb(null, fixture_json, task);
};

var fixture_task = {
  url: 'https://api.github.com/repos/kvz/nsfailover/contributors?per_page=100',
  path: '/repos/kvz/nsfailover/contributors',
  type: 'contributors',
  owner: 'kvz',
  repo: 'nsfailover'
};

var fixture_json = [{
  login: "tim-kos",
  id: 15005,
  avatar_url: "https://secure.gravatar.com/avatar/9c31d1102d95104fb994ae67cd1989b6?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
  gravatar_id: "9c31d1102d95104fb994ae67cd1989b6",
  url: "https://api.github.com/users/tim-kos",
  html_url: "https://github.com/tim-kos",
  followers_url: "https://api.github.com/users/tim-kos/followers",
  following_url: "https://api.github.com/users/tim-kos/following{/other_user}",
  gists_url: "https://api.github.com/users/tim-kos/gists{/gist_id}",
  starred_url: "https://api.github.com/users/tim-kos/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/tim-kos/subscriptions",
  organizations_url: "https://api.github.com/users/tim-kos/orgs",
  repos_url: "https://api.github.com/users/tim-kos/repos",
  events_url: "https://api.github.com/users/tim-kos/events{/privacy}",
  received_events_url: "https://api.github.com/users/tim-kos/received_events",
  type: "User"
}, {
  login: "kvz",
  id: 26752,
  avatar_url: "https://secure.gravatar.com/avatar/3210e1be3e4059b93c4a88309e2183a2?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png",
  gravatar_id: "3210e1be3e4059b93c4a88309e2183a2",
  url: "https://api.github.com/users/kvz",
  html_url: "https://github.com/kvz",
  followers_url: "https://api.github.com/users/kvz/followers",
  following_url: "https://api.github.com/users/kvz/following{/other_user}",
  gists_url: "https://api.github.com/users/kvz/gists{/gist_id}",
  starred_url: "https://api.github.com/users/kvz/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/kvz/subscriptions",
  organizations_url: "https://api.github.com/users/kvz/orgs",
  repos_url: "https://api.github.com/users/kvz/repos",
  events_url: "https://api.github.com/users/kvz/events{/privacy}",
  received_events_url: "https://api.github.com/users/kvz/received_events",
  type: "User"
}];

var fixture_userpaths = {
  contributors: [
    // '/orgs/{owner}/members',
    '/repos/{owner}/{repo}/contributors',
    '/repos/{owner}/{repo}/collaborators'
  ],
  collaborators: [
    '/repos/{owner}/{repo}/issues/comments',
    '/repos/{owner}/{repo}/issues'
  ],
  watchers: [
    '/repos/{owner}/{repo}/subscribers',
    '/repos/{owner}/{repo}/stargazers'
  ]
};

describe('aggregate', function(){
  describe('grepUsers', function(){
    it('should find 2 users', function(){
      agg.grepUsers(fixture_json, fixture_task, function(err, users, task) {
        assert.equal(2, users.length);
      });
    });
    it('should find 1 users', function(){
      var body = fixture_json;
      delete body[1];
      agg.grepUsers(body, fixture_task, function(err, users, task) {
        assert.equal(1, users.length);
      });
    });
  });

  describe('createTasks', function(){
    it('should return 8 tasks', function(){
      var tasks = agg.createTasks('https://api.github.com', 'kvz', 'nsfailover', fixture_userpaths);
      assert.equal(6, tasks.length);
    });
  });

  describe('doTask', function(){
    it('should find users', function(){
      agg.doTask(null, fixture_task, function(err, users, task) {
        assert.equal(1, users.length);
      });
    });
  });
});
