import React, { useState } from "react";
import { Filter, Grid, List, MapPin, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import FilterDialog from "@/components/FilterDialog";
import playerProfile1 from "@/assets/player-profile-1.jpg";
import playerProfile2 from "@/assets/player-profile-2.jpg";

const MatchmakingPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const mockPlayers = [
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
      name: "Sarah Mueller",
      age: 26,
      sport: "Tennis",
      skill: "Beginner",
      distance: "3.1 km", 
      time: "Weekends",
      image: playerProfile1,
      bio: "Just started playing tennis and looking for patient partners to improve with.",
      rating: 4.5,
      matches: 15,
    },
    {
      id: 4,
      name: "Thomas Klein",
      age: 31,
      sport: "Squash",
      skill: "Advanced",
      distance: "2.7 km",
      time: "Mornings",
      image: playerProfile2,
      bio: "Competitive squash player looking for challenging matches.",
      rating: 4.7,
      matches: 89,
    },
  ];

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockPlayers.map((player) => (
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
            </div>

            {/* Hover Actions */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" className="bg-accent hover:bg-accent-light">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderListView = () => (
    <div className="space-y-4">
      {mockPlayers.map((player) => (
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
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find Players</h1>
              <p className="text-muted-foreground">Connect with racquet sports players in your area</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* View Toggle */}
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
              </div>
              
              {/* Filter Button */}
              <FilterDialog>
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
              Showing {mockPlayers.length} players • Within 5km • All skill levels
            </p>
          </div>

          {/* Player Grid/List */}
          {viewMode === 'grid' ? renderGridView() : renderListView()}
        </div>
      </main>
    </div>
  );
};

export default MatchmakingPage;