document.addEventListener("DOMContentLoaded", () => {
  // Get chatbot elements
  const chatbot = document.querySelector(".chatbot")
  const chatbotToggle = document.querySelector(".chatbot-toggle")
  const chatbotClose = document.querySelector(".chatbot-close")
  const chatbotMessages = document.querySelector(".chatbot-messages")
  const chatbotInput = document.querySelector(".chatbot-input input")
  const sendButton = document.querySelector(".send-button")

  // Toggle chatbot visibility
  chatbotToggle.addEventListener("click", () => {
    chatbot.classList.add("active")
    chatbotInput.focus()
  })

  // Close chatbot
  chatbotClose.addEventListener("click", () => {
    chatbot.classList.remove("active")
  })

  // Send message on button click
  sendButton.addEventListener("click", sendMessage)

  // Send message on Enter key
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })

  // Function to send user message
  function sendMessage() {
    const message = chatbotInput.value.trim()

    // Don't send empty messages
    if (message === "") return

    // Add user message to chat
    addMessage(message, "user")

    // Clear input field
    chatbotInput.value = ""

    // Simulate bot thinking
    setTimeout(() => {
      // Get bot response
      const response = getBotResponse(message)

      // Add bot response to chat
      addMessage(response, "bot")

      // Scroll to bottom
      scrollToBottom()
    }, 1000)

    // Scroll to bottom
    scrollToBottom()
  }

  // Function to add message to chat
  function addMessage(message, sender) {
    // Create message element
    const messageElement = document.createElement("div")
    messageElement.classList.add("message")
    messageElement.classList.add(sender === "user" ? "user-message" : "bot-message")

    // Create message content
    const messageContent = document.createElement("div")
    messageContent.classList.add("message-content")

    // Format message content
    if (typeof message === "string") {
      messageContent.innerHTML = `<p>${message}</p>`
    } else {
      messageContent.innerHTML = message
    }

    // Create message time
    const messageTime = document.createElement("div")
    messageTime.classList.add("message-time")
    messageTime.textContent = "Just now"

    // Append elements
    messageElement.appendChild(messageContent)
    messageElement.appendChild(messageTime)

    // Add message to chat
    chatbotMessages.appendChild(messageElement)
  }

  // Function to scroll to bottom of chat
  function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
  }

  // Function to get bot response
  function getBotResponse(message) {
    // Convert message to lowercase for easier matching
    const lowerMessage = message.toLowerCase()

    // Check for keywords and return appropriate response
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! How can I help you today?"
    } else if (lowerMessage.includes("join") || lowerMessage.includes("member") || lowerMessage.includes("membership") || lowerMessage.includes("apply")) {
      return `<p>To join our club, follow these steps:</p>
              <ol>
                1. Fill out the application form <br>
                2. Come to any of our sessions <br>
                3. Hand in the application form to the team leads in person <br>
                4. We will contact you for a further meeting
              </ol>
              <br>
              <p>You can find more details in the <a href="#join-section">Join Us</a> section of our website.</p>`
    } else if (
      lowerMessage.includes("event") ||
      lowerMessage.includes("workshop") ||
      lowerMessage.includes("session")
    ) {
      return `<p>We have several upcoming events:</p>
              <ul>
                <li>Project Session - May 23, 2025</li>
                <li>Open Session - June 6, 2025</li>
                <li>Quant Day - TBA, 2025</li>
              </ul>
              <p>Check out our <a href="/events/index.html">Events page</a> for more details and registration.</p>`
    } else if (
      lowerMessage.includes("resource") ||
      lowerMessage.includes("material") ||
      lowerMessage.includes("learn")
    ) {
      return `<p>We offer various resources for members:</p>
              <ul>
                <li>Educational materials on quantitative finance</li>
                <li>Access to financial datasets</li>
                <li>Programming tutorials for financial applications</li>
                <li>Research papers and case studies</li>
              </ul>
              <p>Visit our <a href="/resources/index.html">Resources page</a> to explore all available materials.</p>`
    } else if (lowerMessage.includes("project") || lowerMessage.includes("research")) {
      return `<p>Our club works on various projects throughout the year, including:</p>
              <ul>
                <li>Algorithmic trading strategies</li>
                <li>Financial data analysis</li>
                <li>Risk management models</li>
                <li>Market prediction using machine learning</li>
              </ul>
              <p>Check out our <a href="/projects/index.html">Projects page</a> to see our current and past projects.</p>`
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
      return `<p>You can contact us through:</p>
              <ul>
                <li>Email: qfe.bonn@gmail.com</li>
                <li>LinkedIn: <a href="https://linkedin.com/company/qfe-bonn" target="_blank">QFE Bonn</a></li>
                <li>Visit us in person during our session hours</li>
              </ul>
              <p>Our team typically responds within 24-48 hours.</p>`
    } else if (lowerMessage.includes("thank")) {
      return "You're welcome! Feel free to ask if you have any other questions."
    } else {
      return `<p>I'm not sure I understand your question. Here are some topics I can help with:</p>
              <ul>
                <li>Membership</li>
                <li>Upcoming events</li>
                <li>Resources</li>
                <li>Projects</li>
                <li>Contact information</li>
              </ul>
              <p>Could you please rephrase your question?</p>`
    }
  }
})