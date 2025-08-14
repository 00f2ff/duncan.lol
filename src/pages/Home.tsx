import { useEffect, useState } from "react";
import type { BlogPost } from "../types/blog";
import { getPublishedPosts } from "../content";
import Layout from "../components/Layout";
import PostBlock from "../components/PostBlock";
import { Topics } from "../components/Topics";
import CaptionBar from "../components/CaptionBar";

export const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPosts, setCurrentPosts] = useState<BlogPost[]>([]);
  const [topics, setTopics] = useState<Map<string, number>>(
    new Map([
      ["Work", 0],
      ["Stories", 0],
      ["Poetry", 0],
      ["Et alia", 0],
    ]),
  );

  const isEtAlia = (p: BlogPost): boolean =>
    !p.tags.some((tag) => ["Work", "Stories", "Poetry"].includes(tag));

  const selectTopic = (e: React.MouseEvent<HTMLButtonElement>): void => {
    // Ignore the post count
    const topic = (e.target as HTMLButtonElement).innerText.split(" (")[0];
    if (topic == "Et alia") {
      setCurrentPosts(posts.filter(isEtAlia));
    } else {
      setCurrentPosts(posts.filter((p) => p.tags.includes(topic)));
    }
  };

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const allPosts = await getPublishedPosts();
        setPosts(allPosts);
        setCurrentPosts(allPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadRecentPosts();
  }, []);

  // Calculate number of posts per topic
  useEffect(() => {
    setTopics(
      (topics) =>
        new Map(
          Array.from(topics.entries(), ([topic]) => [
            topic,
            posts.filter((p) =>
              topic == "Et alia" ? isEtAlia(p) : p.tags.includes(topic),
            ).length,
          ]),
        ),
    );
  }, [posts]);

  return (
    <Layout key="index">
      <div className="mb-10">
        <h1
          className="font-display font-semibold text-5xl mt-6 mb-3 hover:cursor-pointer"
          onClick={() => setCurrentPosts(posts)}
        >
          Duncan McIsaac
        </h1>
        <CaptionBar />
        <Topics
          names={Array.from(topics.entries(), ([k, v]) => `${k} (${v})`)}
          onClick={selectTopic}
        />
        {/* <Socials /> */}
      </div>

      {currentPosts &&
        currentPosts.map((post) => <PostBlock key={post.slug} {...post} />)}
      <div className="mt-10 text-gray-800 opacity-30 italic">
        <a href="/disclaimer">Disclaimer</a>
      </div>
    </Layout>
  );
};
