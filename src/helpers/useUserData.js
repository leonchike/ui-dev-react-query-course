import { useQuery } from "react-query";

const useUserData = (userId) => {
  const usersData = useQuery(
    ["users", userId],
    () => fetch(`/api/users/${userId}`).then((res) => res.json()),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
    }
  );

  return usersData;
};

export default useUserData;
