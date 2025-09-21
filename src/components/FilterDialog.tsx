import React, { useMemo, useState } from "react";
import { Calendar as CalendarIcon, Clock, Star, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";

type Filters = {
  sport: string;
  skills: string[];
  maxDistanceKm: number;
  date: Date | null;
  time: string; // "any" or HH:mm
  gameFormat: string[];
  withBooking: boolean;
};

interface FilterDialogProps {
  children: React.ReactNode;
  initialFilters: Filters;
  onApply: (filters: Filters) => void;
  onReset?: () => void;
}

const FilterDialog = ({ children, initialFilters, onApply, onReset }: FilterDialogProps) => {
  const [selectedSport, setSelectedSport] = useState(initialFilters.sport);
  const [skills, setSkills] = useState<string[]>(initialFilters.skills);
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(initialFilters.maxDistanceKm);
  const [date, setDate] = useState<Date | null>(initialFilters.date);
  const [time, setTime] = useState<string>(initialFilters.time);
  const [gameFormat, setGameFormat] = useState<string[]>(initialFilters.gameFormat);
  const [withBooking, setWithBooking] = useState(initialFilters.withBooking);

  const sports = useMemo(() => ([
    { id: "tennis", name: "Tennis", icon: "🎾" },
    { id: "badminton", name: "Badminton", icon: "🏸" },
    { id: "squash", name: "Squash", icon: "🥍" },
    { id: "pickleball", name: "Pickleball", icon: "🏓" },
    { id: "hiking", name: "Hiking", icon: "🥾" },
  ]), []);

  const prettyRange = useMemo(() => `${maxDistanceKm.toFixed(1)} km`, [maxDistanceKm]);
  const safeSportValue = useMemo(() => (
    selectedSport === "all" || sports.some(s => s.id === selectedSport) ? selectedSport : "all"
  ), [selectedSport, sports]);
  const timeOptions = useMemo(() => ([
    "06:00","07:00","08:00","09:00","10:00","11:00",
    "12:00","13:00","14:00","15:00","16:00",
    "17:00","18:00","19:00","20:00","21:00",
  ]), []);
  const safeTimeValue = useMemo(() => (
    time === "any" || timeOptions.includes(time) ? time : "any"
  ), [time, timeOptions]);

  const toggleGameFormat = (format: string) => {
    setGameFormat(prev => 
      prev.includes(format) 
        ? prev.filter(f => f !== format)
        : [...prev, format]
    );
  };

  const toggleArrayValue = (value: string, setter: (updater: (prev: string[]) => string[]) => void) => {
    setter(prev => (prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]));
  };

  const handleReset = () => {
    setSelectedSport(initialFilters.sport);
    setSkills(initialFilters.skills);
    setMaxDistanceKm(initialFilters.maxDistanceKm);
    setDate(initialFilters.date);
    setTime(initialFilters.time);
    setGameFormat(initialFilters.gameFormat);
    setWithBooking(initialFilters.withBooking);
    onReset?.();
  };

  const handleApply = () => {
    onApply({
      sport: selectedSport,
      skills,
      maxDistanceKm,
      date,
      time,
      gameFormat,
      withBooking,
    });
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
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={handleReset}>
              Reset
            </Button>
          </DialogTitle>
          <DialogDescription>
            Refine results by sport, date, time, skill, distance and booking.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sport Selection */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Sport</h3>
            <Select value={safeSportValue} onValueChange={setSelectedSport}>
              <SelectTrigger>
                <SelectValue placeholder="All sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sports</SelectItem>
                {sports.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.icon} {s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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

          {/* Date */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Date</h3>
            </div>
            <Calendar
              mode="single"
              selected={date ?? undefined}
              onSelect={(d) => setDate(d ?? null)}
              fromDate={new Date()}
            />
          </div>

          {/* Time */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Time</h3>
            </div>
            <Select value={safeTimeValue} onValueChange={setTime}>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                {timeOptions.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Skill level</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Beginner", "Intermediate", "Advanced"].map((level) => (
                <label key={level} className="inline-flex items-center gap-2">
                  <Checkbox
                    checked={skills.includes(level)}
                    onCheckedChange={() => toggleArrayValue(level, setSkills)}
                  />
                  <span className="text-sm">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Within distance</h3>
              <Badge variant="secondary" className="ml-auto">{prettyRange}</Badge>
            </div>
            <div className="px-1">
              <Slider
                value={[maxDistanceKm]}
                onValueChange={(v) => {
                  if (Array.isArray(v) && typeof v[0] === 'number') setMaxDistanceKm(v[0]);
                }}
                min={1}
                max={20}
                step={0.5}
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>1 km</span>
                <span>20 km</span>
              </div>
            </div>
          </div>

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
          <DialogClose asChild>
            <Button className="w-full bg-accent hover:bg-accent-light" size="lg" onClick={handleApply}>
              Show Results
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;