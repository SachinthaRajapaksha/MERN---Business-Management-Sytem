const mongoose = require('mongoose');

const deletionReasonSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
});

const DeletionReason = mongoose.model('DeletionReason', deletionReasonSchema);

module.exports = DeletionReason;
