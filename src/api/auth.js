export const loginApi = async ({ email, password, role }) => {
  let url = '';
  if (role === 'student') {
    url = 'http://127.0.0.1:8000/api/student/login';
  } else if (role === 'lecturer') {
    url = 'http://127.0.0.1:8000/api/lecture/login';
  } else {
    url = `http://localhost:4000/api/login/${role}`;
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Login failed');
  }
  return response.json();
};

export const registerApi = async (data) => {
  const { role, ...rest } = data;
  let url = '';
  if (role === 'student') {
    url = 'http://127.0.0.1:8000/api/student/register';
  } else if (role === 'lecturer') {
    url = 'http://127.0.0.1:8000/api/lecture/register';
  } else {
    url = `http://localhost:4000/api/register/${role}`;
  }
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rest),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }
  return response.json();
};
