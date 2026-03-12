import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Shield, Crosshair, Radio, Eye, ArrowRight, ExternalLink, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { incidentTypeBadgeClasses } from "@/data/incidents";
import { useLiveIncidents } from "@/hooks/useLiveIncidents";
import ApiStatusBar from "@/components/ApiStatusBar";

const Index = () => {
  const { incidents, loading, error, lastUpdated, apiStatuses, refresh } = useLiveIncidents();

  const stats = useMemo(() => {
    const total = incidents.length;
    const missilesIntercepted = incidents.filter(i => i.type === "Missile" && i.outcome === "Intercepted").length;
    const dronesIntercepted = incidents.filter(i => (i.type === "Drone" || i.type === "Interception") && i.outcome === "Intercepted").length;
    const uavBlocked = incidents.filter(i => i.type === "UAV" && i.outcome === "Blocked").length;
    return { total, missilesIntercepted, dronesIntercepted, uavBlocked };
  }, [incidents]);

  const chartData = useMemo(() => {
    const byYear: Record<string, number> = {};
    incidents.forEach(i => {
      const year = i.date.substring(0, 4);
      byYear[year] = (byYear[year] || 0) + 1;
    });
    return Object.entries(byYear).sort().map(([year, count]) => ({ year, count }));
  }, [incidents]);

  const recentIncidents = useMemo(() =>
    [...incidents].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5),
  [incidents]);

  const statCards = [
    { label: "Total Incidents", value: stats.total, icon: Shield, color: "text-primary" },
    { label: "Missiles Intercepted", value: stats.missilesIntercepted, icon: Crosshair, color: "text-primary" },
    { label: "Drones Intercepted", value: stats.dronesIntercepted, icon: Radio, color: "text-secondary" },
    { label: "UAVs Blocked", value: stats.uavBlocked, icon: Eye, color: "text-warning" },
  ];

  return (
    <div>
      <ApiStatusBar
        statuses={apiStatuses}
        lastUpdated={lastUpdated}
        incidentCount={incidents.length}
        loading={loading}
        onRefresh={refresh}
      />

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Error fallback banner */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            Showing cached historical data — live APIs temporarily unavailable
          </div>
        )}

        {/* Hero */}
        <div className="text-center space-y-4 py-8">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/20">
              <Shield className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            UAE Threat Tracker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Historical data dashboard tracking publicly reported drone, missile, and UAV incidents in the UAE from 2015 to present.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="border-border bg-card">
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-24" />
                  </CardContent>
                </Card>
              ))
            : statCards.map((s) => (
                <Card key={s.label} className="border-border bg-card">
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <s.icon className={`h-8 w-8 ${s.color}`} />
                    <span className="text-3xl font-bold text-foreground">{s.value}</span>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                  </CardContent>
                </Card>
              ))}
        </div>

        {/* Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Incidents by Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              {loading ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                    <XAxis dataKey="year" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                    <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(222, 47%, 9%)",
                        border: "1px solid hsl(222, 30%, 18%)",
                        borderRadius: "8px",
                        color: "hsl(210, 40%, 95%)",
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-foreground">Recent Incidents</CardTitle>
            <Link to="/incidents" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))
              : recentIncidents.map((incident) => (
                  <div key={incident.id} className="flex items-start justify-between gap-4 p-3 rounded-lg bg-muted/30 border border-border">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-muted-foreground">{new Date(incident.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                        <Badge variant="outline" className={`text-[10px] ${incidentTypeBadgeClasses[incident.type]}`}>
                          {incident.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-foreground">{incident.title}</p>
                      <p className="text-xs text-muted-foreground">{incident.location}</p>
                    </div>
                    <a href={incident.sourceUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
