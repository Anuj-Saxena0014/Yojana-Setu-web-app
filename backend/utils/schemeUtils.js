/**
 * Utility functions for scheme processing
 */

/**
 * Strict rule-based filtering logic.
 * Checks age, income, gender, state, occupation, and category.
 */
function matchesProfile(scheme, profile) {
  const e = scheme.eligibility;
  if (!e) return true;

  // 1. Age check
  const age = Number(profile.age);
  if (profile.age !== undefined && !isNaN(age) && age > 0) {
    if (e.minAge !== undefined && age < e.minAge) return false;
    if (e.maxAge !== undefined && age > e.maxAge) return false;
  }

  // 2. Income check
  const annualIncome = Number(profile.annualIncome);
  if (profile.annualIncome !== undefined && !isNaN(annualIncome) && annualIncome > 0) {
    if (e.maxIncome !== undefined && e.maxIncome > 0 && e.maxIncome < 99999999) {
      if (annualIncome > e.maxIncome) return false;
    }
  }

  // 3. Gender check
  if (profile.gender && e.gender && e.gender.length > 0) {
    const userGenderLower = profile.gender.trim().toLowerCase();
    const schemeGendersLower = e.gender.map(g => g.toLowerCase());
    if (!schemeGendersLower.includes("all") && !schemeGendersLower.includes("any") && !schemeGendersLower.includes(userGenderLower)) {
      return false;
    }
  }

  // 4. State check
  if (profile.state && e.states && e.states.length > 0) {
    const userStateLower = profile.state.trim().toLowerCase();
    const schemeStatesLower = e.states.map(s => s.toLowerCase());
    if (!schemeStatesLower.includes("all") && !schemeStatesLower.includes("any") && !schemeStatesLower.includes(userStateLower)) {
      return false;
    }
  }

  // 5. Occupation check
  if (profile.occupation && e.occupation && e.occupation.length > 0) {
    const userOccLower = profile.occupation.trim().toLowerCase();
    const schemeOccsLower = e.occupation.map(o => o.toLowerCase());
    if (!schemeOccsLower.includes("any") && !schemeOccsLower.includes("all") && !schemeOccsLower.includes(userOccLower)) {
      return false;
    }
  }

  // 6. Social Category check
  if (profile.category && e.category && e.category.length > 0) {
    const userCatLower = profile.category.trim().toLowerCase();
    const schemeCatsLower = e.category.map(c => c.toLowerCase());
    if (!schemeCatsLower.includes("all") && !schemeCatsLower.includes("any") && !schemeCatsLower.includes(userCatLower)) {
      return false;
    }
  }

  return true;
}

/**
 * Enriches scheme objects with verification warning details and days remaining.
 */
function enrichSchemeData(schemesList) {
  const currentDate = new Date();
  return schemesList.map(s => {
    // If we use .lean(), s is already a plain object.
    const sObj = typeof s.toObject === 'function' ? s.toObject() : { ...s };
    
    // Check if lastVerified is older than 180 days
    if (sObj.lastVerified) {
      const lastVerifiedDate = new Date(sObj.lastVerified);
      const diffTime = Math.abs(currentDate - lastVerifiedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      sObj.needsReview = diffDays > 180;
      sObj.daysSinceVerification = diffDays;
    } else {
      sObj.needsReview = false;
      sObj.daysSinceVerification = 0;
    }

    // Calculate days remaining until deadline
    if (sObj.deadline) {
      const deadlineDate = new Date(sObj.deadline);
      const diffTime = deadlineDate - currentDate;
      sObj.daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
      sObj.daysRemaining = null;
    }

    return sObj;
  });
}

module.exports = {
  matchesProfile,
  enrichSchemeData
};
