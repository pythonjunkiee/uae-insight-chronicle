

# UAE Threat Tracker — Implementation Plan

## Overview
A dark-themed, professional dashboard tracking publicly reported drone, missile, and UAV incidents in the UAE (2015–present), using static JSON data. Five pages with maps, charts, timeline, and data table.

## Design System
- **Theme**: Dark navy/charcoal background (`#0f172a`, `#1e293b`), with red (`#ef4444`) and orange (`#f97316`) accents
- **Font**: Inter sans-serif
- **Branding**: UAE flag colors (red, green, white, black) subtly used; shield logo with UAE silhouette
- **Disclaimer banner**: Persistent top banner on all pages

## Data Layer
- Static JSON file (`src/data/incidents.json`) with ~8-10 verified incidents (2018–2022), each containing: date, type, location, coordinates, target area, outcome, description, source URL
- Types: Missile, Drone, UAV, Interception
- Outcomes: Intercepted, Hit, Blocked

## Pages

### 1. Home / Dashboard
- Disclaimer banner at top
- Hero section with stylized UAE/Arabian Gulf map graphic (SVG illustration, not interactive)
- 4 summary stat cards (Total Incidents, Missiles Intercepted, Drones Intercepted, UAVs Blocked)
- Bar chart (incidents by year) using Recharts
- Recent incidents feed (latest 5 events)

### 2. Interactive Map
- Full-screen Leaflet.js map centered on UAE (~24.4, 54.6)
- Color-coded circle markers by type (red/orange/yellow/green)
- Click marker → popup with date, type, location, description, source link
- Filter toggle buttons by incident type
- Install `leaflet` and `react-leaflet` packages

### 3. Timeline
- Vertical scrollable timeline (2015–present)
- Event cards with date, title, type badge (color-coded), description, source link
- Filter by year dropdown and incident type
- Search bar for keyword filtering

### 4. Incidents Table
- Sortable, searchable data table: Date | Location | Type | Target Area | Outcome | Source
- Filter dropdowns for Type and Outcome
- Pagination (20 per page)
- CSV export button

### 5. About
- Purpose explanation, methodology, data sources list (ACLED, GDELT, Reuters, BBC, Gulf News, Khaleej Times, Wikipedia), legal disclaimer

## Shared Components
- **Navbar**: Logo + nav links, mobile hamburger menu
- **Footer**: Disclaimer text, source links, non-affiliation notice
- **Disclaimer Banner**: Fixed/sticky top banner on all pages

## Navigation
- React Router with 5 routes: `/`, `/map`, `/timeline`, `/incidents`, `/about`

