const mongoose = require('mongoose');
const { permissions } = require('../config/variable.config');

const RoleSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        permissions: Array,
        createdBy: String,
        updatedBy: String,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedBy: String,
        deletedAt: Date
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Role', RoleSchema, "roles");