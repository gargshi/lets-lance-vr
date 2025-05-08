export const isTokenExpired = (token: string): boolean => {
	try {
	  const payloadBase64 = token.split('.')[1];
	  const decodedPayload = JSON.parse(atob(payloadBase64));
  
	  // exp is usually in seconds, while Date.now() gives milliseconds
	  const expiryTime = decodedPayload.exp * 1000;
	  const currentTime = Date.now();
  
	  return currentTime >= expiryTime;
	} catch (error) {
	  console.error('Failed to decode token:', error);
	  // If decoding fails, treat as expired
	  return true;
	}
};