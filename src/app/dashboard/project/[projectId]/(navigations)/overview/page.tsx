"use client";
import {
  PROJECTBYID_KEY,
  queryProjectById,
} from "@/app/dashboard/_actions/project.query.action";
import CardDetailItem from "@/app/dashboard/_components/card-detail-item";
import { Button } from "@/components/shared/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { IconPencil } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import FeaturePrioritizationSection from "./_components/feature-prioritization-section";
import ResourcesSection from "./_components/resources-section";

const OverviewPage = () => {
  const params = useParams();
  const { isFetching, data } = useQuery({
    queryKey: [PROJECTBYID_KEY, params.projectId as string],
    queryFn: async ({ queryKey }) => {
      const { result, error } = await queryProjectById<any>(queryKey[1]!);
      if (error) throw error;
      else {
        return result;
      }
    },
  });

  console.log(data)
  const productOverview = data?.project_overview
  return (
    <>
      {isFetching ? (
        <span>Loading...</span>
      ) : (
        <div className="space-y-4 py-4">
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          {/* <Alert className="bg-transparent border-yellow-500 text-yellow-500">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="font-semibold">Insights</AlertTitle>
            <AlertDescription className="text-sm">
              Virtual Party Rooms is a platform enabling users to create and
              join virtual rooms for hosting and attending parties online. It
              offers features such as real-time video and audio streaming,
              interactive games, and customized party themes to ensure an
              engaging and immersive experience for users.
            </AlertDescription>
          </Alert> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="col-span-1 sticky top-[160px] h-fit">
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
              <FeaturePrioritizationSection featurePrioritization={data?.feature_prioritization} />
              <ResourcesSection resources={data?.resources || []} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewPage;
