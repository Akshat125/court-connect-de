import React, { useMemo, useState } from "react";
import { Filter, Grid, List, MapPin, Clock, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import FilterDialog from "@/components/FilterDialog";
import SwipeDeck from "@/components/SwipeDeck";
import playerProfile1 from "@/assets/player-profile-1.jpg";
import playerProfile2 from "@/assets/player-profile-2.jpg";
import playerProfile3 from "@/assets/player-profile-3.jpg";
import playerProfile4 from "@/assets/player-profile-4.jpg";

const MatchmakingPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'swipe'>('swipe');
  const [filters, setFilters] = useState({
    sport: "all",
    skills: [] as string[],
    maxDistanceKm: 5,
    date: null as Date | null,
    time: "any",
    gameFormat: ["singles", "doubles"],
    withBooking: false,
  });

  const mockPlayers = useMemo(() => ([
    {
      id: 1,
      name: "Anna Weber",
      age: 25,
      sport: "Tennis",
      skill: "Intermediate",
      distance: "2.3 km",
      time: "Available now",
      image: playerProfile1,
      bio: "Love playing tennis on weekends! Looking for regular playing partners.",
      rating: 4.8,
      matches: 42,
    },
    {
      id: 2,
      name: "Max Schmidt",
      age: 28,
      sport: "Badminton", 
      skill: "Advanced",
      distance: "1.8 km",
      time: "Evening slots",
      image: playerProfile2,
      bio: "Former club player. Seeking competitive matches and fun games.",
      rating: 4.9,
      matches: 68,
    },
    {
      id: 3,
      name: "Akshat Tandon",
      age: 21,
      sport: "Tennis",
      skill: "Intermediate",
      distance: "2.0 km",
      time: "Afternoons",
      image: playerProfile3,
      bio: "Student who enjoys fast-paced rallies. Open to friendly games and drill sessions.",
      rating: 4.6,
      matches: 23,
    },
    {
      id: 4,
      name: "Shubham Joshi",
      age: 23,
      sport: "Table Tennis",
      skill: "Advanced",
      distance: "4.2 km",
      time: "Early mornings",
      image: playerProfile4,
      bio: "Trail lover seeking weekend hiking buddies and outdoor adventures around the city.",
      rating: 4.4,
      matches: 12,
    },
  ]), []);

  const filteredPlayers = useMemo(() => {
    const parseKm = (distance: string) => {
      const match = distance.match(/([0-9]+\.?[0-9]*)/);
      return match ? parseFloat(match[1]) : Infinity;
    };

    return mockPlayers.filter((p) => {
      const sportOk = filters.sport === 'all' ? true : p.sport.toLowerCase() === filters.sport.toLowerCase();
      const skillOk = filters.skills.length ? filters.skills.includes(p.skill) : true;
      const distanceOk = parseKm(p.distance) <= filters.maxDistanceKm;
      const timeOk = true; // Mock data doesn't have structured date/time
      // gameFormat and withBooking are placeholders in mock data; keep them as UI-only for now
      return sportOk && skillOk && distanceOk && timeOk;
    });
  }, [mockPlayers, filters]);

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredPlayers.map((player) => (
        <Card key={player.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
          <div className="relative aspect-[3/4]">
            <img 
              src={player.image} 
              alt={player.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-lg font-bold mb-1">{player.name}, {player.age}</h3>
              <p className="text-sm text-white/80 mb-2 line-clamp-2">{player.bio}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-accent text-accent-foreground text-xs">
                  {player.sport}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white text-xs">
                  {player.skill}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {player.distance}
                </span>
                <span>⭐ {player.rating}</span>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2">
                <Button size="sm" variant="outline" className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20">
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-accent hover:bg-accent-light">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {filteredPlayers.map((player) => (
        <Card key={player.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={player.image} alt={player.name} />
                <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{player.name}, {player.age}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{player.bio}</p>
                  </div>
                  <Button className="bg-accent hover:bg-accent-light ml-4">
                    <Heart className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 mb-3">
                  <Badge className="bg-accent text-accent-foreground">
                    {player.sport}
                  </Badge>
                  <Badge variant="outline">{player.skill}</Badge>
                  <span className="text-sm text-muted-foreground">⭐ {player.rating} ({player.matches} matches)</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {player.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {player.time}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-5 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find your next match nearby</h1>
              <p className="text-muted-foreground">Swipe recommended players or refine with filters</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Toggle (Grid / List / Swipe) */}
              <div className="flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'swipe' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('swipe')}
                  className="h-8 w-8 p-0"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Filter Button */}
              <FilterDialog
                initialFilters={filters}
                onApply={(f) => setFilters(f)}
              >
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </FilterDialog>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPlayers.length} players • Within {filters.maxDistanceKm}km • {filters.sport === 'all' ? 'All sports' : filters.sport}
            </p>
          </div>

          {/* Player Grid / List / Swipe */}
          {viewMode === 'swipe' ? (
            <SwipeDeck players={filteredPlayers} />
          ) : viewMode === 'grid' ? (
            renderGridView()
          ) : (
            renderListView()
          )}
        </div>
      </main>
    </div>
  );
};

export default MatchmakingPage;