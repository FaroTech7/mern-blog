
import Post from '../models/postModel.js'
import User from '../models/userModel.js'


// Create a new blog post
export const createPost = async (req, res) => {
    try {
        const { title, category, description, content, image } = req.body

        if (!title || !category || !description || !content) {
            return res.status(400).json({
                message: 'Please provide all required fields'
            })
        }

        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const newPost = await Post.create({
            title,
            category,
            description,
            content,
            image,
            author: user.fullName,
            user: user._id
        })

        return res.status(201).json({
            message: 'Post created successfully',
            post: newPost
        })

    } catch (error) {
        console.error('Error creating post:', error)

        return res.status(500).json({
            message: 'Failed to create post',
            error: error.message
        })
    }
}


// Get all blog posts
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })

        return res.status(200).json(posts)

    } catch (error) {
        console.error('Error fetching posts:', error)

        return res.status(500).json({
            message: 'Failed to fetch posts',
            error: error.message
        })
    }
}


// Get a single blog post
export const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        return res.status(200).json(post)

    } catch (error) {
        console.error('Error fetching post:', error)

        return res.status(500).json({
            message: 'Failed to fetch post',
            error: error.message
        })
    }
}


// Update a blog post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: 'You are not allowed to edit this post'
            })
        }

        const { title, category, description, content, image } = req.body

        post.title = title ?? post.title
        post.category = category ?? post.category
        post.description = description ?? post.description
        post.content = content ?? post.content
        post.image = image ?? post.image

        await post.save()

        return res.status(200).json({
            message: 'Post updated successfully',
            post
        })

    } catch (error) {
        console.error('Error updating post:', error)

        return res.status(500).json({
            message: 'Failed to update post',
            error: error.message
        })
    }
}


// Delete a blog post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: 'You are not allowed to delete this post'
            })
        }

        await post.deleteOne()

        return res.status(200).json({
            message: 'Post deleted successfully'
        })

    } catch (error) {
        console.error('Error deleting post:', error)

        return res.status(500).json({
            message: 'Failed to delete post',
            error: error.message
        })
    }
}
