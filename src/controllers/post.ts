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
    const { content, userId } = req.body;
    const user = await User.findOne(userId);

    if (!user) {
      res.status(500).send({error: 'Error'});
      return;
    }

    const post = new Post();

    post.user = user;
    post.content = content;
    post.createdAt = new Date();

    await post.save();

    res.send(post);
};

const updatePost = async (req: any, res: any) => {
  const { id } = req.params;
  const { content } = req.body;

  const post = await Post.findOne(id);

  if (!post) {
    return;
  }

  post.content = content;

  await post.save();

  res.send(post);
};

const deletePost = async (req: any, res: any) => {
  const { id } = req.params;

  await Post.delete({ id });
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
