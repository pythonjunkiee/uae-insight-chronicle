import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApiStatuses } from "@/lib/liveDataService";

interface Props {
  statuses: ApiStatuses;
  lastUpdated: Date | null;
  incidentCount: number;
  loading: boolean;
  onRefresh: () => void;
}

const apiLabels: Record<keyof ApiStatuses, string> = {
  gdelt: "GDELT",
  newsapi: "NewsAPI",
  acled: "ACLED",
  mediastack: "MediaStack",
};

const dotColor: Record<string, string> = {
  active: "bg-green-500",
  failed: "bg-red-500",
  disabled: "bg-muted-foreground/40",
};

const ApiStatusBar = ({ statuses, lastUpdated, incidentCount, loading, onRefresh }: Props) => (
  <div className="w-full bg-card/80 border-b border-border backdrop-blur-sm">
    <div className="container mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
      <div className="flex items-center gap-4 flex-wrap">
        {(Object.keys(apiLabels) as (keyof ApiStatuses)[]).map((key) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${dotColor[statuses[key]]}`} />
            {apiLabels[key]}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span>{incidentCount} incidents</span>
        {lastUpdated && (
          <span>Updated {lastUpdated.toLocaleTimeString()}</span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs gap-1"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
    </div>
  </div>
);

export default ApiStatusBar;
