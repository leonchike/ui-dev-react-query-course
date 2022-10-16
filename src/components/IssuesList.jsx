import { useState } from "react";
import { useQuery } from "react-query";
import IssueItem from "./IssueItem";
import fetchWithError from "../helpers/fetchWithError";
import Loader from "./Loader";

const IssuesList = ({ labels, status }) => {
  const issuesQuery = useQuery(["issues", { labels, status }], () => {
    const lablesString = labels.map((label) => `labels[]=${label}`).join("&");
    const statusString = status ? `status=${status}` : "";
    return fetchWithError(`api/issues?${lablesString}${statusString}`);
  });
  const [searchValue, setSearchValue] = useState("");

  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    (
      { signal } // signal allows a cancelable fetch
    ) =>
      fetch(`/api/search/issues?q=${searchValue}`, { signal }).then((res) =>
        res.json()
      ),
    {
      enabled: searchValue.length > 0,
    }
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(e.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          name="search"
          id="search"
          onChange={(e) => {
            if (e.target.value.length === 0) {
              setSearchValue("");
            }
          }}
        />
      </form>
      <h2>Issues List {issuesQuery.isFetching ? <Loader /> : null}</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === "idle" && searchQuery.isLoading ? (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem
              key={issue.id}
              title={issue.title}
              number={issue.number}
              assignee={issue.assignee}
              commentCount={issue.comments.length}
              createdBy={issue.createdBy}
              createdDate={issue.createdDate}
              labels={issue.labels}
              status={issue.status}
            />
          ))}
        </ul>
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Reults</p>
              <ul className="issues-list">
                {searchQuery.data.items.map((issue) => (
                  <IssueItem
                    key={issue.id}
                    title={issue.title}
                    number={issue.number}
                    assignee={issue.assignee}
                    commentCount={issue.comments.length}
                    createdBy={issue.createdBy}
                    createdDate={issue.createdDate}
                    labels={issue.labels}
                    status={issue.status}
                  />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default IssuesList;
