import { motion } from "framer-motion";
import { UserPlus, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getFollowers, getUserProfile } from "../firebase/fetchData";
import { followUser, unfollowUser } from "../firebase/follow";
import { useParams } from "react-router-dom";

interface UserProfile {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  followers?: number;
  following?: number;
}

interface Follower {
  uid: string;
}

export const Profile = () => {
  const { user } = useAuth();
  const params = useParams();
  const [profileUser, setProfileUser] = useState<UserProfile | null>(null);
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recipesCount, setRecipesCount] = useState(0);

  // Get the profile user ID from URL params or use the logged-in user
  const profileUserId = params.userId || (user ? user.uid : null);

  useEffect(() => {
    async function fetchData() {
      if (!profileUserId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get user profile data from backend API
        const userData = await getUserProfile(profileUserId);
        setProfileUser(userData);
        
        // Set followers and following counts
        setFollowers(userData.followers || 0);
        setFollowing(userData.following || 0);
        
        // Check if logged-in user is following this profile
        if (user && user.uid !== profileUserId) {
          const followersList = await getFollowers(profileUserId);
          setIsFollowing(followersList.some((follower: Follower) => follower.uid === user.uid));
        }
        
        // TODO: Fetch recipes count when that API is available
        setRecipesCount(56); // Placeholder
        
      } catch (error: any) {
        console.error("Error fetching profile data:", error);
        // If user not found in backend (likely Google user), fallback to Firebase user data

        if (error.response && error.response.status === 404 && user && user.uid === profileUserId) {
          setProfileUser({
            uid: user.uid,
            displayName: user.displayName || undefined,
            email: user.email || undefined,
            photoURL: user.photoURL || undefined,
            followers: 0,
            following: 0,
          });
          setFollowers(0);
          setFollowing(0);
          setIsFollowing(false);
          setRecipesCount(0);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [profileUserId, user]);

  const handleFollow = async () => {
    if (!user) {
      return alert("Login to follow users!");
    }
    
    if (!profileUserId || user.uid === profileUserId) {
      return;
    }

    try {
      if (isFollowing) {
        await unfollowUser(user.uid, profileUserId);
        setIsFollowing(false);
        setFollowers(prev => Math.max(0, prev - 1));
      } else {
        await followUser(user.uid, profileUserId);
        setIsFollowing(true);
        setFollowers(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!profileUser && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">User not found</h2>
          <p className="text-muted-foreground mt-2">This user doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = user && profileUserId === user.uid;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Profile Banner */}
      <div className="relative">
        <img
          src="/api/placeholder/1600/400"
          alt="Banner"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute -bottom-12 left-6 flex items-center">
          <motion.img
            src={profileUser?.photoURL || "/api/placeholder/150/150"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-background shadow-lg"
            whileHover={{ scale: 1.1 }}
          />
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-white">
              {profileUser?.displayName || "User"}
            </h2>
            <p className="text-white/70">
              {profileUser?.email ? `@${profileUser.email.split('@')[0]}` : "@user"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="mt-16 text-center">
        <div className="flex justify-center gap-8 text-muted-foreground">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{followers}</h3>
            <p>Followers</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{following}</h3>
            <p>Following</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{recipesCount}</h3>
            <p>Recipes</p>
          </div>
        </div>

        {/* Follow Button (only show if not own profile) */}
        {!isOwnProfile && user && (
          <button
            className={`mt-4 px-4 py-2 ${
              isFollowing ? "bg-gray-400" : "bg-primary"
            } text-white rounded-full flex items-center gap-2 hover:scale-105 transition`}
            onClick={handleFollow}
          >
            <UserPlus className="w-5 h-5" />
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
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
              src={`/api/placeholder/300/200?sig=${id}`}
              alt="Recipe"
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-2">Delicious Recipe {id}</h3>
            <p className="text-muted-foreground text-sm">30 mins | Medium</p>
          </motion.div>
        ))}
      </div>

      {/* Settings Button (only show on own profile) */}
      {isOwnProfile && (
        <div className="fixed bottom-6 right-6">
          <button
            aria-label="Settings"
            className="p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};