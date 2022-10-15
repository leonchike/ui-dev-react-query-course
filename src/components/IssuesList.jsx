import { useQuery } from "react-query";
import IssueItem from "./IssueItem";

const IssuesList = ({ labels, status }) => {
  const issuesQuery = useQuery(["issues", { labels, status }], () => {
    const lablesString = labels.map((label) => `labels[]=${label}`).join("&");
    const statusString = status ? `status=${status}` : "";
    return fetch(`api/issues?${lablesString}${statusString}`).then((res) =>
      res.json()
    );
  });

  return (
    <div>
      <h2>Issues List</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
};

export default IssuesList;
