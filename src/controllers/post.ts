import Post from "../models/entities/Post";
import User from "../models/entities/User";

const getPosts = async (req: any, res: any) => {
  const posts = await Post.find();

  res.send(posts);
};

const getPostById = async (req: any, res: any) => {
  const { id } = req.params;

  const post = await Post.findOne(id);

  res.send(post);
};

const createPost = async (req: any, res: any) => {
    const { tittle, content } = req.body;
    const user = req.user as User;

    const post = new Post();

    post.user = user;
    post.tittle = tittle;
    post.content = content;
    post.createdAt = new Date();

    res.send(post);
};

const updatePost = async (req: any, res: any) => {
  const { id } = req.params;
  const { tittle, content } = req.body;

  const post = await Post.findOne(id);

  if (!post) {
    return;
  }

  post.tittle = tittle;
  post.content = content;
};

const deletePost = async (req: any, res: any) => {
  const { id } = req.params;

  await Post.delete({ id });
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
