export const StatusSelect = ({ value, onChange }) => {
  const possibleStatus = [
    {
      id: "backlog",
      label: "Backlog",
    },
    {
      id: "todo",
      label: "To-do",
    },
    {
      id: "inProgress",
      label: "In Progress",
    },
    {
      id: "done",
      label: "Done",
    },
    {
      id: "cancelled",
      label: "Cancelled",
    },
  ];

  return (
    <select value={value} onChange={onChange} className="status-select">
      <option value="">Select a Status</option>
      {possibleStatus.map((status) => (
        <option key={status.id} value={status.id}>
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default StatusSelect;
