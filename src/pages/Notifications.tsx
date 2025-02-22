import { useState } from "react";
import { Bell, Heart, MessageCircle, UserPlus } from "lucide-react";

export const Notifications = () => {
  const [notifications] = useState([
    { id: 1, text: "🔥 Your recipe got 10 new likes!", icon: <Heart className="text-red-500 w-5 h-5" /> },
    { id: 2, text: "💬 Sarah commented on your post.", icon: <MessageCircle className="text-blue-500 w-5 h-5" /> },
    { id: 3, text: "👤 Alex started following you!", icon: <UserPlus className="text-green-500 w-5 h-5" /> },
  ]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Bell className="w-6 h-6 text-primary" /> Notifications
      </h2>

      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li key={notif.id} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow">
              {notif.icon}
              <span className="text-gray-700">{notif.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No new notifications</p>
      )}
    </div>
  );
};

export default Notifications;
