import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Teams = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Teams</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Input placeholder="Team Name" />
              <Button className="mt-2">Add Team</Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Existing Teams</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Team Alpha</span>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <span>Team Beta</span>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Teams;
