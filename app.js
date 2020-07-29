/* eslint-disable func-style */
// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 200);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
// UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const periods = document.getElementById('periods');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedPeriods = parseFloat(periods.value);
  const calculatedInterest = parseFloat(interest.value.replace(',', '.')) / 100;
  const calculatedTotal = principal * (1 + calculatedInterest) ** calculatedPeriods;

  if (isFinite(calculatedTotal)) {
    totalPayment.value = calculatedTotal.toFixed(2);
    totalInterest.value = (calculatedTotal - principal).toFixed(2);

    // Show Results
    document.getElementById('results').style.display = 'block';

    // Hide Loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers');
  }
}

// Show Error
function showError(error) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  // Hide Loader
  document.getElementById('loading').style.display = 'none';

  // Create a div
  const errorDiv = document.createElement('div');

  // Get Elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear Error

function clearError() {
  document.querySelector('.alert').remove();
}
