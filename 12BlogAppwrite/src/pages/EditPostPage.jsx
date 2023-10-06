import React, { useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService  from "../appWrite/config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = React.useState(null);
  const [slug, setSlug] = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((data) => {
        if (data) {
          setPost(data);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate]);
  return post ?  (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ): null;
};

export default EditPost;
