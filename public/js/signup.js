const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (username && password.length >= 8) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
        alert(
            'Please include both a username and password, and make sure the password is at least 8 characters long'
        );
    }
  }
};

document
    .querySelector('#signupBtn')
    .addEventListener('submit', signupFormHandler);