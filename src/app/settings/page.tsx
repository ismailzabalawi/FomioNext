"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const handleAmoledToggle = (isAmoled: boolean) => {
    setTheme(isAmoled ? 'dark-amoled' : 'dark');
  }

  // When either 'dark' or 'dark-amoled' is active, we want the 'dark' radio button to be selected.
  const radioGroupValue = (theme === 'dark' || theme === 'dark-amoled') ? 'dark' : theme;

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the app.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={radioGroupValue} onValueChange={setTheme} className="grid grid-cols-2 gap-4">
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
              <RadioGroupItem value="reader" id="reader" className="peer sr-only" />
              <Label
                htmlFor="reader"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <div className="w-full h-12 rounded-md bg-[#f9f5f0]" />
                Reader
              </Label>
            </div>
          </RadioGroup>

          {/* This section only shows up if a dark theme is selected */}
          {(theme === 'dark' || theme === 'dark-amoled') && (
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
                        checked={theme === 'dark-amoled'} 
                        onCheckedChange={handleAmoledToggle}
                    />
                </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
