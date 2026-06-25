const mongoose = require("mongoose");
const axios = require("axios");
const Scheme = require("../models/Scheme");
require("dotenv").config();

async function verifyLinks() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const schemes = await Scheme.find();

    console.log(`Checking ${schemes.length} schemes...\n`);

    for (const scheme of schemes) {
        console.log("Scheme:", scheme.name);
console.log("URL:", scheme.applicationUrl);
console.log("Type:", typeof scheme.applicationUrl);
      try {
        
        const response = await axios.get(
  scheme.applicationUrl,
  {
    timeout: 15000,
    maxRedirects: 10,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/125.0 Safari/537.36",
    },
  }
);

        console.log(
          `✅ ${scheme.name} | Status: ${response.status}`
        );

        scheme.lastVerified = new Date();
        scheme.needsVerification = false;

        await scheme.save();

      } catch (error) {
  console.log(`\n❌ ${scheme.name}`);

  if (error.response) {
    console.log("Status:", error.response.status);
  } else if (error.request) {
    console.log("No response received");
  } else {
    console.log("Error:", error.message);
  }

  scheme.needsVerification = true;
  await scheme.save();
}
    }

    console.log("\nVerification Complete");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

verifyLinks();