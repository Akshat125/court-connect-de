import React, { useState } from "react";
import { MessageSquare, Users, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const ChatPage = () => {
  const [activeTab, setActiveTab] = useState("groups");

  const tabs = [
    { id: "games", label: "Games", icon: MessageSquare },
    { id: "groups", label: "Groups", icon: Users },
    { id: "dms", label: "Messages", icon: User },
  ];

  const groupChats = [
    {
      id: 1,
      name: "Berlin Tennis Club",
      lastMessage: "Game tomorrow at 6 PM?",
      time: "2m ago",
      unread: 3,
      members: 12,
      sport: "Tennis"
    },
    {
      id: 2,
      name: "Badminton Beginners",
      lastMessage: "Thanks for the great match!",
      time: "1h ago", 
      unread: 0,
      members: 8,
      sport: "Badminton"
    },
  ];

  const gameChats = [
    {
      id: 1,
      title: "Mixed Doubles Tonight",
      lastMessage: "Court 3 is confirmed",
      time: "5m ago",
      unread: 2,
      players: "3/4",
      organizer: "Sarah M."
    },
    {
      id: 2,
      title: "Weekend Tournament",
      lastMessage: "Registration closes tomorrow",
      time: "30m ago",
      unread: 0,
      players: "8/16", 
      organizer: "Tennis Club"
    },
  ];

  const directMessages = [
    {
      id: 1,
      name: "Anna Weber",
      lastMessage: "Great game today! Same time next week?",
      time: "10m ago",
      unread: 1,
      online: true,
      sport: "Tennis"
    },
    {
      id: 2,
      name: "Max Schmidt", 
      lastMessage: "I'll bring the shuttlecocks",
      time: "2h ago",
      unread: 0,
      online: false,
      sport: "Badminton"
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "groups":
        return (
          <div className="space-y-3">
            {groupChats.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No Groups</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a group to manage your team or join your sports group near you.
                  </p>
                  <Button className="bg-accent hover:bg-accent-light">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                  </Button>
                </CardContent>
              </Card>
            ) : (
              groupChats.map((chat) => (
                <Card key={chat.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {chat.sport[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {chat.lastMessage}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{chat.sport}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {chat.members} members
                            </span>
                          </div>
                          {chat.unread > 0 && (
                            <Badge className="bg-accent text-accent-foreground text-xs">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        );

      case "games":
        return (
          <div className="space-y-3">
            {gameChats.map((chat) => (
              <Card key={chat.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-accent text-accent-foreground">
                        G
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{chat.title}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {chat.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>by {chat.organizer}</span>
                          <span>•</span>
                          <span>{chat.players} joined</span>
                        </div>
                        {chat.unread > 0 && (
                          <Badge className="bg-accent text-accent-foreground text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case "dms":
        return (
          <div className="space-y-3">
            {directMessages.map((chat) => (
              <Card key={chat.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/api/placeholder/48/48`} />
                        <AvatarFallback>{chat.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground truncate mb-2">
                        {chat.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{chat.sport}</Badge>
                        {chat.unread > 0 && (
                          <Badge className="bg-accent text-accent-foreground text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-40 backdrop-blur-sm">
        <h1 className="text-xl font-bold mb-4">Conversations</h1>
        
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="p-4">
        {renderContent()}
      </div>

      <Navigation />
    </div>
  );
};

export default ChatPage;