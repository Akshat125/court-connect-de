import React from "react";
import { Edit, Settings, Calendar, Trophy, Users, MapPin, Bell, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";

const ProfilePage = () => {
  const user = {
    name: "Shubham Patel",
    age: 23,
    bio: "Enjoying life...",
    location: "Berlin, Germany",
    distance: "5 km away",
    avatar: "/api/placeholder/120/120",
    sports: [
      { name: "Tennis", level: "Intermediate", matches: 45 },
      { name: "Badminton", level: "Advanced", matches: 32 },
    ],
    stats: {
      matches: 77,
      wins: 52,
      groups: 3,
    },
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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary-glow/10 pb-20">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Profile</h1>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Profile Card */}
        <Card className="overflow-hidden shadow-[var(--shadow-card)]">
          <div className="h-24 bg-[var(--gradient-primary)]"></div>
          <CardContent className="relative pt-0 pb-6">
            <div className="flex flex-col items-center -mt-12">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center mt-4 mb-4">
                <h2 className="text-2xl font-bold">{user.name}, {user.age}</h2>
                <p className="text-muted-foreground mb-2">{user.bio}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {user.location}
                </div>
              </div>

              {/* Sports */}
              <div className="w-full mb-4">
                <h3 className="font-semibold mb-3 text-center">Sports & Skills</h3>
                <div className="space-y-2">
                  {user.sports.map((sport) => (
                    <div key={sport.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <span className="font-medium">{sport.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">{sport.level}</Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{sport.matches} matches</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.matches}</div>
              <p className="text-xs text-muted-foreground">Total Matches</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{user.stats.wins}</div>
              <p className="text-xs text-muted-foreground">Wins</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary-glow">{user.stats.groups}</div>
              <p className="text-xs text-muted-foreground">Groups</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account</CardTitle>
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

        {/* App Info */}
        <div className="text-center py-4">
          <div className="mb-2">
            <span className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              together
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">
            Connecting sports enthusiasts across Germany
          </p>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default ProfilePage;