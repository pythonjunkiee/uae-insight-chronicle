import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { incidentTypeColors, type Incident } from "@/data/incidents";
import { useLiveIncidents } from "@/hooks/useLiveIncidents";

const typeList: Incident["type"][] = ["Missile", "Drone", "UAV", "Interception"];

const MapPage = () => {
  const { incidents, loading } = useLiveIncidents();
  const [activeTypes, setActiveTypes] = useState<Set<Incident["type"]>>(new Set(typeList));
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);

  const toggleType = (type: Incident["type"]) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  // Count per type
  const typeCounts = typeList.reduce((acc, t) => {
    acc[t] = incidents.filter((i) => i.type === t).length;
    return acc;
  }, {} as Record<string, number>);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [24.4, 54.5],
      zoom: 7,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com">CARTO</a>',
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when filters or incidents change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filtered = incidents.filter((i) => activeTypes.has(i.type));
    const now = Date.now();
    const DAY_MS = 24 * 60 * 60 * 1000;

    filtered.forEach((incident) => {
      const color = incidentTypeColors[incident.type];
      const isRecent = now - new Date(incident.date).getTime() < DAY_MS;
      const marker = L.circleMarker(incident.coordinates, {
        radius: 10,
        color,
        fillColor: color,
        fillOpacity: 0.6,
        weight: 2,
        className: isRecent ? "animate-pulse" : "",
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width:200px;font-family:Inter,sans-serif;">
          <p style="font-weight:700;margin:0 0 4px;color:#1e293b;">${incident.title}</p>
          <p style="font-size:12px;color:#64748b;margin:0 0 2px;">${new Date(incident.date).toLocaleDateString()}</p>
          <p style="font-size:12px;color:#334155;margin:0 0 2px;"><strong>Type:</strong> ${incident.type}</p>
          <p style="font-size:12px;color:#334155;margin:0 0 2px;"><strong>Location:</strong> ${incident.location}</p>
          <p style="font-size:12px;color:#64748b;margin:0 0 4px;">${incident.description}</p>
          <a href="${incident.sourceUrl}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#2563eb;text-decoration:underline;">
            Source: ${incident.sourceName}
          </a>
        </div>
      `);

      markersRef.current.push(marker);
    });
  }, [activeTypes, incidents]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="container mx-auto px-4 py-3 flex flex-wrap gap-2">
        {typeList.map((type) => (
          <Button
            key={type}
            variant={activeTypes.has(type) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleType(type)}
            className="gap-2"
            style={activeTypes.has(type) ? { backgroundColor: incidentTypeColors[type] } : {}}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: incidentTypeColors[type] }} />
            {type} ({typeCounts[type]})
          </Button>
        ))}
      </div>

      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-background/60 backdrop-blur-sm">
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-48 mx-auto" />
              <p className="text-sm text-muted-foreground">Loading live data…</p>
            </div>
          </div>
        )}
        <div ref={containerRef} className="h-full w-full" style={{ background: "hsl(222, 47%, 6%)" }} />
      </div>
    </div>
  );
};

export default MapPage;
