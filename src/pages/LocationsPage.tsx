import React, { useState } from "react";
import { Search, Filter, Plus, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";

const LocationsPage = () => {
  const [selectedSport, setSelectedSport] = useState("tennis");

  const sports = [
    { id: "tennis", name: "Tennis", icon: "🎾" },
    { id: "badminton", name: "Badminton", icon: "🏸" },
    { id: "squash", name: "Squash", icon: "🥍" },
    { id: "pickleball", name: "Pickleball", icon: "🏓" },
  ];

  const venues = [
    {
      id: 1,
      name: "TC Berlin Mitte",
      distance: "1.2 km",
      rating: 4.8,
      courts: 6,
      priceRange: "€25-40",
      nextSlot: "14:00",
      image: "/api/placeholder/300/200",
      sport: "tennis"
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
      sport: "badminton"
    },
  ];

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
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-40 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Locations & Games</h1>
            <p className="text-sm text-muted-foreground">Find courts and join games</p>
          </div>
          <Button size="sm" className="bg-accent hover:bg-accent-light">
            <Plus className="h-4 w-4 mr-2" />
            Create
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search locations..." className="pl-10" />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
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
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Map Placeholder */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-accent/20 to-primary/20 relative flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Interactive Map</p>
              <p className="text-xs text-muted-foreground mt-1">2 Locations Found</p>
            </div>
          </div>
        </Card>

        {/* Venues */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Nearby Venues</h2>
          <div className="space-y-3">
            {venues.map((venue) => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 flex-shrink-0"></div>
                  <CardContent className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{venue.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <span>📍 {venue.distance}</span>
                          <span>⭐ {venue.rating}</span>
                          <span>🏟️ {venue.courts} courts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{venue.priceRange}</Badge>
                          <Badge variant="secondary" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Next: {venue.nextSlot}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-2">Book</Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Active Games */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Join Games</h2>
          <div className="space-y-3">
            {games.map((game) => (
              <Card key={game.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{game.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">by {game.organizer}</p>
                    </div>
                    <Badge className="bg-accent text-accent-foreground text-xs">{game.price}</Badge>
                  </div>
                  
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {game.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {game.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {game.players} players
                      </span>
                      <Badge variant="outline" className="text-xs">{game.skill}</Badge>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full mt-3 bg-accent hover:bg-accent-light">
                    Join Game
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default LocationsPage;