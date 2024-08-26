import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

export const useGetCalls = () => {
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);

      console.log("User ID inside the hook",user);
      
      try {
        // Get all the meetings such that the latest one is shown first,
        // where the logged in person is either the creator or one of the members involved.
        const { calls } = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user?.id },
              { members: { $in: [user?.id] } },
            ],
          },
        });

        console.log("Fetched Calls inside the useEffect:",calls)
        setCalls(calls);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return (startsAt && new Date(startsAt) > now);
  });

  return { endedCalls, upcomingCalls, callRecordings: calls, isLoading };
};
