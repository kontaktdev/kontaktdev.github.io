class UrlHtmlTemplater {
    constructor() {
      this.elements = document.querySelectorAll('[data-template]');
    }
  
    // Function to get parameter value from URL
    getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      const results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
  
    // Function to replace placeholders in HTML with parameter values
    replacePlaceholders() {
      this.elements.forEach(element => {
        const paramName = element.getAttribute('data-template');
        const paramValue = this.getUrlParameter(paramName);
  
        // Replace content only if parameter value exists
        if (paramValue !== '') {
          element.textContent = paramValue
        }
      });
    }
  
    // Method to initialize and replace placeholders when the page loads
    init() {
      this.replacePlaceholders();
    }
  }
  
  // Usage:
  const templater = new UrlHtmlTemplater();
  templater.init();
  