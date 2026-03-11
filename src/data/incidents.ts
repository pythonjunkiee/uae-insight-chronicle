export interface Incident {
  id: string;
  date: string;
  title: string;
  type: "Missile" | "Drone" | "UAV" | "Interception";
  location: string;
  coordinates: [number, number];
  targetArea: string;
  outcome: "Intercepted" | "Hit" | "Blocked";
  description: string;
  sourceUrl: string;
  sourceName: string;
}

export const incidents: Incident[] = [
  {
    id: "1",
    date: "2022-01-17",
    title: "Houthi Drone and Missile Attack on Abu Dhabi",
    type: "Drone",
    location: "Abu Dhabi - Musaffah",
    coordinates: [24.3500, 54.5000],
    targetArea: "Musaffah Industrial Area / ADNOC Facility",
    outcome: "Hit",
    description: "Houthi forces launched drone and missile strikes on Abu Dhabi, hitting the Musaffah industrial area near ADNOC storage tanks. Three people were killed and six others injured. Fires erupted at the ADNOC facility and near Abu Dhabi International Airport.",
    sourceUrl: "https://www.reuters.com/world/middle-east/uae-says-it-intercepted-two-ballistic-missiles-fired-by-houthis-2022-01-17/",
    sourceName: "Reuters"
  },
  {
    id: "2",
    date: "2022-01-24",
    title: "Second Houthi Attack Intercepted Over Abu Dhabi",
    type: "Missile",
    location: "Abu Dhabi",
    coordinates: [24.4539, 54.3773],
    targetArea: "Abu Dhabi Urban Area",
    outcome: "Intercepted",
    description: "UAE air defenses intercepted two ballistic missiles fired by Houthi rebels targeting Abu Dhabi. Missile debris fell in uninhabited areas. The US military confirmed a Patriot missile battery was used in the interception.",
    sourceUrl: "https://www.bbc.com/news/world-middle-east-60111697",
    sourceName: "BBC News"
  },
  {
    id: "3",
    date: "2022-02-02",
    title: "Ballistic Missiles Intercepted Over UAE",
    type: "Interception",
    location: "Abu Dhabi / Al Dhafra",
    coordinates: [24.2500, 54.5500],
    targetArea: "Al Dhafra Air Base Area",
    outcome: "Intercepted",
    description: "The UAE Ministry of Defence announced interception of a ballistic missile launched by Houthis towards the country. The US military at Al Dhafra Air Base also engaged the threat. Debris fell in unpopulated areas with no casualties reported.",
    sourceUrl: "https://www.aljazeera.com/news/2022/2/2/uae-says-it-intercepted-houthi-ballistic-missile",
    sourceName: "Al Jazeera"
  },
  {
    id: "4",
    date: "2022-03-02",
    title: "Houthi Drone Attack Attempt on UAE",
    type: "Drone",
    location: "UAE Airspace",
    coordinates: [24.4000, 54.6000],
    targetArea: "Critical Infrastructure",
    outcome: "Intercepted",
    description: "UAE forces intercepted and destroyed a Houthi drone that entered UAE airspace targeting critical infrastructure. No damage or casualties were reported. The UAE coalition confirmed the interception.",
    sourceUrl: "https://www.reuters.com/world/middle-east/coalition-says-it-intercepted-houthi-drone-targeting-uae-2022-03-02/",
    sourceName: "Reuters"
  },
  {
    id: "5",
    date: "2019-08-17",
    title: "Drone Disruption at Dubai International Airport",
    type: "UAV",
    location: "Dubai",
    coordinates: [25.2532, 55.3657],
    targetArea: "Dubai International Airport (DXB)",
    outcome: "Blocked",
    description: "Suspected unauthorized drone activity near Dubai International Airport caused temporary suspension of flights for about 30 minutes. The incident prompted enhanced anti-drone measures across UAE airports.",
    sourceUrl: "https://gulfnews.com/uae/transport/dubai-airport-operations-briefly-halted-due-to-suspected-drone-activity-1.65876543",
    sourceName: "Gulf News"
  },
  {
    id: "6",
    date: "2019-01-26",
    title: "Houthi Drone Strike on Al Anad Airbase (UAE forces)",
    type: "Drone",
    location: "Yemen - UAE Coalition Forces",
    coordinates: [24.2000, 54.4800],
    targetArea: "UAE Military Assets in Coalition",
    outcome: "Hit",
    description: "Houthi forces launched a drone attack targeting a military parade at Al Anad airbase where UAE-backed coalition forces were present. The attack demonstrated growing Houthi drone capabilities threatening UAE interests.",
    sourceUrl: "https://www.bbc.com/news/world-middle-east-46978498",
    sourceName: "BBC News"
  },
  {
    id: "7",
    date: "2018-07-26",
    title: "Houthi Drone Targets Abu Dhabi Airport",
    type: "Drone",
    location: "Abu Dhabi",
    coordinates: [24.4330, 54.6511],
    targetArea: "Abu Dhabi International Airport",
    outcome: "Blocked",
    description: "Houthi rebels claimed a drone attack on Abu Dhabi International Airport. UAE authorities initially denied the attack but later acknowledged an incident involving a small drone near the airport. No flights were disrupted.",
    sourceUrl: "https://www.reuters.com/article/us-yemen-security-emirates-idUSKBN1KG1TZ",
    sourceName: "Reuters"
  },
  {
    id: "8",
    date: "2022-01-31",
    title: "Houthi Missile Intercepted During Israeli President Visit",
    type: "Missile",
    location: "Abu Dhabi",
    coordinates: [24.4700, 54.3700],
    targetArea: "Abu Dhabi",
    outcome: "Intercepted",
    description: "A Houthi missile was intercepted over Abu Dhabi during the historic visit of Israeli President Isaac Herzog to the UAE. The interception highlighted ongoing threats during diplomatic engagements.",
    sourceUrl: "https://www.timesofisrael.com/uae-intercepts-houthi-missile-during-herzogs-visit/",
    sourceName: "Times of Israel"
  },
  {
    id: "9",
    date: "2018-04-11",
    title: "Drone Incident Near Fujairah Port",
    type: "UAV",
    location: "Fujairah",
    coordinates: [25.1164, 56.3414],
    targetArea: "Fujairah Port Area",
    outcome: "Blocked",
    description: "An unidentified drone was detected and neutralized near the Port of Fujairah, one of the world's largest bunkering ports. The incident raised concerns about drone threats to maritime infrastructure in the UAE.",
    sourceUrl: "https://www.khaleejtimes.com/uae/uae-strengthens-drone-regulations-after-security-incidents",
    sourceName: "Khaleej Times"
  },
  {
    id: "10",
    date: "2022-02-24",
    title: "Multiple Drones Intercepted Over Abu Dhabi",
    type: "Interception",
    location: "Abu Dhabi",
    coordinates: [24.4100, 54.4400],
    targetArea: "Abu Dhabi",
    outcome: "Intercepted",
    description: "UAE air defenses intercepted multiple hostile drones launched by Houthi forces targeting Abu Dhabi. The THAAD and Patriot missile defense systems were reportedly employed. No casualties or damage reported.",
    sourceUrl: "https://www.aljazeera.com/news/2022/2/24/uae-intercepts-houthi-drones-and-missiles",
    sourceName: "Al Jazeera"
  }
];

export const incidentTypeColors: Record<Incident["type"], string> = {
  Missile: "hsl(0, 84%, 60%)",
  Drone: "hsl(25, 95%, 53%)",
  UAV: "hsl(45, 93%, 47%)",
  Interception: "hsl(142, 71%, 45%)",
};

export const incidentTypeBadgeClasses: Record<Incident["type"], string> = {
  Missile: "bg-primary/20 text-primary border-primary/30",
  Drone: "bg-secondary/20 text-secondary border-secondary/30",
  UAV: "bg-warning/20 text-warning border-warning/30",
  Interception: "bg-success/20 text-success border-success/30",
};
