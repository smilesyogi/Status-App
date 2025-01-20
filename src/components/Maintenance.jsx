import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const Maintenance = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input placeholder="Enter maintenance title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea placeholder="Describe the maintenance details" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Scheduled Time</label>
              <Input type="datetime-local" />
            </div>
            <Button className="mt-4">Schedule</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Maintenance;
