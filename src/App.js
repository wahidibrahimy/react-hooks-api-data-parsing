import React, { useEffect, useState, Fragment } from "react";
import "./App.css";
//as a user, I want to see all javascript repos with over 25k starts, sorted by most least order
//as a user, I want to see the name, number of starts, and a link to the repo
// as a user, I want to know when the screen is loading
//as user, I want to know when I have an error
//github api documentation
//https://help.github.com/en/github/searching-for-information-on-github/understanding-the-search-syntax
//https://developer.github.com/v3/search/#search-repositories
//create a query
//https://api.github.com/search/repositories?q=stars:>25000+language:javascript&sort=stars&order=desc
//name, number of starts, and a link

//full_name
//stargazers_count
//html_url
//id

function getGithubRepos() {
  return fetch(
    "https://api.github.com/search/repositories?q=stars:>25000+language:javascript&sort=stars&order=desc"
  ).then(data => data.json());
}
//make an api call on app load
//useEffect - make api call
//parse the data
//set to state
//display data in some manner
//handle loading
//error state
//catch handler
//sets the state to an empty array
//check in our jsx and display that there's an error
//fullname,stargazers_count,html_url,id we are going to pass as destructure
function App() {
  const [repoList, setRepoList] = useState([]);
  console.log("repoList:", repoList.length);
  useEffect(() => {
    getGithubRepos()
      .then(results =>
        results.items.map(({ full_name, stargazers_count, html_url, id }) => {
          //throw new Error("My Error");
          return { full_name, stargazers_count, html_url, id };
        })
      )
      .then(repoList => setRepoList(repoList))
      .catch(err => setRepoList([]));
  }, []);
  return (
    <div>
      {repoList === null ? (
        <div>Loading</div>
      ) : repoList.length > 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Full Name</th>
              <th>Stars</th>
              <th>Link</th>
            </tr>
            {repoList.map(repo => {
              return (
                <Fragment key={repo.id}>
                  <tr>
                    <td>{repo.full_name}</td>
                    <td>{repo.stargazers_count}</td>
                    <td>
                      <a href={repo.html_url}>{repo.html_url}</a>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div> Error, please try again</div>
      )}
    </div>
  );
}

export default App;
