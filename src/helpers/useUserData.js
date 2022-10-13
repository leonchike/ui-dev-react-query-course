import { useQuery } from "react-query";

const useUserData = (userId) => {
  const usersData = useQuery(["users", userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  );

  return usersData;
};

export default useUserData;
