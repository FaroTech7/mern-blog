
import express from 'express'

import {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost
} from '../controllers/postController.js'

import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Create a post (protected)
router.post('/', authMiddleware, createPost)

// Get all posts
router.get('/', getPosts)

// Get a single post
router.get('/:id', getPost)

// Update a post (protected)
router.put('/:id', authMiddleware, updatePost)

// Delete a post (protected)
router.delete('/:id', authMiddleware, deletePost)

export default router
