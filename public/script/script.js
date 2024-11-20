// Toggle the visibility of options
function toggleOptions(id) {
    const element = document.getElementById(id);
    element.style.display = element.style.display === 'flex' || element.style.display === 'block' ? 'none' : id === 'userOptions' ? 'flex' : 'block';
  }
  
  // Open a modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
  }
  
  // Close a modal
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
  }
  
  // Close modal on outside click
  window.onclick = function (event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  };
  
  document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the username and password from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded admin credentials
    const correctUsername = 'admin';
    const correctPassword = 'admin123';

    // Validate the login
    if (username === correctUsername && password === correctPassword) {
        // admin dashboard 
        window.location.href = '\\partial\\dashboard.html';
    } else {
        // Show error message if credentials are incorrect
        document.getElementById('error-message').style.display = 'block';
    }
});


document.querySelector('#userLoginModal form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('userUsername').value;
    const password = document.getElementById('userPassword').value;
  
    try {
      const response = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.status === 200) {
        alert(data.message); 
        closeModal('userLoginModal');
        window.location.href = '\\partial\\user.html';
      } else {
        alert(data.message); 
      }
    } catch (error) {
      alert('Error logging in');
      console.error(error);
    }
  });
  

  document.querySelector('#userSignupModal form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('userSignupUsername').value;
    const password = document.getElementById('userSignupPassword').value;
  
    try {
      const response = await fetch('http://localhost:9000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if (response.status === 201) {
        alert(data.message); 
        closeModal('userSignupModal');
        window.location.href = '\\partial\\user.html';
      } else {
        alert(data.message); 
      }
    } catch (error) {
      alert('Error signing up');
      console.error(error);
    }
  });