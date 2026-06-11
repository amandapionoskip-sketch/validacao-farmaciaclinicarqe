// Professional data
const professionalData = {
    name: "Amanda Pionoski Prudente",
    profession: "Farmacêutica Clínica",
    crfpr: "CRF/PR 40940",
    rqe: "1058",
    validationDate: new Date(),
    documentStatus: "Completo"
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setValidationDate();
    addAnimations();
    validateDataIntegrity();
    setupDataDisplay();
});

/**
 * Set the validation date to today
 */
function setValidationDate() {
    const dateElement = document.getElementById('validation-date');
    if (dateElement) {
        const today = new Date();
        const formattedDate = formatDate(today);
        dateElement.textContent = formattedDate;
    }
}

/**
 * Format date to Brazilian format (DD/MM/YYYY)
 */
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Validate data integrity
 */
function validateDataIntegrity() {
    const requiredFields = ['name', 'profession', 'crfpr', 'rqe'];
    
    requiredFields.forEach(field => {
        if (!professionalData[field] || professionalData[field].trim() === '') {
            console.warn(`Warning: Required field '${field}' is missing or empty`);
        }
    });
    
    console.log('Data integrity check completed');
}

/**
 * Setup data display with animations
 */
function setupDataDisplay() {
    const infoItems = document.querySelectorAll('.info-item');
    
    infoItems.forEach((item, index) => {
        // Add fade-in animation
        item.style.animation = `fadeIn 0.6s ease-in ${index * 0.1}s forwards`;
        item.style.opacity = '0';
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * Add animations to the page
 */
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header {
            animation: slideInDown 0.8s ease;
        }
        
        .validation-card {
            animation: fadeIn 0.8s ease 0.2s forwards;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Get professional data (can be used to display or export)
 */
function getProfessionalData() {
    return professionalData;
}

/**
 * Export data as JSON
 */
function exportDataAsJSON() {
    const dataStr = JSON.stringify(professionalData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'validacao-profissional.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * Verify professional credentials (mock verification)
 */
function verifyCredentials() {
    const verification = {
        name: {
            valid: professionalData.name.length > 0,
            message: "Nome verificado"
        },
        profession: {
            valid: professionalData.profession.length > 0,
            message: "Profissão verificada"
        },
        crfpr: {
            valid: /^CRF\/[A-Z]{2} \d{5}$/.test(professionalData.crfpr),
            message: "CRF/PR válido"
        },
        rqe: {
            valid: /^\d{4,5}$/.test(professionalData.rqe),
            message: "RQE válido"
        }
    };
    
    const allValid = Object.values(verification).every(v => v.valid);
    
    return {
        overall: allValid,
        details: verification,
        timestamp: new Date().toISOString()
    };
}

/**
 * Log verification results (for debugging)
 */
function logVerificationResults() {
    const results = verifyCredentials();
    console.log('=== Verification Results ===');
    console.log('Overall Valid:', results.overall);
    console.log('Details:', results.details);
    console.log('Timestamp:', results.timestamp);
}

// Run verification check on page load
logVerificationResults();

// Make functions available globally if needed
window.exportDataAsJSON = exportDataAsJSON;
window.verifyCredentials = verifyCredentials;
window.getProfessionalData = getProfessionalData;