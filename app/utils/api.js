const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SEC_ID"
const params = `?cliend_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username){
    if(message === 'Not Found'){
        return `${username} doesn't exist`
    }
    return message
}
function getProfile(username){
    return fetch(`https://api.github.com/users/${username}${params}`)
        .then((res) => res.json())
        .then((profile) => {
            if(profile.message){
                throw new Error(getErrorMsg(profile.message, username))
            }
            return profile

        })
}
function getRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username))
      }

      return repos
    })
}
function getStarCount (repos) {
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count , 0)
  }
  
  function calculateScore (followers, repos) {
    return (followers * 3) + getStarCount(repos)
  }
function getUserData (player) {
    return Promise.all([
      getProfile(player),
      getRepos(player)
    ]).then(([ profile, repos ]) => ({
      profile,
      score: calculateScore(profile.followers, repos)
    }))
  }
export function fetchPopularRepos(language){
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
        if(!data.items){
            throw new Error(data.message)
        }
        return data.items
    })
}