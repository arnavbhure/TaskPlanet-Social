import { useEffect, useMemo, useState } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import SocialFilterChips from "../../components/SocialFilterChips/SocialFilterChips";
import SocialHeader from "../../components/SocialHeader/SocialHeader";
import SocialPostCard from "../../components/SocialPostCard/SocialPostCard";
import SocialQuickActions from "../../components/SocialQuickActions/SocialQuickActions";
import { fetchAllPostsApi } from "../../api/posts/postsApi";

function mapBackendPostToCard(post) {
  if (!post) return null;

  return {
    _id: post._id,
    id: post._id,
    username: post.username,
    handle: post?.user?.username ? `@${post.user.username}` : "",
    text: post.text,
    // existing card expects a string; keep it simple for now
    timestamp: post.createdAt
      ? new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(post.createdAt))
      : "",

    image: post.image_url ? { src: post.image_url, alt: "Post image" } : null,

    likes: post.likes,
    comments: post.comments,
    likedByMe: post.likedByMe,
  };
}

function SocialFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchAllPostsApi();
        const fetchedPosts = response.posts || [];
        const mapped = fetchedPosts.map(mapBackendPostToCard).filter(Boolean);
        setPosts(mapped);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreated = (createdPost) => {
    const post = createdPost?.post ?? createdPost;
    const mapped = mapBackendPostToCard(post);
    if (!mapped) return;
    setPosts((prev) => [mapped, ...prev]);
  };

  if (loading) {
    return (
      <section className="social-page" aria-labelledby="social-page-title">
        <SocialHeader />
        <p>Loading posts...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="social-page" aria-labelledby="social-page-title">
        <SocialHeader />
        <p>Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="social-page" aria-labelledby="social-page-title">
      <SocialHeader />

      <SocialQuickActions />

      <CreatePost onPostCreated={handlePostCreated} />

      <main className="social-content" aria-label="Social feed content">
        <SocialFilterChips />

        <div className="social-feed-surface">
          {posts.map((post, idx) => (
            <SocialPostCard key={post.id || post._id || idx} post={post} />
          ))}
        </div>
      </main>
    </section>
  );
}

export default SocialFeed;
