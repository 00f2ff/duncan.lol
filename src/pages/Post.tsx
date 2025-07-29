import { useEffect, useState } from "react";
import type { BlogPost as BlogPostType } from "../types/blog";
import { getPostBySlug } from "../content";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import GoHome from "../components/GoHome";
import PostMetadata from "../components/Metadata";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

interface PostProps {
  slug?: string;
}

export const Post = ({ slug }: PostProps) => {
  const [post, setPost] = useState<BlogPostType | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        navigate("/404", { replace: true });
      }

      try {
        const postData = await getPostBySlug(slug!);
        if (!postData) {
          navigate("/404", { replace: true });
        } else {
          setPost(postData);
        }
      } catch (err) {
        console.error("Failed to load post:", err);
        navigate("/404", { replace: true });
      }
    };

    loadPost();
  }, [navigate, slug]);

  return (
    <Layout verticalSpacing={5} key={slug}>
      <GoHome text="home" />
      {post !== undefined && (
        <>
          <div className="grid grid-cols-1 gap-2">
            <h1 className="font-heading font-semibold text-5xl mt-6 mb-4">
              {post.title}
            </h1>
            <PostMetadata {...post} />
          </div>
          <MarkdownRenderer content={post.content} />
        </>
      )}
    </Layout>
  );
};
