import React, { useState } from "react";
import { Filter, Heart, X, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import playerProfile1 from "@/assets/player-profile-1.jpg";
import playerProfile2 from "@/assets/player-profile-2.jpg";

const MatchmakingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockPlayers = [
    {
      id: 1,
      name: "Anna",
      age: 25,
      sport: "Tennis",
      skill: "Intermediate",
      distance: "2.3 km",
      time: "Available now",
      image: playerProfile1,
      bio: "Love playing tennis on weekends! Looking for regular playing partners.",
    },
    {
      id: 2,
      name: "Max",
      age: 28,
      sport: "Badminton",
      skill: "Advanced",
      distance: "1.8 km",
      time: "Evening slots",
      image: playerProfile2,
      bio: "Former club player. Seeking competitive matches and fun games.",
    },
  ];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex < mockPlayers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const currentPlayer = mockPlayers[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary-glow/20 pb-20">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div>
          <h1 className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
            together
          </h1>
          <p className="text-sm text-muted-foreground">Find your playing partner</p>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </header>

      {/* Main Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm aspect-[3/4] relative overflow-hidden shadow-[var(--shadow-elegant)] border-2 border-primary/20">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/30"
            style={{ backgroundImage: `url(${currentPlayer.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
          
          {/* Player Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="mb-3">
              <h2 className="text-2xl font-bold mb-1">{currentPlayer.name}, {currentPlayer.age}</h2>
              <p className="text-white/90 mb-3">{currentPlayer.bio}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  {currentPlayer.sport}
                </Badge>
                <Badge variant="outline" className="border-white/30 text-white">
                  {currentPlayer.skill}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {currentPlayer.distance}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {currentPlayer.time}
                </div>
              </div>
            </div>
          </div>

          {/* Sports Badge */}
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-primary-foreground">
              <Users className="h-3 w-3 mr-1" />
              Match
            </Badge>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-8 px-4 mb-6">
        <Button 
          size="lg" 
          variant="outline" 
          className="h-14 w-14 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={() => handleSwipe('left')}
        >
          <X className="h-6 w-6" />
        </Button>
        
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full bg-accent hover:bg-accent-light shadow-[var(--shadow-elegant)]"
          onClick={() => handleSwipe('right')}
        >
          <Heart className="h-6 w-6" />
        </Button>
      </div>

      <Navigation />
    </div>
  );
};

export default MatchmakingPage;