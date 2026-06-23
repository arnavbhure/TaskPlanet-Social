import { useMemo, useState } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import SocialFilterChips from "../../components/SocialFilterChips/SocialFilterChips";
import SocialHeader from "../../components/SocialHeader/SocialHeader";
import SocialPostCard from "../../components/SocialPostCard/SocialPostCard";
import SocialQuickActions from "../../components/SocialQuickActions/SocialQuickActions";
import { mockPosts } from "../../data/mockPosts";

function mapBackendPostToCard(post) {
  if (!post) return null;

  return {
    _id: post._id,
    id: post._id,
    username: post.username,
    handle: post?.user?.username ? `@${post.user.username}` : "",
    text: post.text,
    // existing card expects a string; keep it simple for now
    timestamp: post.createdAt ? new Date(post.createdAt).toISOString() : "",
    image_url: post.image_url,
    likes: post.likes,
    comments: post.comments,
  };
}

function SocialFeed() {
  const initialPosts = useMemo(() => mockPosts, []);
  const [posts, setPosts] = useState(initialPosts);

  const handlePostCreated = (createdPost) => {
    const mapped = mapBackendPostToCard(createdPost);
    if (!mapped) return;

    setPosts((prev) => [mapped, ...prev]);
  };

  return (
    <section className="social-page" aria-labelledby="social-page-title">
      <SocialHeader />

      <SocialQuickActions />

      <CreatePost onPostCreated={handlePostCreated} />

      <main className="social-content" aria-label="Social feed content">
        <SocialFilterChips />

        <div className="social-feed-surface">
          {posts.map((post) => (
            <SocialPostCard key={post.id || post._id} post={post} />
          ))}
        </div>
      </main>
    </section>
  );
}

export default SocialFeed;
