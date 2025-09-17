const express = require('express');
const { authenticate, checkResourceOwnership } = require('../middleware/auth');
const Todo = require('../models/Todo');

const router = express.Router();

// Apply authentication to all routes
router.use(authenticate);

// @route   GET /api/todos
// @desc    Get user's todos with filters and pagination
// @access  Private
router.get('/', async (req, res) => {
  try {
    const filters = {
      completed: req.query.completed === 'true' ? true : req.query.completed === 'false' ? false : undefined,
      priority: req.query.priority,
      category: req.query.category,
      search: req.query.search,
      sortBy: req.query.sortBy,
      limit: req.query.limit,
      skip: req.query.skip,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      dueBefore: req.query.dueBefore
    };
    
    const result = await Todo.getUserTodos(req.userId, filters);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// @route   GET /api/todos/stats
// @desc    Get user's todo statistics
// @access  Private
router.get('/stats', async (req, res) => {
  try {
    const stats = await Todo.getUserStats(req.userId);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get todo stats error:', error);
    res.status(500).json({ error: 'Failed to fetch todo statistics' });
  }
});

// @route   GET /api/todos/:id
// @desc    Get a specific todo
// @access  Private (own todos only)
router.get('/:id', checkResourceOwnership(Todo), async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.resource
    });
  } catch (error) {
    console.error('Get todo error:', error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// @route   POST /api/todos
// @desc    Create a new todo
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate, category, tags } = req.body;
    
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Todo title is required' });
    }
    
    const todo = new Todo({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : null,
      category: category || 'general',
      tags: tags || [],
      user: req.userId
    });
    
    await todo.save();
    await todo.populate('user', 'username firstName lastName');
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: todo
    });
  } catch (error) {
    console.error('Create todo error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        error: 'Validation failed',
        messages: errors
      });
    }
    
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// @route   PUT /api/todos/:id
// @desc    Update a todo
// @access  Private (own todos only)
router.put('/:id', checkResourceOwnership(Todo), async (req, res) => {
  try {
    const allowedUpdates = ['title', 'description', 'completed', 'priority', 'dueDate', 'category', 'tags'];
    const updates = {};
    
    // Filter allowed updates
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        if (key === 'title' && req.body[key]) {
          updates[key] = req.body[key].trim();
        } else if (key === 'description' && req.body[key]) {
          updates[key] = req.body[key].trim();
        } else if (key === 'dueDate' && req.body[key]) {
          updates[key] = new Date(req.body[key]);
        } else {
          updates[key] = req.body[key];
        }
      }
    });
    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: 'No valid fields to update',
        allowedFields: allowedUpdates
      });
    }
    
    // Validate title if being updated
    if (updates.title && updates.title.length === 0) {
      return res.status(400).json({ error: 'Todo title cannot be empty' });
    }
    
    // Update todo
    Object.keys(updates).forEach(key => {
      req.resource[key] = updates[key];
    });
    
    await req.resource.save();
    await req.resource.populate('user', 'username firstName lastName');
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: req.resource
    });
  } catch (error) {
    console.error('Update todo error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({
        error: 'Validation failed',
        messages: errors
      });
    }
    
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// @route   PATCH /api/todos/:id/toggle
// @desc    Toggle todo completion status
// @access  Private (own todos only)
router.patch('/:id/toggle', checkResourceOwnership(Todo), async (req, res) => {
  try {
    req.resource.completed = !req.resource.completed;
    await req.resource.save();
    await req.resource.populate('user', 'username firstName lastName');
    
    res.json({
      success: true,
      message: `Todo marked as ${req.resource.completed ? 'completed' : 'pending'}`,
      data: req.resource
    });
  } catch (error) {
    console.error('Toggle todo error:', error);
    res.status(500).json({ error: 'Failed to toggle todo status' });
  }
});

// @route   DELETE /api/todos/:id
// @desc    Delete a todo
// @access  Private (own todos only)
router.delete('/:id', checkResourceOwnership(Todo), async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.resource._id);
    
    res.json({
      success: true,
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// @route   DELETE /api/todos
// @desc    Delete multiple todos
// @access  Private
router.delete('/', async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Todo IDs array is required' });
    }
    
    // Only delete todos that belong to the user
    const result = await Todo.deleteMany({
      _id: { $in: ids },
      user: req.userId
    });
    
    res.json({
      success: true,
      message: `${result.deletedCount} todo(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Delete multiple todos error:', error);
    res.status(500).json({ error: 'Failed to delete todos' });
  }
});

// @route   PATCH /api/todos/bulk-update
// @desc    Bulk update todos (mark multiple as completed/pending)
// @access  Private
router.patch('/bulk-update', async (req, res) => {
  try {
    const { ids, updates } = req.body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Todo IDs array is required' });
    }
    
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ error: 'Updates object is required' });
    }
    
    const allowedUpdates = ['completed', 'priority', 'category'];
    const filteredUpdates = {};
    
    Object.keys(updates).forEach(key => {
      if (allowedUpdates.includes(key)) {
        filteredUpdates[key] = updates[key];
      }
    });
    
    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({
        error: 'No valid fields to update',
        allowedFields: allowedUpdates
      });
    }
    
    // Only update todos that belong to the user
    const result = await Todo.updateMany(
      {
        _id: { $in: ids },
        user: req.userId
      },
      filteredUpdates
    );
    
    res.json({
      success: true,
      message: `${result.modifiedCount} todo(s) updated successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Bulk update todos error:', error);
    res.status(500).json({ error: 'Failed to bulk update todos' });
  }
});

// @route   GET /api/todos/search/:query
// @desc    Search todos by title or description
// @access  Private
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;
    
    const todos = await Todo.find({
      user: req.userId,
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate('user', 'username firstName lastName');
    
    const total = await Todo.countDocuments({
      user: req.userId,
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ]
    });
    
    res.json({
      success: true,
      data: {
        todos,
        total,
        limit,
        skip,
        hasMore: total > skip + todos.length,
        searchQuery
      }
    });
  } catch (error) {
    console.error('Search todos error:', error);
    res.status(500).json({ error: 'Failed to search todos' });
  }
});

module.exports = router;
