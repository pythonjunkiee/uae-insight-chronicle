import { Shield, BookOpen, Scale, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => (
  <div className="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
    <div className="text-center space-y-4">
      <Shield className="h-12 w-12 text-primary mx-auto" />
      <h1 className="text-3xl font-bold text-foreground">About UAE Threat Tracker</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        An open-source intelligence dashboard providing historical analysis of publicly reported aerial threats and defense incidents involving the UAE.
      </p>
    </div>

    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BookOpen className="h-5 w-5 text-primary" /> Purpose
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-3">
        <p>This website serves as an educational and research tool designed to compile and visualize publicly reported drone, missile, and UAV incidents involving the United Arab Emirates from 2015 to the present.</p>
        <p>The goal is to provide researchers, journalists, students, and security analysts with an accessible, structured overview of historical aerial threat data based exclusively on open-source reporting.</p>
      </CardContent>
    </Card>

    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Database className="h-5 w-5 text-secondary" /> Data Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-3">
        <p>All incident data is sourced from publicly available and officially reported news. Sources include:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { name: "ACLED", desc: "Armed Conflict Location & Event Data Project" },
            { name: "GDELT", desc: "Global Database of Events, Language, and Tone" },
            { name: "Reuters", desc: "International wire service" },
            { name: "BBC News", desc: "British Broadcasting Corporation" },
            { name: "Gulf News", desc: "UAE-based English daily newspaper" },
            { name: "Khaleej Times", desc: "UAE-based English daily newspaper" },
            { name: "Al Jazeera", desc: "International news organization" },
            { name: "Wikipedia", desc: "Open encyclopedia (for cross-referencing)" },
          ].map(s => (
            <li key={s.name} className="p-3 rounded-md bg-muted/30 border border-border">
              <span className="font-medium text-foreground">{s.name}</span>
              <span className="block text-xs text-muted-foreground">{s.desc}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Shield className="h-5 w-5 text-warning" /> Methodology
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-3">
        <p>Each incident included in this database has been verified through the following process:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>Initial identification through news reports from at least one major international or regional outlet</li>
          <li>Cross-referencing with additional sources to confirm key details (date, location, type, outcome)</li>
          <li>Geolocation verification using publicly available satellite imagery and mapping data</li>
          <li>Classification by incident type (Missile, Drone, UAV) and outcome (Intercepted, Hit, Blocked)</li>
        </ol>
        <p>This project does not include classified information, unverified social media reports, or speculative analysis.</p>
      </CardContent>
    </Card>

    <Card className="border-border bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Scale className="h-5 w-5 text-primary" /> Legal Disclaimer
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground space-y-3">
        <p className="font-medium text-foreground">All information presented on this website is sourced from publicly available and officially reported news.</p>
        <ul className="list-disc list-inside space-y-1">
          <li>This website is for educational and research purposes only</li>
          <li>This is not a real-time monitoring tool or early warning system</li>
          <li>This project is not affiliated with the UAE government, any military body, or any intelligence agency</li>
          <li>No classified, restricted, or non-public information is used</li>
          <li>The creators assume no liability for the accuracy or completeness of the data</li>
        </ul>
      </CardContent>
    </Card>
  </div>
);

export default AboutPage;
