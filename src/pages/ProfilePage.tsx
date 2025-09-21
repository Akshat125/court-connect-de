import React from "react";
import { Edit, Settings, Calendar, Trophy, Users, MapPin, Bell, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";

type SportInfo = { name: string; level: string; matches: number; rating?: number };

const ProfilePage = () => {
  const LEVEL_TO_DEFAULT_RATING: Record<string, number> = {
    beginner: 1000,
    intermediate: 1400,
    advanced: 1800,
  };
  const user: {
    name: string;
    age: number;
    bio: string;
    location: string;
    distance: string;
    avatar: string;
    sports: SportInfo[];
    stats: { matches: number; wins: number; groups: number };
  } = {
    name: "Shubham Joshi",
    age: 23,
    bio: "Trail lover seeking weekend hiking buddies and outdoor adventures around the city.",
    location: "Berlin, Germany",
    distance: "4.2 km away",
    avatar: "/src/assets/player-profile-4.jpg",
    sports: [
      { name: "Table Tennis", level: "Advanced", matches: 20, rating: 1800 },
      { name: "Tennis", level: "Intermediate", matches: 18, rating: 1450 },
    ],
    stats: {
      matches: 30,
      wins: 18,
      groups: 2,
    },
  };

  const getSportEmoji = (name: string) => {
    const key = name.toLowerCase();
    if (key.includes("tennis")) return "🎾";
    if (key.includes("badminton")) return "🏸";
    if (key.includes("squash")) return "🥍";
    if (key.includes("hiking")) return "🥾";
    return "🏅";
  };

  const getLevelBadgeClass = (level: string) => {
    const lvl = level.toLowerCase();
    if (lvl.includes("beginner")) return "bg-emerald-100 text-emerald-800";
    if (lvl.includes("intermediate")) return "bg-blue-100 text-blue-800";
    if (lvl.includes("advanced")) return "bg-purple-100 text-purple-800";
    return "bg-gray-100 text-gray-800";
  };

  const menuItems = [
    { icon: Edit, label: "Edit Profile", action: () => {} },
    { icon: Calendar, label: "My Bookings", action: () => {} },
    { icon: Trophy, label: "Match History", action: () => {} },
    { icon: Users, label: "My Groups", action: () => {} },
    { icon: Bell, label: "Notifications", action: () => {} },
    { icon: Settings, label: "Settings", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", action: () => {} },
    { icon: LogOut, label: "Sign Out", action: () => {}, variant: "destructive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-5 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden shadow-[var(--shadow-card)]">
                <div className="h-32 bg-[var(--gradient-primary)]"></div>
                <CardContent className="relative pt-0 pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h1 className="text-3xl font-bold">{user.name}, {user.age}</h1>
                          <p className="text-muted-foreground mb-2">{user.bio}</p>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {user.location}
                          </div>
                        </div>
                        {/* Edit action moved to Account section */}
                      </div>
                    </div>
                  </div>

                  {/* Sports */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Sports & Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {user.sports.map((sport) => {
                        const target = LEVEL_TO_DEFAULT_RATING[sport.level.toLowerCase()] ?? 1200;
                        const rating = sport.rating ?? target;
                        const ratingPct = Math.min(100, Math.round((rating / 2000) * 100));
                        return (
                          <div key={sport.name} className="p-4 rounded-xl border bg-card hover:shadow-sm transition">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg" aria-hidden>{getSportEmoji(sport.name)}</span>
                                <span className="font-medium">{sport.name}</span>
                                <Badge className={`text-xs ${getLevelBadgeClass(sport.level)}`}>{sport.level}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>{sport.matches} matches</span>
                            </div>
                            {sport.rating !== undefined && (
                              <div className="mt-1 text-sm text-muted-foreground">Rating {sport.rating}</div>
                            )}
                            {sport.rating !== undefined && (
                              <div className="mt-3 h-2 w-full rounded bg-muted">
                                <div className="h-2 rounded bg-accent" style={{ width: `${ratingPct}%` }} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{user.stats.matches}</div>
                    <p className="text-sm text-muted-foreground">Total Matches</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">{user.stats.wins}</div>
                    <p className="text-sm text-muted-foreground">Wins</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-glow">{user.stats.groups}</div>
                    <p className="text-sm text-muted-foreground">Groups</p>
                  </div>
                </CardContent>
              </Card>

              {/* Menu Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {menuItems.map((item, index) => (
                    <div key={item.label}>
                      <button
                        onClick={item.action}
                        className={`w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors ${
                          item.variant === "destructive" ? "text-destructive" : "text-foreground"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                      {index < menuItems.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* App Info */}
          <div className="text-center py-8 mt-8 border-t border-border">
            <div className="mb-2">
              <span className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                together
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            <p className="text-sm text-muted-foreground mt-1">
              Connecting sports enthusiasts across Germany
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;