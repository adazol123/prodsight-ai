import CardDetailItem from "@/app/dashboard/_components/card-detail-item";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import { Label } from "@/components/shared/label";
import { startCase } from "lodash";

interface Props {
  featurePrioritization: Partial<{
    approach: string;
    priorities_defined: string;
    prioritization: Partial<{
      could_have: string[];
      must_have: string[];
      should_have: string[];
      wont_have_for_mvp: string[];
    }>;
  }>;
}

const FeaturePrioritizationSection = ({ featurePrioritization }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Prioritization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CardDetailItem
          label="Approach"
          value={featurePrioritization?.approach}
        />
        <CardDetailItem
          label="Priorities Defined"
          value={featurePrioritization?.priorities_defined}
        />
        {!!featurePrioritization?.prioritization && (
          <div className="space-y-2">
            <h4 className="font-semibold">Priorities</h4>

            {Object.entries(featurePrioritization?.prioritization).map(
              ([key, value]) => {
                return (
                  <div key={key}>
                    <Label htmlFor={`prio_${key}`}>{startCase(key)}</Label>
                    <ul id={`prio_${key}`} className="list-disc list-inside text-sm text-muted-foreground">
                      {value.map((prio) => (
                        <li key={prio}>{prio}</li>
                      ))}
                    </ul>
                  </div>
                );
              }
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeaturePrioritizationSection;
