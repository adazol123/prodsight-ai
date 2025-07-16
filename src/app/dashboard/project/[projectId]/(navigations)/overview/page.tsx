"use client";
import {
  PROJECTBYID_KEY,
  queryProjectById,
} from "@/app/dashboard/_actions/project.query.action";
import CardDetailItem from "@/app/dashboard/_components/card-detail-item";
import { Alert, AlertDescription, AlertTitle } from "@/components/shared/alert";
import { Button } from "@/components/shared/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { IconPencil } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb } from "lucide-react";
import { useParams } from "next/navigation";

const OverviewPage = () => {
  const params = useParams();
  const { isFetching, data } = useQuery({
    queryKey: [PROJECTBYID_KEY, params.projectId as string],
    queryFn: async ({ queryKey }) => {
      const { result, error } = await queryProjectById(queryKey[1]!);
      if (error) throw error;
      else {
        return result;
      }
    },
  });

  const productOverview = data?.product_overview
  return (
    <>
      {isFetching ? (
        <span>Loading...</span>
      ) : (
        <div className="space-y-4 py-4">
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          <Alert className="bg-transparent border-yellow-500 text-yellow-500">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="font-semibold">Insights</AlertTitle>
            <AlertDescription className="text-sm">
              Virtual Party Rooms is a platform enabling users to create and
              join virtual rooms for hosting and attending parties online. It
              offers features such as real-time video and audio streaming,
              interactive games, and customized party themes to ensure an
              engaging and immersive experience for users.
            </AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <h3>Product Brief Overview</h3>
                  <Button size="icon" variant="ghost">
                    <IconPencil />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CardDetailItem label="Title" value={productOverview?.title} />
                <CardDetailItem label="Description" value={productOverview?.description} />
                <CardDetailItem label="Key Value Proposition" value={productOverview?.key_value_proposition} />
                <CardDetailItem label="Alignment To Execution" value={productOverview?.alignment_to_execution} />
              </CardContent>
            </Card>
            <div className="col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Prioritization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Approach</h4>
                    <p className="text-sm text-muted-foreground">
                      Virtual Party Rooms is a platform enabling users to create
                      and join virtual rooms for hosting and attending parties
                      online. It offers features such as real-time video and
                      audio streaming, interactive games, and customized party
                      themes to ensure an engaging and immersive experience for
                      users.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Priorities Defined</h4>
                    <p className="text-sm text-muted-foreground">
                      Virtual Party Rooms is a platform enabling users to create
                      and join virtual rooms for hosting and attending parties
                      online. It offers features such as real-time video and
                      audio streaming, interactive games, and customized party
                      themes to ensure an engaging and immersive experience for
                      users.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Priorities</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Timeline: 3 weeks</li>
                      <li>Budget: $50 monthly</li>
                      <li>Headcount: 1</li>
                      <li>
                        Tech Stack: TypeScript, Next.JS, Next.js, Framer Motion,
                        Redux Toolkit, Upstash Redis, Supabase, Imagekit, AWS S3
                      </li>
                      <li>Date Created: May 24, 2025 | 05:45 AM</li>
                      <li>Last Update: 1 hour ago</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">6</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewPage;
