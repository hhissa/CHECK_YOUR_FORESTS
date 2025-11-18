import { pass, token } from "../../keys";

function encodeFormBody(params: Record<string, string>) {
  return Object.entries(params)
    .map(([key, val]) => encodeURIComponent(key) + "=" + encodeURIComponent(val))
    .join("&");
}

export async function authenticate() {
  const body = encodeFormBody({
    token,
    pass,
    grant_type: "client_credentials"
  });

  try {
    const response = await fetch(
      "https://services.sentinel-hub.com/auth/realms/main/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        body
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Authentication failed: ${response.status} ${text}`);
    }

    const data = await response.json();
    const token = data.access_token;

    console.log("Authenticated successfully:", token);
    return token;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Example usage
(async () => {
  const token = await authenticate();

  // Example request using the token
  const processResponse = await fetch("https://services.sentinel-hub.com/api/v1/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      // your process API body here
    })
  });

  const result = await processResponse.json();
  console.log(result);
})();
