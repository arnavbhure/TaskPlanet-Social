import CreatePostCard from "../../components/CreatePostCard/CreatePostCard";
import SocialFilterChips from "../../components/SocialFilterChips/SocialFilterChips";
import SocialHeader from "../../components/SocialHeader/SocialHeader";
import SocialPostCard from "../../components/SocialPostCard/SocialPostCard";
import SocialQuickActions from "../../components/SocialQuickActions/SocialQuickActions";
import { mockPosts } from "../../data/mockPosts";

function SocialFeed() {
  return (
    <section className="social-page" aria-labelledby="social-page-title">
      <SocialHeader />

      <SocialQuickActions />

      <CreatePostCard />

      <main className="social-content" aria-label="Social feed content">
        <SocialFilterChips />

        <div className="social-feed-surface">
          {mockPosts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </section>
  );
}

export default SocialFeed;
