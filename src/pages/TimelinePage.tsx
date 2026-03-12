import { useState, useMemo } from "react";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { incidentTypeBadgeClasses, type Incident } from "@/data/incidents";
import { useLiveIncidents } from "@/hooks/useLiveIncidents";

const typeList: Incident["type"][] = ["Missile", "Drone", "UAV", "Interception"];

const TimelinePage = () => {
  const { incidents, loading } = useLiveIncidents();
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const years = useMemo(() => {
    const s = new Set(incidents.map(i => i.date.substring(0, 4)));
    return Array.from(s).sort().reverse();
  }, [incidents]);

  const filtered = useMemo(() => {
    return [...incidents]
      .sort((a, b) => b.date.localeCompare(a.date))
      .filter(i => {
        if (yearFilter !== "all" && !i.date.startsWith(yearFilter)) return false;
        if (typeFilter !== "all" && i.type !== typeFilter) return false;
        if (search) {
          const q = search.toLowerCase();
          return i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.location.toLowerCase().includes(q);
        }
        return true;
      });
  }, [incidents, search, yearFilter, typeFilter]);

  const isRecent = (date: string) => {
    return Date.now() - new Date(date).getTime() < 7 * 24 * 60 * 60 * 1000;
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Incident Timeline</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search incidents..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-card border-border" />
        </div>
        <Select value={yearFilter} onValueChange={setYearFilter}>
          <SelectTrigger className="w-full sm:w-36 bg-card border-border">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Years</SelectItem>
            {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-card border-border">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {typeList.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-8">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                  <Skeleton className="h-32 w-full rounded-lg" />
                </div>
              ))
            : filtered.map((incident, idx) => (
                <div key={incident.id} className={`relative flex ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8`}>
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1/2 mt-6 z-10" />
                  <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-muted-foreground">
                          {new Date(incident.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <Badge variant="outline" className={`text-[10px] ${incidentTypeBadgeClasses[incident.type]}`}>
                          {incident.type}
                        </Badge>
                        {isRecent(incident.date) && (
                          <Badge className="text-[10px] bg-green-500/20 text-green-400 border-green-500/30">
                            LIVE
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground">{incident.title}</h3>
                      <p className="text-sm text-muted-foreground">{incident.description}</p>
                      <a href={incident.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                        {incident.sourceName} <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          {!loading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No incidents found matching your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
