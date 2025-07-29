export function setCookie(name: string, value: string, days: number) {
  // Função para apagar cookie
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  // Função para setar cookie
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  // Função para verificar se cookie existe
  const cookieExists = (name: string) => {
    return document.cookie.split('; ').some(cookie => cookie.startsWith(name + '='));
  };

  if (cookieExists(name)) {
    deleteCookie(name);
  }

  setCookie(name, value, days);
}

export function getCookie(name: string): string | null {
  const cookies = document.cookie.split('; ');

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null; // Se o cookie não for encontrado
}
