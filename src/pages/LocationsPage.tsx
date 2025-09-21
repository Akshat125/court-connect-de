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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
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
                <div className="h-full bg-gradient-to-br from-accent/20 to-primary/20 relative flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                    <p className="text-sm text-muted-foreground">2 Locations Found in Your Area</p>
                  </div>
                </div>
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