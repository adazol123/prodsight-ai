import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import React from "react";

type Props = {
  resources: Partial<
    {
      title: string;
      type: string;
      url: string;
    }[]
  >;
};

const ResourcesSection = ({ resources }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resources</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!!resources.length && (
          <div className="space-y-1">
            {resources.map((resource, index) => {
              return (
                <React.Fragment key={`resource_${index}`}>
                  <div>
                    <span className="flex text-sm mb-0">{resource.title}</span>
                    <a href={resource.url} target="_blank" className="text-xs flex text-muted-foreground font-light underline underline-offset-2">
                      {resource.url}
                    </a>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResourcesSection;
