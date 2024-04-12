const join = document.querySelectorAll('.btn-join');

join.forEach(button => {
    button.addEventListener('click', () => {
        // Get the server name from the parent element
        const serverName = button.parentElement.textContent.trim();
        
        // Redirect to the server page or perform other actions
        // For example, you can redirect to the server page with serverName in the URL
        window.location.href = `/server/${serverName}`;
    });
});