const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Scheme = require('../models/Scheme');

const FRONTEND_SCHEMES_PATH = path.join(__dirname, '../../frontend/src/data/schemes.js');
const BACKEND_SCHEMES_PATH = path.join(__dirname, 'schemes.js');

async function seedDatabase() {
  try {
    console.log('🔄 Loading and converting schemes dataset...');

    // 1. Read frontend ES6 schemes file
    if (!fs.existsSync(FRONTEND_SCHEMES_PATH)) {
      throw new Error(`Frontend schemes file not found at ${FRONTEND_SCHEMES_PATH}`);
    }
    let content = fs.readFileSync(FRONTEND_SCHEMES_PATH, 'utf8');

    // Convert ES6 export to CommonJS module.exports
    content = content.replace('export default schemes;', 'module.exports = schemes;');
    
    // Write back to backend/data/schemes.js
    fs.writeFileSync(BACKEND_SCHEMES_PATH, content, 'utf8');
    console.log(`✅ Converted and updated backend schemes file at ${BACKEND_SCHEMES_PATH}`);

    // Load the newly updated schemes file
    // Clear cache first to ensure we get the fresh content
    delete require.cache[require.resolve('./schemes.js')];
    const rawSchemes = require('./schemes.js');
    console.log(`Loaded ${rawSchemes.length} raw schemes from dataset.`);

    // Connect to MongoDB
    console.log('Connecting to database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    // Deduplicate schemes by normalized name
    const seenNames = new Set();
    const uniqueSchemes = [];

    rawSchemes.forEach((s) => {
      // Normalize name: lowercase and alphanumeric only
      const normName = s.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!seenNames.has(normName)) {
        seenNames.add(normName);
        uniqueSchemes.push(s);
      } else {
        console.log(`🚫 Skipping duplicate scheme: "${s.name}" (ID: ${s.id})`);
      }
    });

    console.log(`Deduplication complete. Unique schemes to seed: ${uniqueSchemes.length}`);

    // Enrich and insert schemes
    const enrichedSchemes = uniqueSchemes.map((s) => {
      const idNum = parseInt(s.id);
      
      // Determine deadline (past, future, or null)
      let deadline = null;
      if (idNum === 2) {
        // PM Ujjwala Yojana - Expired
        deadline = new Date('2026-05-15');
      } else if (idNum === 7) {
        // PM Mudra Yojana - Expired
        deadline = new Date('2026-06-01');
      } else if (idNum === 5) {
        // PMAY Urban - Future
        deadline = new Date('2026-12-31');
      }

      // Determine lastVerified (older than 180 days or recent)
      let lastVerified = new Date('2026-06-22');
      if (idNum === 10 || idNum === 12) {
        // Sukanya Samriddhi or National Old Age Pension - Over 180 days ago
        lastVerified = new Date('2025-10-15');
      }

      // Determine launchDate
      const launchDate = s.launchedYear ? new Date(`${s.launchedYear}-01-01`) : new Date('2015-01-01');

      return {
        name: s.name.trim(),
        shortDescription: s.shortDescription,
        description: s.description,
        ministry: s.ministry || 'Government of India',
        launchedYear: s.launchedYear,
        category: s.category || 'General',
        imageEmoji: s.imageEmoji || '🏛️',
        benefits: s.benefits || [],
        applicationUrl: s.applicationUrl || '',
        eligibility: s.eligibility || {
          occupation: ['Other'],
          minAge: 0,
          maxAge: 99,
          maxIncome: 1000000,
          gender: ['Male', 'Female', 'Other'],
          category: ['General', 'OBC', 'SC', 'ST'],
          states: ['All']
        },
        deadline,
        launchDate,
        isActive: true, // Will be updated by expiry check
        lastVerified
      };
    });

    // Clear existing schemes
    console.log('Clearing old schemes in DB...');
    await Scheme.deleteMany({});

    // Bulk insert
    console.log('Inserting enriched schemes...');
    const result = await Scheme.insertMany(enrichedSchemes);
    console.log(`🎉 Database seeded successfully with ${result.length} schemes!`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
