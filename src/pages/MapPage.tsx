import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { incidents, incidentTypeColors, incidentTypeBadgeClasses, type Incident } from "@/data/incidents";

const typeList: Incident["type"][] = ["Missile", "Drone", "UAV", "Interception"];

const MapPage = () => {
  const [activeTypes, setActiveTypes] = useState<Set<Incident["type"]>>(new Set(typeList));
  const [mapReady, setMapReady] = useState(false);

  const toggleType = (type: Incident["type"]) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  };

  const filtered = incidents.filter((i) => activeTypes.has(i.type));

  useEffect(() => {
    setMapReady(true);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Filters */}
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

      {/* Map */}
      <div className="flex-1 relative">
        {mapReady && <LeafletMap incidents={filtered} />}
      </div>
    </div>
  );
};

// Separate component so leaflet is only imported client-side
const LeafletMap = ({ incidents: filteredIncidents }: { incidents: Incident[] }) => {
  const { MapContainer, TileLayer, CircleMarker, Popup } = require("react-leaflet");
  require("leaflet/dist/leaflet.css");

  return (
    <MapContainer
      center={[24.4, 54.5]}
      zoom={7}
      className="h-full w-full"
      style={{ background: "hsl(222, 47%, 6%)" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      {filteredIncidents.map((incident) => (
        <CircleMarker
          key={incident.id}
          center={incident.coordinates}
          radius={10}
          pathOptions={{
            color: incidentTypeColors[incident.type],
            fillColor: incidentTypeColors[incident.type],
            fillOpacity: 0.6,
            weight: 2,
          }}
        >
          <Popup>
            <div className="text-sm space-y-1 min-w-[200px]" style={{ color: "#1e293b" }}>
              <p className="font-bold">{incident.title}</p>
              <p className="text-xs">{new Date(incident.date).toLocaleDateString()}</p>
              <p className="text-xs"><strong>Type:</strong> {incident.type}</p>
              <p className="text-xs"><strong>Location:</strong> {incident.location}</p>
              <p className="text-xs">{incident.description}</p>
              <a href={incident.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">
                Source: {incident.sourceName}
              </a>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapPage;
