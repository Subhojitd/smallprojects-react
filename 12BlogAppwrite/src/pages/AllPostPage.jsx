import React from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appWrite/config";

const AllPostPage = () => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    appwriteService.getAllPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  console.log(posts);
  if (!posts) return <div>Loading...</div>;
  if (posts.length === 0) return <div>No posts found</div>;
  return (
    <div className="py-8">
      <Container>
      <div className="flex flex-wrap">
      {posts.map((post) => (
          <div key={post.$id} className="p-2 w-1/4" >
          <PostCard  post={post} />
          </div>
        ))}
      </div>
        
      </Container>
    </div>
  );
};

export default AllPostPage;
