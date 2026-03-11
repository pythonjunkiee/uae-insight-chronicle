import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { incidents, incidentTypeColors, type Incident } from "@/data/incidents";

const typeList: Incident["type"][] = ["Missile", "Drone", "UAV", "Interception"];

const MapPage = () => {
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

  // Update markers when filters change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const filtered = incidents.filter((i) => activeTypes.has(i.type));

    filtered.forEach((incident) => {
      const color = incidentTypeColors[incident.type];
      const marker = L.circleMarker(incident.coordinates, {
        radius: 10,
        color,
        fillColor: color,
        fillOpacity: 0.6,
        weight: 2,
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
  }, [activeTypes]);

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
            {type}
          </Button>
        ))}
      </div>

      <div className="flex-1">
        <div ref={containerRef} className="h-full w-full" style={{ background: "hsl(222, 47%, 6%)" }} />
      </div>
    </div>
  );
};

export default MapPage;
