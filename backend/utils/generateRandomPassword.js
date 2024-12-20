function generateRandomPassword() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let password = '';
	for (let i = 0; i < 7; i++) {
	  password += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return password;
  }
  
  module.exports = { generateRandomPassword };  