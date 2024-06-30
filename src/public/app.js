document.getElementById('login-btn').addEventListener('click', () => {
    window.location.href = '/auth/google';
  });
  
  document.getElementById('logout-btn').addEventListener('click', () => {
    fetch('/auth/logout')
      .then(response => {
        if (response.ok) {
          window.location.href = '/';
        }
      });
  });
  
  document.getElementById('load-recipes').addEventListener('click', () => {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => {
        const recipesDiv = document.getElementById('recipes');
        recipesDiv.innerHTML = '';
        data.forEach(recipe => {
          const recipeDiv = document.createElement('div');
          recipeDiv.innerText = `${recipe.name}: ${recipe.instructions}`;
          recipesDiv.appendChild(recipeDiv);
        });
      });
  });
  
  // Check if the user is logged in and update the UI accordingly
  fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      if (user && user.email) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        document.getElementById('user-email').innerText = user.email;
      }
    });
  