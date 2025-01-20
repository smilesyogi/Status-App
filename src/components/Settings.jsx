import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">App Name</label>
              <Input placeholder="Enter application name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Notifications</label>
              <div className="flex items-center space-x-4">
                <span>Enable</span>
                <Switch />
              </div>
            </div>
            <Button className="mt-4">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
