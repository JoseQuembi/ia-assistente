document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.success) {
                window.location.href = '/profile';
            } else {
                displayErrors(result.errors);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function displayErrors(errors) {
        const errorsDiv = document.getElementById('errors');
        errorsDiv.innerHTML = '';

        errors.forEach(error => {
            const errorElement = document.createElement('div');
            errorElement.textContent = error.msg;
            errorsDiv.appendChild(errorElement);
        });
    }
});
