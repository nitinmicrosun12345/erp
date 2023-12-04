const ApplyLeavesData = require('../models/ApplyLeavesData');

// services/applyLeavesDataService.js
class ApplyLeavesDataService {
  static async applyLeave(req, leaveData) {
    try {
      const userInfo = req.user;

      if (!userInfo) {
        throw new Error('User not found');
      }

      const userId = userInfo._id;

      const existingLeaveData = await ApplyLeavesData.findOne({ userId });

      if (existingLeaveData) {
        // If a document for the user already exists, add a new leave request to the array
        const newLeaveRequest = {
          leaveType: leaveData.leaveType,
          firstHalf: leaveData.firstHalf,
          secondHalf: leaveData.secondHalf,
          fromDate: leaveData.fromDate,
          toDate: leaveData.toDate,
          reason: leaveData.reason,
          status: leaveData.status || 'pending', // Use provided status or default to 'pending'
        };

        existingLeaveData.leaveRequests.push(newLeaveRequest);

        // If the leave request is approved, update the totalLeaves count
        if (newLeaveRequest.status === 'approved') {
          // Increment totalLeaves by 0.5 for each half-day leave
          if (leaveData.leaveType === 'half-day') {
            existingLeaveData.totalLeaves += 0.5;
          } else {
            existingLeaveData.totalLeaves += 1; // Increment by 1 for full-day leave
          }
        }

        await existingLeaveData.save();
        return existingLeaveData;
      } else {
        // If no document exists for the user, create a new one with the leave request
        const leaveDataInstance = new ApplyLeavesData({
          userId,
          serviceId: leaveData.serviceId,
          leaveRequests: [{
            leaveType: leaveData.leaveType,
            firstHalf: leaveData.firstHalf,
            secondHalf: leaveData.secondHalf,
            fromDate: leaveData.fromDate,
            toDate: leaveData.toDate,
            reason: leaveData.reason,
            status: leaveData.status || 'pending', // Use provided status or default to 'pending'
          }],
          totalLeaves: 0,
        });

        // Increment totalLeaves by 0.5 for each half-day leave
        if (leaveData.leaveType === 'half-day' && leaveData.status === 'approved') {
          leaveDataInstance.totalLeaves += 0.5;
        } else if (leaveData.leaveType === 'full-day' && leaveData.status === 'approved') {
          leaveDataInstance.totalLeaves += 1; // Increment by 1 for full-day leave
        }

        await leaveDataInstance.save();
        return leaveDataInstance;
      } 
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = ApplyLeavesDataService;

