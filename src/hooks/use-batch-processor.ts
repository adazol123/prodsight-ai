"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createParser, ParseEvent, ReconnectInterval } from "eventsource-parser";
const BATCH_RESULTS_QUERY_KEY = ["geminiBatchResults"];


export const useBatchProcessor = () => {
  const queryClient = useQueryClient();

  const {data: results, status} = useQuery({
    queryKey: BATCH_RESULTS_QUERY_KEY,
    initialData: {},
    staleTime: Infinity, //fully managed by mutation
  });

  const { mutate, isPending} = useMutation({
    mutationFn: async (prompts) => {
      queryClient.setQueryData(BATCH_RESULTS_QUERY_KEY, {});

      const response = await fetch("/api/v1/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: "eysdsad",
        },
        body: JSON.stringify(prompts),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      if (!response.body) {
        throw new Error("Response body is missing");
      }


     // Set up the SSE parser
      const onParse = (event: ParseEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          // If the server signals 'done', we're finished
          if (event?.data === '[DONE]') {
            return; // The stream will close on its own
          }
          // Otherwise, parse the data and update the query cache
          const parsedData = JSON.parse(event.data);
          
          queryClient.setQueryData(BATCH_RESULTS_QUERY_KEY, (oldData: any) => {
            const newData = { ...oldData };
            const currentItem = newData[parsedData.id] || { response: '', success: true, error: null };
            
            if (parsedData.chunk) {
              currentItem.response += parsedData.chunk;
            }
            
            if (parsedData.error) {
              currentItem.error = parsedData.error;
              currentItem.success = false;
            }

            newData[parsedData.id] = currentItem;
            return newData;
          });
        }
      };

      const parser = createParser(onParse);
      
      // Read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break; // Exit the loop when the stream is fully read
          }
          // Decode the chunk and feed it to the parser
          const chunkAsText = decoder.decode(value);
          parser.feed(chunkAsText);
        }
      } finally {
        reader.releaseLock();
      }
    },
    onError: (error) => {
         console.error("Mutation failed:", error);
    }
  });

   return {
    results,
    status,
    startProcessing: mutate,
    isProcessing: isPending,
  };
};
