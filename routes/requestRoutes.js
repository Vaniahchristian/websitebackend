const express = require('express');
const router = express.Router();
const {
  getRequests,
  getRequest,
  createRequest,
  updateRequestStatus,
  deleteRequest,
  getRequestsByStatus
} = require('../controllers/requestController');

// Routes
router.get('/', getRequests);
router.get('/status/:status', getRequestsByStatus);
router.get('/:id', getRequest);
router.post('/', createRequest);
router.put('/:id/status', updateRequestStatus);
router.delete('/:id', deleteRequest);

module.exports = router;
