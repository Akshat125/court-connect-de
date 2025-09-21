import React, { useState } from "react";
import { Calendar, Clock, Star, Users, MapPin, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface FilterDialogProps {
  children: React.ReactNode;
}

const FilterDialog = ({ children }: FilterDialogProps) => {
  const [selectedSport, setSelectedSport] = useState("tennis");
  const [gameFormat, setGameFormat] = useState<string[]>(["singles", "doubles"]);
  const [withBooking, setWithBooking] = useState(false);

  const sports = [
    { id: "tennis", name: "Tennis", icon: "🎾" },
    { id: "badminton", name: "Badminton", icon: "🏸" },
    { id: "squash", name: "Squash", icon: "🥍" },
    { id: "pickleball", name: "Pickleball", icon: "🏓" },
  ];

  const filterSections = [
    { id: "date", icon: Calendar, label: "Date" },
    { id: "time", icon: Clock, label: "Time" },
    { id: "skills", icon: Star, label: "Skills" },
    { id: "groups", icon: Users, label: "Groups" },
    { id: "location", icon: MapPin, label: "Game Type & Location" },
  ];

  const toggleGameFormat = (format: string) => {
    setGameFormat(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Filters
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              Reset
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sport Selection */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Sport</h3>
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <span className="text-2xl">🎾</span>
              <span className="font-medium">Tennis</span>
            </div>
          </div>

          {/* Game Format */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-medium">Select Game Format</h3>
              <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                New
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant={gameFormat.includes("singles") ? "default" : "outline"}
                onClick={() => toggleGameFormat("singles")}
                className="flex-1"
              >
                Singles
              </Button>
              <Button
                variant={gameFormat.includes("doubles") ? "default" : "outline"}
                onClick={() => toggleGameFormat("doubles")}
                className="flex-1"
              >
                Doubles
              </Button>
            </div>
          </div>

          <Separator />

          {/* Filter Sections */}
          <div className="space-y-4">
            {filterSections.map((section) => (
              <div key={section.id} className="flex items-center justify-between py-3 cursor-pointer hover:bg-muted/30 rounded-lg px-2">
                <div className="flex items-center gap-3">
                  <section.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{section.label}</span>
                </div>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  <X className="h-4 w-4 rotate-90" />
                </Button>
              </div>
            ))}
          </div>

          <Separator />

          {/* Booking Toggle */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center">
                🏟️
              </div>
              <span className="font-medium">Game with Together Booking</span>
            </div>
            <Switch 
              checked={withBooking} 
              onCheckedChange={setWithBooking}
            />
          </div>

          {/* Show Results Button */}
          <Button className="w-full bg-accent hover:bg-accent-light" size="lg">
            Show Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;