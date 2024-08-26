"use client";

// This hook just queries all the calls that we have
// and finds the particular one with the string given in parameter id
// and then returns the call and the loading state of the call.

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id,
        },
      });

      if (calls.length > 0) setCall(calls[0]);

      setIsCallLoading(false);
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
