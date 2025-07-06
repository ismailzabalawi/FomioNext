"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function ProfileSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          This is how others will see you on the site.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Alex Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="alexdoe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            defaultValue="Frontend Developer & UI/UX enthusiast. Building the future of the web, one component at a time. Opinions are my own."
          />
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}

function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  const handleAmoledToggle = (isAmoled: boolean) => {
    setTheme(isAmoled ? "dark-amoled" : "dark");
  };

  const radioGroupValue =
    theme === "dark" || theme === "dark-amoled" ? "dark" : theme;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the look and feel of the app.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={radioGroupValue}
          onValueChange={setTheme}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem value="light" id="light" className="peer sr-only" />
            <Label
              htmlFor="light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="w-full h-12 rounded-md bg-[#ffffff] border" />
              Light
            </Label>
          </div>
          <div>
            <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
            <Label
              htmlFor="dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="w-full h-12 rounded-md bg-[#1F2937]" />
              Dark
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="reader"
              id="reader"
              className="peer sr-only"
            />
            <Label
              htmlFor="reader"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="w-full h-12 rounded-md bg-[#f9f5f0]" />
              Reader
            </Label>
          </div>
        </RadioGroup>

        {(theme === "dark" || theme === "dark-amoled") && (
          <>
            <Separator />
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="amoled-mode">AMOLED Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use a true black background for OLED screens.
                </p>
              </div>
              <Switch
                id="amoled-mode"
                checked={theme === "dark-amoled"}
                onCheckedChange={handleAmoledToggle}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and application settings.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="appearance" className="mt-6">
          <AppearanceSettings />
        </TabsContent>
        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Manage your account settings. These settings are synced with
                your main Discourse profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="alex.doe@example.com"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  You cannot change your email address here.
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Password</Label>
                <Button variant="outline">Change Password</Button>
                <p className="text-xs text-muted-foreground">
                  You will be redirected to Discourse to change your password.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-replies">Replies to my posts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get push notifications when someone replies to your content.
                  </p>
                </div>
                <Switch id="notif-replies" defaultChecked={true} />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-likes">Likes on my posts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get push notifications when someone likes your content.
                  </p>
                </div>
                <Switch id="notif-likes" defaultChecked={true} />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="notif-followers">New followers</Label>
                  <p className="text-sm text-muted-foreground">
                    Get push notifications when someone starts following you.
                  </p>
                </div>
                <Switch id="notif-followers" defaultChecked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
