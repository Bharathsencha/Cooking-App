import { motion } from "framer-motion";
import { UserPlus, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";


export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Profile Banner */}
      <div className="relative">
          <img
            src="https://source.unsplash.com/1600x400/?food,cooking"
            alt="Banner"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute -bottom-12 left-6 flex items-center">
            <motion.img
              src={user?.photoURL || "https://source.unsplash.com/150x150/?chef,person"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-background shadow-lg"
              whileHover={{ scale: 1.1 }}
            />
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-white">{user?.displayName || "Guest User"}</h2>
              <p className="text-white/70">{user?.email ? `@${user.email.split('@')[0]}` : "@user"}</p>
            </div>
          </div>

      </div>

      {/* Profile Stats */}
      <div className="mt-16 text-center">
        <div className="flex justify-center gap-8 text-muted-foreground">
          <div>
            <h3 className="text-lg font-semibold text-foreground">1.2K</h3>
            <p>Followers</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">340</h3>
            <p>Following</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">56</h3>
            <p>Recipes</p>
          </div>
        </div>

        <button className="mt-4 px-4 py-2 bg-primary text-white rounded-full flex items-center gap-2 hover:scale-105 transition">
          <UserPlus className="w-5 h-5" />
          Follow
        </button>
      </div>

      {/* Profile Tabs */}
      <div className="mt-6 border-b flex justify-center space-x-6 text-muted-foreground">
        <button className="pb-2 border-b-2 border-primary text-primary font-semibold">
          Recipes
        </button>
        <button className="pb-2 hover:text-primary">Achievements</button>
        <button className="pb-2 hover:text-primary">Activity</button>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <motion.div
            key={id}
            whileHover={{ scale: 1.03 }}
            className="bg-card p-4 rounded-lg shadow-md cursor-pointer"
          >
            <img
              src={`https://source.unsplash.com/300x200/?food,recipe&sig=${id}`}
              alt="Recipe"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">Delicious Recipe {id}</h3>
            <p className="text-muted-foreground text-sm">30 mins | Medium</p>
          </motion.div>
        ))}
      </div>

      {/* Settings Button */}
      <div className="fixed bottom-6 right-6">
        <button
          aria-label="Settings"
          className="p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
