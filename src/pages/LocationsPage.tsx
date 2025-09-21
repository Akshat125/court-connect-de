import React, { useEffect, useMemo, useRef, useState } from "react";
import { Search, Filter, Plus, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import "leaflet/dist/leaflet.css";
import L, { type LatLngExpression, type Map as LeafletMap, type LayerGroup, type Icon } from "leaflet";

type Venue = {
  id: number;
  name: string;
  distance: string;
  rating: number;
  courts: number;
  priceRange: string;
  nextSlot: string;
  image: string;
  sport: string;
  lat: number;
  lng: number;
};

const LocationsPage = () => {
  const [selectedSport, setSelectedSport] = useState("tennis");
  // Simple map only

  const sports = [
    { id: "tennis", name: "Tennis", icon: "🎾" },
    { id: "badminton", name: "Badminton", icon: "🏸" },
    { id: "squash", name: "Squash", icon: "🥍" },
    { id: "pickleball", name: "Pickleball", icon: "🏓" },
  ];

  const venues: Venue[] = useMemo(() => ([
    {
      id: 1,
      name: "TC Berlin Mitte",
      distance: "1.2 km",
      rating: 4.8,
      courts: 6,
      priceRange: "€25-40",
      nextSlot: "14:00",
      image: "/api/placeholder/300/200",
      sport: "tennis",
      lat: 52.5208,
      lng: 13.4095,
    },
    {
      id: 2,
      name: "Sports Arena Kreuzberg", 
      distance: "2.1 km",
      rating: 4.6,
      courts: 8,
      priceRange: "€20-35",
      nextSlot: "16:30",
      image: "/api/placeholder/300/200",
      sport: "badminton",
      lat: 52.4986,
      lng: 13.4033,
    },
  ]), []);
  const icon: Icon = useMemo(() => L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  }), []);

  const filteredVenues = useMemo(() => venues.filter(v => v.sport === selectedSport), [venues, selectedSport]);
  const mapCenter: LatLngExpression = useMemo(() => [52.52, 13.405] as LatLngExpression, []);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<LayerGroup | null>(null);
  const mapDivRef = useRef<HTMLDivElement | null>(null);

  // No custom CSS or overlays in simple mode

  useEffect(() => {
    if (mapRef.current || !mapDivRef.current) return;
    const map = L.map(mapDivRef.current).setView(mapCenter, 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);
    markersRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = null;
    };
  }, [mapCenter]);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current) return;
    const group = markersRef.current;
    group.clearLayers();
    const bounds: L.LatLngExpression[] = [];
    filteredVenues.forEach((v) => {
      const m = L.marker([v.lat, v.lng], { icon });
      m.bindPopup(`<div style=\"font-weight:600\">${v.name}</div><div style=\"font-size:12px;color:#666\">${v.distance} • ⭐ ${v.rating}</div>`);
      m.addTo(group);
      bounds.push([v.lat, v.lng]);
    });
    if (bounds.length > 0) {
      const b = L.latLngBounds(bounds as L.LatLngExpression[]);
      mapRef.current.fitBounds(b, { padding: [20, 20] });
    } else {
      mapRef.current.setView(mapCenter, 12);
    }
  }, [filteredVenues, icon, mapCenter]);

  const recenter = () => {
    if (mapRef.current) mapRef.current.setView(mapCenter, 12);
  };

  const games = [
    {
      id: 1,
      title: "Mixed Doubles",
      venue: "TC Berlin Mitte",
      time: "Today, 18:00",
      players: "2/4",
      skill: "Intermediate",
      price: "€15",
      organizer: "Sarah M."
    },
    {
      id: 2,  
      title: "Singles Tournament",
      venue: "Sports Arena",
      time: "Tomorrow, 14:00",
      players: "6/8",
      skill: "Advanced", 
      price: "€20",
      organizer: "Tennis Club"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-5 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Courts & Games</h1>
              <p className="text-muted-foreground">Find venues and join ongoing games</p>
            </div>
            <Button className="bg-accent hover:bg-accent-light">
              <Plus className="h-4 w-4 mr-2" />
              Create Game
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search locations..." className="pl-10" />
            </div>
            
            <div className="flex gap-2">
              {sports.map((sport) => (
                <Button
                  key={sport.id}
                  variant={selectedSport === sport.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSport(sport.id)}
                  className={selectedSport === sport.id ? "bg-primary hover:bg-primary/90" : ""}
                >
                  <span className="mr-2">{sport.icon}</span>
                  {sport.name}
                </Button>
              ))}
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden h-96">
                <div ref={mapDivRef} className="h-full w-full" />
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Venues */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Nearby Venues</h2>
                <div className="space-y-3">
                  {venues.map((venue) => (
                    <Card key={venue.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold">{venue.name}</h3>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <span>📍 {venue.distance}</span>
                              <span>⭐ {venue.rating}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">{venue.priceRange}</Badge>
                              <Badge variant="secondary" className="text-xs">{venue.courts} courts</Badge>
                            </div>
                            <Button size="sm" variant="outline">Book</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Active Games */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Join Games</h2>
                <div className="space-y-3">
                  {games.map((game) => (
                    <Card key={game.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-sm">{game.title}</h3>
                              <p className="text-xs text-muted-foreground">by {game.organizer}</p>
                            </div>
                            <Badge className="bg-accent text-accent-foreground text-xs">{game.price}</Badge>
                          </div>
                          
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center justify-between">
                              <span>{game.venue}</span>
                              <span>{game.time}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>{game.players} players</span>
                              <Badge variant="outline" className="text-xs">{game.skill}</Badge>
                            </div>
                          </div>
                          
                          <Button size="sm" className="w-full bg-accent hover:bg-accent-light">
                            Join Game
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationsPage;