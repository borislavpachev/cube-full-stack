const API_BASE_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
  const url = `${API_BASE_URL}users/login`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login error');
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};
