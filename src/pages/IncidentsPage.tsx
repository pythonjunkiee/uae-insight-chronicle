import { useState, useMemo } from "react";
import { Search, Download, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { incidents, incidentTypeBadgeClasses, type Incident } from "@/data/incidents";

const typeList: Incident["type"][] = ["Missile", "Drone", "UAV", "Interception"];
const outcomeList: Incident["outcome"][] = ["Intercepted", "Hit", "Blocked"];
const PAGE_SIZE = 20;

const IncidentsPage = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [sortField, setSortField] = useState<"date" | "location" | "type">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let data = [...incidents];
    if (typeFilter !== "all") data = data.filter(i => i.type === typeFilter);
    if (outcomeFilter !== "all") data = data.filter(i => i.outcome === outcomeFilter);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(i => i.title.toLowerCase().includes(q) || i.location.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    data.sort((a, b) => {
      const av = a[sortField], bv = b[sortField];
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return data;
  }, [search, typeFilter, outcomeFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
  };

  const exportCSV = () => {
    const header = "Date,Location,Type,Target Area,Outcome,Source\n";
    const rows = filtered.map(i => `"${i.date}","${i.location}","${i.type}","${i.targetArea}","${i.outcome}","${i.sourceUrl}"`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "uae-incidents.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-foreground">Incidents Database</h1>
        <Button onClick={exportCSV} variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-10 bg-card border-border" />
        </div>
        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-40 bg-card border-border"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {typeList.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={outcomeFilter} onValueChange={(v) => { setOutcomeFilter(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-40 bg-card border-border"><SelectValue placeholder="Outcome" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Outcomes</SelectItem>
            {outcomeList.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>Date {sortField === "date" && (sortDir === "asc" ? "↑" : "↓")}</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>Location {sortField === "location" && (sortDir === "asc" ? "↑" : "↓")}</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("type")}>Type {sortField === "type" && (sortDir === "asc" ? "↑" : "↓")}</TableHead>
              <TableHead>Target Area</TableHead>
              <TableHead>Outcome</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="text-sm whitespace-nowrap">{new Date(i.date).toLocaleDateString()}</TableCell>
                <TableCell className="text-sm">{i.location}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[10px] ${incidentTypeBadgeClasses[i.type]}`}>{i.type}</Badge>
                </TableCell>
                <TableCell className="text-sm">{i.targetArea}</TableCell>
                <TableCell className="text-sm">{i.outcome}</TableCell>
                <TableCell>
                  <a href={i.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No incidents found.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
          <span className="flex items-center text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
};

export default IncidentsPage;
