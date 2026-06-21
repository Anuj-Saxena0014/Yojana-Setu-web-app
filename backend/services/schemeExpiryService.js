const cron = require('node-cron');
const Scheme = require('../models/Scheme');

/**
 * Checks all active schemes and deactivates those whose deadlines have passed.
 * Expired schemes are not deleted; they are marked with isActive = false.
 */
async function checkExpiries() {
  console.log('⏰ Running scheduled expiry management check...');
  try {
    const currentDate = new Date();
    
    // Find schemes that are active but have a deadline in the past
    const expiredSchemes = await Scheme.find({
      isActive: true,
      deadline: { $ne: null, $lt: currentDate }
    });

    if (expiredSchemes.length === 0) {
      console.log('✅ No new expired schemes found.');
      return;
    }

    console.log(`🔍 Found ${expiredSchemes.length} expired scheme(s) to deactivate.`);

    for (const scheme of expiredSchemes) {
      scheme.isActive = false;
      await scheme.save();
      console.log(`🚫 Deactivated expired scheme: "${scheme.name}" (Deadline: ${scheme.deadline.toISOString().split('T')[0]})`);
    }

    console.log('🎉 Expiry check complete. Updated records logged.');
  } catch (err) {
    console.error('❌ Expiry management service error:', err.message);
  }
}

/**
 * Starts the daily expiry check service at midnight (00:00).
 */
function startExpiryService() {
  // Run on startup immediately to clean up database state
  checkExpiries();

  // Schedule daily cron check at midnight
  cron.schedule('0 0 * * *', () => {
    checkExpiries();
  });
  
  console.log('📅 Scheme Expiry Service initialized with node-cron (Scheduled for daily check at 00:00).');
}

module.exports = {
  checkExpiries,
  startExpiryService
};
