/* ============================================
   TRAVEL HEALTHCARE PAY CALCULATOR - LOGIC
   Last Updated: January 2026
   ============================================ */

// === CONFIGURATION SECTION ===
// Easy customization for colors, links, and settings

const CONFIG = {
    // Affiliate Links (replace with your actual affiliate URLs)
    affiliateLinks: {
        taxSpecialist: 'https://your-tax-specialist-affiliate-link.com',
        taxSoftware: 'https://your-tax-software-affiliate-link.com',
        housing: 'https://your-housing-affiliate-link.com'
    },
    
    // Email capture endpoint (replace with your email service)
    emailCaptureEndpoint: 'https://your-email-service.com/subscribe',
    
    // Current tax year
    taxYear: 2026
};

// === TAX DATA (UPDATE ANNUALLY) ===

// Federal Tax Brackets for 2026
const federalTaxBrackets = {
    single: [
        { max: 11600, rate: 0.10 },
        { max: 47150, rate: 0.12 },
        { max: 100525, rate: 0.22 },
        { max: 191950, rate: 0.24 },
        { max: 243725, rate: 0.32 },
        { max: 609350, rate: 0.35 },
        { max: Infinity, rate: 0.37 }
    ],
    married: [
        { max: 23200, rate: 0.10 },
        { max: 94300, rate: 0.12 },
        { max: 201050, rate: 0.22 },
        { max: 383900, rate: 0.24 },
        { max: 487450, rate: 0.32 },
        { max: 731200, rate: 0.35 },
        { max: Infinity, rate: 0.37 }
    ],
    hoh: [
        { max: 16550, rate: 0.10 },
        { max: 63100, rate: 0.12 },
        { max: 100500, rate: 0.22 },
        { max: 191950, rate: 0.24 },
        { max: 243700, rate: 0.32 },
        { max: 609350, rate: 0.35 },
        { max: Infinity, rate: 0.37 }
    ]
};

// Standard Deductions for 2026
const standardDeductions = {
    single: 14600,
    married: 29200,
    hoh: 21900
};

// FICA Rates and Limits for 2026
const FICA = {
    socialSecurityRate: 0.062,
    socialSecurityLimit: 168600,
    medicareRate: 0.0145,
    additionalMedicareRate: 0.009,
    additionalMedicareThreshold: {
        single: 200000,
        married: 250000,
        hoh: 200000
    }
};

// State Tax Rates (simplified - some states have progressive brackets)
const stateTaxRates = {
    'AL': 0.05, 'AK': 0, 'AZ': 0.025, 'AR': 0.049, 'CA': 0.093,
    'CO': 0.044, 'CT': 0.0699, 'DE': 0.066, 'FL': 0, 'GA': 0.0575,
    'HI': 0.11, 'ID': 0.058, 'IL': 0.0495, 'IN': 0.0323, 'IA': 0.06,
    'KS': 0.057, 'KY': 0.045, 'LA': 0.0425, 'ME': 0.0715, 'MD': 0.0575,
    'MA': 0.05, 'MI': 0.0425, 'MN': 0.0985, 'MS': 0.05, 'MO': 0.049,
    'MT': 0.0675, 'NE': 0.0684, 'NV': 0, 'NH': 0, 'NJ': 0.1075,
    'NM': 0.059, 'NY': 0.109, 'NC': 0.0475, 'ND': 0.029, 'OH': 0.0399,
    'OK': 0.05, 'OR': 0.099, 'PA': 0.0307, 'RI': 0.0599, 'SC': 0.065,
    'SD': 0, 'TN': 0, 'TX': 0, 'UT': 0.0485, 'VT': 0.0875,
    'VA': 0.0575, 'WA': 0, 'WV': 0.065, 'WI': 0.0765, 'WY': 0
};

const stateNames = {
    'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
    'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
    'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
    'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
    'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
    'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
    'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
    'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
    'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
    'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming'
};

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', function() {
    // Populate state dropdowns
    populateStates();
    
    // Setup advanced toggle
    document.getElementById('advancedToggle1').addEventListener('click', function() {
        const advancedOptions = document.getElementById('advancedOptions1');
        if (advancedOptions.style.display === 'none') {
            advancedOptions.style.display = 'block';
            this.textContent = '- Hide Advanced Options';
        } else {
            advancedOptions.style.display = 'none';
            this.textContent = '+ Advanced Options';
        }
    });
});

function populateStates() {
    const stateSelects = [document.getElementById('state1'), document.getElementById('state2')];
    
    stateSelects.forEach(select => {
        for (const [code, name] of Object.entries(stateNames)) {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = name;
            select.appendChild(option);
        }
    });
}

// === COMPARISON MODE ===

