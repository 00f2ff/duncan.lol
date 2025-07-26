import { useEffect, useState } from 'react';
import type { BlogPost } from '../types/blog';
import { getPublishedPosts } from '../content';
import Layout from '../components/Layout';
import CaptionBar from '../components/CaptionBar';
import Socials from '../components/Socials';
import PostBlock from '../components/PostBlock';


export const Home = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        const allPosts = await getPublishedPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
    };

    loadRecentPosts();
  }, []);

  return (
    <Layout key="index">
      <div className="mb-10">
        <h1 className="font-display font-semibold text-5xl mt-6 mb-3">Duncan McIsaac</h1>
        <CaptionBar />
        <Socials />
      </div>
     
      {posts && posts.map((post) => <PostBlock key={post.slug} {...post} />)}
    </Layout>
  );
};