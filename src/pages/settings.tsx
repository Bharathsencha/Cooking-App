import { useState } from "react";
import { Switch } from "../components/ui/switch";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Sun, Moon, Shield, Bell, User, LogOut, Trash2, Monitor } from "lucide-react";
import { useTheme } from "../context/theme";
import { useAuth } from "../context/AuthContext";

export const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();

  const [username, setUsername] = useState("Foodie123");
  const [bio, setBio] = useState("Love cooking and sharing recipes! 🍳✨");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <h2 className="text-3xl font-bold">Settings</h2>
      <p className="text-muted-foreground">Customize your experience</p>

      {/* Profile Settings */}
      <div className="bg-card p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <User className="w-5 h-5" />
          Profile Settings
        </h3>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="bio" className="text-sm font-medium">Bio</label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <Button className="w-full">Save Changes</Button>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-card p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy & Security
        </h3>
        <div className="mt-4 space-y-4">
          <Button variant="outline" className="w-full">Change Password</Button>
          <Button variant="outline" className="w-full">Enable Two-Factor Authentication</Button>
          <Button variant="outline" className="w-full">Manage Activity</Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notification Preferences
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span>Email Notifications</span>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>
          <div className="flex justify-between items-center">
            <span>Push Notifications</span>
            <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-card p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          Appearance
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <span>Light</span>
            </div>
            <Switch 
              checked={theme === 'light'}
              onCheckedChange={(checked) => setTheme(checked ? 'light' : 'dark')}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </div>
            <Switch 
              checked={theme === 'dark'}
              onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>System</span>
            </div>
            <Switch 
              checked={theme === 'system'}
              onCheckedChange={(checked) => setTheme(checked ? 'system' : 'light')}
            />
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-card p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-red-500" />
          Account Management
        </h3>
        <div className="mt-4 space-y-4">
          <Button variant="destructive" className="w-full">
            Delete Account
          </Button>
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={() => {
              if (window.confirm('Are you sure you want to log out?')) {
                logout();
              }
            }}
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};