function toggleComparison() {
    const contract2 = document.getElementById('contract2');
    const toggleBtn = document.getElementById('compareToggle');
    
    if (contract2.style.display === 'none') {
        contract2.style.display = 'block';
        toggleBtn.textContent = '- Remove Comparison';
    } else {
        contract2.style.display = 'none';
        toggleBtn.textContent = '+ Compare with Another Contract';
        document.getElementById('comparisonResults').style.display = 'none';
    }
}

// === MAIN CALCULATION FUNCTION ===

function calculateContract(contractNum) {
    // Get input values
    const hourlyRate = parseFloat(document.getElementById(`hourlyRate${contractNum}`).value) || 0;
    const hoursPerWeek = parseFloat(document.getElementById(`hoursPerWeek${contractNum}`).value) || 0;
    const weeklyStipend = parseFloat(document.getElementById(`weeklyStipend${contractNum}`).value) || 0;
    const contractLength = parseInt(document.getElementById(`contractLength${contractNum}`).value) || 0;
    const state = document.getElementById(`state${contractNum}`).value;
    const filingStatus = document.getElementById(`filingStatus${contractNum}`).value;
    const hasTaxHome = document.getElementById(`taxHome${contractNum}`).value === 'yes';
    
    // Validation
    if (!hourlyRate || !hoursPerWeek || !contractLength || !state) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Advanced options
    const otherIncome = parseFloat(document.getElementById(`otherIncome${contractNum}`)?.value) || 0;
    const overtimeHours = parseFloat(document.getElementById(`overtimeHours${contractNum}`)?.value) || 0;
    const overtimeRate = parseFloat(document.getElementById(`overtimeRate${contractNum}`)?.value) || 1.5;
    
    // Calculate weekly gross income
    const regularWeeklyGross = hourlyRate * hoursPerWeek;
    const overtimeWeeklyGross = overtimeHours * (hourlyRate * overtimeRate);
    const weeklyGrossTaxable = regularWeeklyGross + overtimeWeeklyGross;
    
    // Determine if stipend is taxable
    const weeklyStipendTaxable = hasTaxHome ? 0 : weeklyStipend;
    const weeklyStipendNonTaxable = hasTaxHome ? weeklyStipend : 0;
    
    // Total weekly taxable income
    const totalWeeklyTaxable = weeklyGrossTaxable + weeklyStipendTaxable;
    
    // Estimate annual income
    const estimatedAnnualIncome = (totalWeeklyTaxable * 52) + otherIncome;
    
    // Calculate taxes
    const weeklyFederalTax = calculateFederalTax(totalWeeklyTaxable, estimatedAnnualIncome, filingStatus) / 52;
    const weeklyStateTax = calculateStateTax(totalWeeklyTaxable, state);
    const weeklyFICA = calculateFICA(totalWeeklyTaxable, estimatedAnnualIncome, filingStatus);
    
    // Calculate net take-home
    const weeklyNet = totalWeeklyTaxable + weeklyStipendNonTaxable - weeklyFederalTax - weeklyStateTax - weeklyFICA;
    const totalContractNet = weeklyNet * contractLength;
    const totalHours = (hoursPerWeek + overtimeHours) * contractLength;
    const effectiveHourlyRate = totalContractNet / totalHours;
    
    // Display results
    displayResults(contractNum, {
        weeklyNet,
        totalContractNet,
        effectiveHourlyRate,
        weeklyGrossTaxable: totalWeeklyTaxable,
        weeklyStipendNonTaxable,
        weeklyFederalTax,
        weeklyStateTax,
        weeklyFICA,
        estimatedAnnualIncome,
        hasTaxHome,
        state
    });
    
    // Check if we should show comparison
    if (contractNum === 2) {
        showComparison();
    }
}

// === TAX CALCULATION FUNCTIONS ===

function calculateFederalTax(weeklyTaxable, annualIncome, filingStatus) {
    const brackets = federalTaxBrackets[filingStatus];
    const standardDeduction = standardDeductions[filingStatus];
    
    // Calculate taxable income after standard deduction
    const taxableIncome = Math.max(0, annualIncome - standardDeduction);
    
    let tax = 0;
    let previousMax = 0;
    
    for (const bracket of brackets) {
        const bracketIncome = Math.min(taxableIncome, bracket.max) - previousMax;
        if (bracketIncome > 0) {
            tax += bracketIncome * bracket.rate;
        }
        previousMax = bracket.max;
        if (taxableIncome <= bracket.max) break;
    }
    
    return tax;
}

function calculateStateTax(weeklyTaxable, stateCode) {
    const rate = stateTaxRates[stateCode] || 0;
    return weeklyTaxable * rate;
}

