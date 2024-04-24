function getCookie(name) {
    const cookieString = document.cookie; // Get the cookie string
    const cookies = cookieString.split(';'); // Split the string into individual cookies
    
    // Loop through each cookie
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim(); // Trim any leading or trailing spaces
      // Check if the cookie starts with the name we're looking for
      if (cookie.startsWith(name + '=')) {
        // Return the value of the cookie
        return cookie.substring(name.length + 1);
      }
    }
    // If cookie not found, return null
    return null;
  }
  export default getCookie
