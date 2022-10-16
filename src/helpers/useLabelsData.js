import { useQuery } from "react-query";

const useLabelsData = () => {
  const labelsQuery = useQuery(
    ["labels"],
    ({ signal }) => fetch("/api/labels", { signal }).then((res) => res.json()),
    {
      staleTime: 1000 * 60 * 60, // 5 minutes
    }
  );

  return labelsQuery;
};

export default useLabelsData;