function calculateFICA(weeklyTaxable, annualIncome, filingStatus) {
    // Social Security
    let socialSecurity = 0;
    if (annualIncome <= FICA.socialSecurityLimit) {
        socialSecurity = weeklyTaxable * FICA.socialSecurityRate;
    } else {
        // Prorated if near the limit
        const weeklyLimit = FICA.socialSecurityLimit / 52;
        socialSecurity = Math.min(weeklyTaxable, weeklyLimit) * FICA.socialSecurityRate;
    }
    
    // Medicare
    const medicare = weeklyTaxable * FICA.medicareRate;
    
    // Additional Medicare Tax (if over threshold)
    let additionalMedicare = 0;
    const threshold = FICA.additionalMedicareThreshold[filingStatus];
    if (annualIncome > threshold) {
        additionalMedicare = weeklyTaxable * FICA.additionalMedicareRate;
    }
    
    return socialSecurity + medicare + additionalMedicare;
}

// === DISPLAY RESULTS ===

function displayResults(contractNum, data) {
    // Show results section
    document.getElementById(`results${contractNum}`).style.display = 'block';
    
    // Update main results
    document.getElementById(`weeklyNet${contractNum}`).textContent = formatCurrency(data.weeklyNet);
    document.getElementById(`totalNet${contractNum}`).textContent = formatCurrency(data.totalContractNet);
    document.getElementById(`effectiveRate${contractNum}`).textContent = formatCurrency(data.effectiveHourlyRate) + '/hr';
    
    // Update breakdown
    document.getElementById(`grossTaxable${contractNum}`).textContent = formatCurrency(data.weeklyGrossTaxable);
    document.getElementById(`stipendAmount${contractNum}`).textContent = formatCurrency(data.weeklyStipendNonTaxable);
    document.getElementById(`federalTax${contractNum}`).textContent = '-' + formatCurrency(data.weeklyFederalTax);
    document.getElementById(`stateTax${contractNum}`).textContent = '-' + formatCurrency(data.weeklyStateTax);
    document.getElementById(`fica${contractNum}`).textContent = '-' + formatCurrency(data.weeklyFICA);
    
    // State tax note
    const stateName = stateNames[data.state];
    const stateRate = stateTaxRates[data.state];
    let stateNote = '';
    if (stateRate === 0) {
        stateNote = `(${stateName} has no state income tax)`;
    } else {
        stateNote = `(${stateName}: ${(stateRate * 100).toFixed(2)}% rate)`;
    }
    document.getElementById(`stateTaxNote${contractNum}`).textContent = stateNote;
    
    // Long-term impact
    document.getElementById(`taxableIncome${contractNum}`).textContent = formatCurrency(data.estimatedAnnualIncome);
    
    // Tax home warning
    const taxHomeWarning = document.getElementById(`taxHomeWarning${contractNum}`);
    if (taxHomeWarning) {
        taxHomeWarning.style.display = data.hasTaxHome ? 'none' : 'block';
    }
    
    // Scroll to results
    document.getElementById(`results${contractNum}`).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// === COMPARISON ===

function showComparison() {
    const results1 = document.getElementById('results1');
    const results2 = document.getElementById('results2');
    
    if (results1.style.display === 'none' || results2.style.display === 'none') {
        return; // Both contracts need to be calculated
    }
    
    const net1 = parseFloat(document.getElementById('totalNet1').textContent.replace(/[$,]/g, ''));
    const net2 = parseFloat(document.getElementById('totalNet2').textContent.replace(/[$,]/g, ''));
    
    const comparisonResults = document.getElementById('comparisonResults');
    const winnerAnnouncement = document.getElementById('winnerAnnouncement');
    
    const difference = Math.abs(net1 - net2);
    
    if (net1 > net2) {
        winnerAnnouncement.className = 'winner-announcement contract1-wins';
        winnerAnnouncement.innerHTML = `
            <strong>Contract 1 pays more!</strong><br>
            You'll earn <strong>${formatCurrency(difference)}</strong> more over the contract length.
        `;
    } else if (net2 > net1) {
        winnerAnnouncement.className = 'winner-announcement contract2-wins';
        winnerAnnouncement.innerHTML = `
            <strong>Contract 2 pays more!</strong><br>
            You'll earn <strong>${formatCurrency(difference)}</strong> more over the contract length.
        `;
    } else {
        winnerAnnouncement.className = 'winner-announcement';
        winnerAnnouncement.innerHTML = `
            <strong>Both contracts pay the same!</strong><br>
            Consider other factors like location, facility, and experience.
        `;
    }
    
    comparisonResults.style.display = 'block';
    comparisonResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// === EMAIL CAPTURE ===

function captureEmail(event, contractNum) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // TODO: Replace with your actual email service integration
    console.log('Email captured:', email);
    
    // Show success message
    form.innerHTML = '<p style="color: #10b981; font-weight: 600;">✓ Success! Check your email for tips.</p>';
    
    // Optional: Send to email service
    // fetch(CONFIG.emailCaptureEndpoint, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: email })
    // });
    
    return false;
}

// === UTILITY FUNCTIONS ===

function formatCurrency(amount) {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Store calculation results for comparison
const calculationResults = {};
