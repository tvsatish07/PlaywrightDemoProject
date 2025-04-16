class testData {
    static getRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < length; i++) {
          randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomString;
      }
  
    static generateUsername() {
      return `${this.getRandomString(8)}`;
    }
  
    static generateEmail() {
      return `test_${this.getRandomString(5)}@advantage.com`;
    }
  }
  module.exports = {testData};