document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeStylesheet = document.getElementById('dark-mode-styles');
    
    // Check if dark mode preference is stored in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply dark mode if preference is set
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeStylesheet.disabled = false;
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        darkModeStylesheet.disabled = !darkModeStylesheet.disabled;
        
        // Store dark mode preference in localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
});
