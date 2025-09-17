const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Todo title is required'],
    trim: true,
    maxlength: [200, 'Todo title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Todo description cannot exceed 1000 characters'],
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Todo must belong to a user']
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
  category: {
    type: String,
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters'],
    default: 'general'
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
});

// Virtual for checking if todo is overdue
todoSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.completed) return false;
  return new Date() > this.dueDate;
});

// Virtual for days until due
todoSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate || this.completed) return null;
  const now = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Index for better performance
todoSchema.index({ user: 1, completed: 1 });
todoSchema.index({ user: 1, createdAt: -1 });
todoSchema.index({ user: 1, dueDate: 1 });
todoSchema.index({ user: 1, priority: 1 });

// Pre-save middleware to set completedAt timestamp
todoSchema.pre('save', function(next) {
  if (this.isModified('completed')) {
    if (this.completed && !this.completedAt) {
      this.completedAt = new Date();
    } else if (!this.completed) {
      this.completedAt = null;
    }
  }
  next();
});

// Static method to get user's todos with filters
todoSchema.statics.getUserTodos = async function(userId, filters = {}) {
  const query = { user: userId };
  
  // Apply filters
  if (filters.completed !== undefined) {
    query.completed = filters.completed;
  }
  
  if (filters.priority) {
    query.priority = filters.priority;
  }
  
  if (filters.category) {
    query.category = filters.category;
  }
  
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }
  
  // Date range filter
  if (filters.startDate || filters.endDate) {
    query.createdAt = {};
    if (filters.startDate) {
      query.createdAt.$gte = new Date(filters.startDate);
    }
    if (filters.endDate) {
      query.createdAt.$lte = new Date(filters.endDate);
    }
  }
  
  // Due date filter
  if (filters.dueBefore) {
    query.dueDate = { $lte: new Date(filters.dueBefore) };
  }
  
  // Sorting
  let sort = { createdAt: -1 }; // Default: newest first
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'dueDate':
        sort = { dueDate: 1, createdAt: -1 };
        break;
      case 'priority':
        sort = { priority: -1, createdAt: -1 };
        break;
      case 'title':
        sort = { title: 1 };
        break;
      case 'completed':
        sort = { completed: 1, createdAt: -1 };
        break;
    }
  }
  
  const limit = parseInt(filters.limit) || 50;
  const skip = parseInt(filters.skip) || 0;
  
  const todos = await this.find(query)
    .sort(sort)
    .limit(limit)
    .skip(skip)
    .populate('user', 'username firstName lastName');
  
  const total = await this.countDocuments(query);
  
  return {
    todos,
    total,
    limit,
    skip,
    hasMore: total > skip + todos.length
  };
};

// Static method to get user's todo statistics
todoSchema.statics.getUserStats = async function(userId) {
  const stats = await this.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        completed: {
          $sum: {
            $cond: [{ $eq: ['$completed', true] }, 1, 0]
          }
        },
        pending: {
          $sum: {
            $cond: [{ $eq: ['$completed', false] }, 1, 0]
          }
        },
        overdue: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $eq: ['$completed', false] },
                  { $lt: ['$dueDate', new Date()] }
                ]
              },
              1,
              0
            ]
          }
        }
      }
    }
  ]);
  
  return stats.length > 0 ? stats[0] : {
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  };
};

module.exports = mongoose.model('Todo', todoSchema);
