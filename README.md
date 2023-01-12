# PunyCode-Generator  
Generate punycode domain variations using homoglyphs (characters that resemble each other).
The idea is to generate variations to check for homograph attacks against a list of known domains.   

# How does a Punycode attack work?    
Unicode characters can look the same to the naked eye but actually, have a different web address. Some letters in the Roman alphabet, used by the majority of modern languages, are the same shape as letters in Greek, Cyrillic, and other alphabets, so it’s easy for an attacker to launch a domain name that replaces some ASCII characters with Unicode characters. For example, you could swap a normal T for a Greek Tau: τ, the user would see the almost identical T symbol but the punycode behind this, read by the computer, is actually xn--5xa. Depending on how the browser renders this information in the address bar, these sneaky little characters are impossible for us humans to identify.  
This technique is called a homograph attack, the URLs will look legitimate, and the content on the page might appear the same on the face of it but its actually a different website set up to steal the victim’s sensitive data or to infect the user’s device. These attacks use common techniques like phishing, forced downloads, and scams.

# Looking for contributors:  
What for?  
  1. Optimize the performance  
  2. Extend to include diferent ways to encode the url  
  3. Build a product that can actually check the thousands of possible punycode attacks, verify if the url was registered, check if the website is online, notify the responsibles and so forth. The volume of combinations is absurd. Needs work to become viable.  
