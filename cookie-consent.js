document.addEventListener("DOMContentLoaded", () => {
  console.log("Cookie consent script loaded")

  // Cookie consent elements
  const cookieBanner = document.getElementById("cookie-banner")
  const acceptAllBtn = document.getElementById("accept-all-cookies")
  const acceptNecessaryBtn = document.getElementById("accept-necessary-cookies")
  const cookieSettingsBtn = document.getElementById("cookie-settings")

  // Cookie modal elements
  const cookieModal = document.getElementById("cookie-modal")
  const openCookieSettingsBtn = document.getElementById("open-cookie-settings")
  const closeCookieModalBtn = document.getElementById("close-cookie-modal")
  const cookieModalOverlay = document.querySelector(".cookie-modal-overlay")

  // Cookie settings modal elements
  const saveSettingsBtn = document.getElementById("save-cookie-settings")
  const acceptAllModalBtn = document.getElementById("accept-all-cookies-modal")
  const rejectAllBtn = document.getElementById("reject-all-cookies")

  // Cookie category checkboxes
  const necessaryCookies = document.getElementById("necessary-cookies")
  const marketingStatisticsCookies = document.getElementById("marketing-statistics-cookies")

  // Test elements
  const clearCookiesBtn = document.getElementById("clear-cookies")
  const cookieStatus = document.getElementById("cookie-status")
  const chatbotStatus = document.getElementById("chatbot-status")

  // JotForm chatbot tracking
  let jotformLoaded = false
  let jotformScript = null

  // Initialize
  updateStatusDisplay()

  // Check if user has already made a choice
  const cookieConsent = getCookie("cookieConsent")

  if (!cookieConsent && cookieBanner) {
    // Show banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.remove("hidden")
    }, 1000)
  } else if (cookieConsent) {
    // Load services based on existing consent
    const preferences = JSON.parse(cookieConsent)
    loadExternalServices(preferences)
  }

  // Banner event listeners
  if (acceptAllBtn) {
    acceptAllBtn.addEventListener("click", () => {
      console.log("Accept all clicked")
      acceptAllCookies()
      hideBanner()
    })
  }

  if (acceptNecessaryBtn) {
    acceptNecessaryBtn.addEventListener("click", () => {
      console.log("Accept necessary clicked")
      acceptNecessaryCookies()
      hideBanner()
    })
  }

  if (cookieSettingsBtn) {
    cookieSettingsBtn.addEventListener("click", () => {
      console.log("Cookie settings clicked")
      hideBanner()
      openCookieModal()
    })
  }

  // Modal event listeners
  if (openCookieSettingsBtn) {
    openCookieSettingsBtn.addEventListener("click", (e) => {
      e.preventDefault()
      console.log("Open cookie settings clicked")
      openCookieModal()
    })
  }

  if (closeCookieModalBtn) {
    closeCookieModalBtn.addEventListener("click", closeCookieModal)
  }

  if (cookieModalOverlay) {
    cookieModalOverlay.addEventListener("click", closeCookieModal)
  }

  // Cookie settings modal event listeners
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", () => {
      console.log("Save settings clicked")
      saveCustomSettings()
      closeCookieModal()
    })
  }

  if (acceptAllModalBtn) {
    acceptAllModalBtn.addEventListener("click", () => {
      console.log("Accept all modal clicked")
      setMarketingStatisticsToggle(true)
      acceptAllCookies()
      closeCookieModal()
      showSuccessMessage()
    })
  }

  if (rejectAllBtn) {
    rejectAllBtn.addEventListener("click", () => {
      console.log("Reject all clicked")
      setMarketingStatisticsToggle(false)
      acceptNecessaryCookies()
      closeCookieModal()
      showSuccessMessage()
    })
  }

  // Test button
  if (clearCookiesBtn) {
    clearCookiesBtn.addEventListener("click", () => {
      console.log("Clear cookies clicked")
      clearAllCookies()
      updateStatusDisplay()
      // Show banner again
      if (cookieBanner) {
        cookieBanner.classList.remove("hidden")
      }
    })
  }

  // Add click event listeners to toggle labels
  setupToggleListeners()

  // Functions
  function setupToggleListeners() {
    console.log("Setting up toggle listeners")

    // Only setup listener for the marketing & statistics toggle (not the disabled necessary one)
    const marketingToggleLabel = document.querySelector("#marketing-statistics-cookies + .toggle-label")

    if (marketingToggleLabel) {
      // Remove any existing listeners
      marketingToggleLabel.removeEventListener("click", handleToggleClick)
      // Add new listener
      marketingToggleLabel.addEventListener("click", handleToggleClick)
    }
  }

  function handleToggleClick(event) {
    event.preventDefault()
    event.stopPropagation()

    const label = event.currentTarget
    const checkbox = label.previousElementSibling

    console.log("Toggle clicked:", checkbox.id, "Current state:", checkbox.checked)

    // Don't toggle if disabled
    if (checkbox.disabled) {
      console.log("Checkbox is disabled, not toggling")
      return
    }

    // Toggle the checkbox
    checkbox.checked = !checkbox.checked
    console.log("New state:", checkbox.checked)

    // Update visual state immediately
    updateToggleVisual(label, checkbox.checked)
  }

  function updateToggleVisual(label, isChecked) {
    if (isChecked) {
      label.style.backgroundColor = "var(--primary)"
    } else {
      label.style.backgroundColor = "#ccc"
    }
  }

  function acceptAllCookies() {
    const preferences = {
      necessary: true,
      marketingStatistics: true,
    }
    setCookie("cookieConsent", JSON.stringify(preferences), 365)
    loadExternalServices(preferences)
    updateStatusDisplay()
  }

  function acceptNecessaryCookies() {
    const preferences = {
      necessary: true,
      marketingStatistics: false,
    }
    setCookie("cookieConsent", JSON.stringify(preferences), 365)
    loadExternalServices(preferences)
    updateStatusDisplay()
  }

  function saveCustomSettings() {
    const preferences = {
      necessary: true, // Always true
      marketingStatistics: marketingStatisticsCookies ? marketingStatisticsCookies.checked : false,
    }
    console.log("Saving preferences:", preferences)
    setCookie("cookieConsent", JSON.stringify(preferences), 365)
    loadExternalServices(preferences)
    updateStatusDisplay()
    showSuccessMessage()
  }

  function openCookieModal() {
    loadCookiePreferences()
    cookieModal.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    // Re-setup toggle listeners after modal opens
    setTimeout(() => {
      setupToggleListeners()
    }, 100)
  }

  function closeCookieModal() {
    cookieModal.classList.add("hidden")
    document.body.style.overflow = ""
  }

  function loadCookiePreferences() {
    const consent = getCookie("cookieConsent")
    if (consent) {
      const preferences = JSON.parse(consent)
      console.log("Loading preferences:", preferences)

      if (marketingStatisticsCookies) {
        marketingStatisticsCookies.checked = preferences.marketingStatistics
        updateToggleVisual(marketingStatisticsCookies.nextElementSibling, preferences.marketingStatistics)
      }
    }
  }

  function setMarketingStatisticsToggle(value) {
    if (marketingStatisticsCookies) {
      marketingStatisticsCookies.checked = value
      updateToggleVisual(marketingStatisticsCookies.nextElementSibling, value)
    }
  }

  function loadExternalServices(preferences) {
    console.log("Loading external services with preferences:", preferences)

    // Handle JotForm chatbot based on marketing & statistics cookies
    if (preferences.marketingStatistics && !jotformLoaded) {
      loadJotFormChatbot()
    } else if (!preferences.marketingStatistics && jotformLoaded) {
      unloadJotFormChatbot()
    }

    updateStatusDisplay()
  }

  function loadJotFormChatbot() {
    console.log("Loading JotForm chatbot...")
    if (!jotformLoaded) {
      jotformScript = document.createElement("script")
      jotformScript.src =
        "https://cdn.jotfor.ms/agent/embedjs/0196f935c8dc73e792f34b9ae501d9dbe1fa/embed.js?skipWelcome=1&maximizable=1"
      jotformScript.async = true
      jotformScript.onload = () => {
        jotformLoaded = true
        console.log("JotForm chatbot loaded successfully")
        updateStatusDisplay()
      }
      jotformScript.onerror = () => {
        console.error("Failed to load JotForm chatbot")
        updateStatusDisplay()
      }
      document.head.appendChild(jotformScript)
    }
  }

  function unloadJotFormChatbot() {
    console.log("Unloading JotForm chatbot...")
    if (jotformLoaded && jotformScript) {
      // Remove the script
      document.head.removeChild(jotformScript)
      jotformScript = null
      jotformLoaded = false

      // Remove any JotForm elements that might have been added to the DOM
      const jotformElements = document.querySelectorAll('[id*="jotform"], [class*="jotform"], [data-jotform]')
      jotformElements.forEach((element) => {
        console.log("Removing JotForm element:", element)
        element.remove()
      })

      // Also check for common JotForm widget containers
      const widgetContainers = document.querySelectorAll(".jf-widget-container, .jf-chat-widget, .jf-agent-widget")
      widgetContainers.forEach((element) => {
        console.log("Removing JotForm widget:", element)
        element.remove()
      })

      console.log("JotForm chatbot unloaded - refreshing page...")
      updateStatusDisplay()

      // Refresh the page after a short delay to ensure complete removal
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  }

  function hideBanner() {
    if (cookieBanner) {
      cookieBanner.classList.add("hidden")
    }
  }

  function clearAllCookies() {
    // Clear our cookie
    document.cookie = "cookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    // Unload chatbot if loaded
    if (jotformLoaded) {
      unloadJotFormChatbot()
    }
  }

  function updateStatusDisplay() {
    const consent = getCookie("cookieConsent")

    if (cookieStatus) {
      if (consent) {
        const preferences = JSON.parse(consent)
        cookieStatus.innerHTML = `
          <h3>Current Cookie Preferences:</h3>
          <ul>
            <li>Necessary: ${preferences.necessary ? "✅" : "❌"} (Always enabled)</li>
            <li>Marketing & Statistics: ${preferences.marketingStatistics ? "✅" : "❌"} (Controls chatbot)</li>
          </ul>
        `
      } else {
        cookieStatus.innerHTML = "<p>No cookie consent found</p>"
      }
    }

    if (chatbotStatus) {
      chatbotStatus.innerHTML = `
        <p><strong>Chatbot Status:</strong> ${jotformLoaded ? "✅ Loaded" : "❌ Not loaded"}</p>
        <p><strong>Script in DOM:</strong> ${document.querySelector('script[src*="jotfor.ms"]') ? "✅ Yes" : "❌ No"}</p>
      `
    }
  }

  function showSuccessMessage() {
    // Create and show a temporary success message
    const message = document.createElement("div")
    message.className = "cookie-success-message"
    message.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1002;
        font-size: 0.875rem;
      ">
        ✓ Cookie-Einstellungen gespeichert
      </div>
    `
    document.body.appendChild(message)

    // Remove message after 3 seconds
    setTimeout(() => {
      if (document.body.contains(message)) {
        document.body.removeChild(message)
      }
    }, 3000)
  }

  // Utility functions
  function setCookie(name, value, days) {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
    console.log("Cookie set:", name, value)
  }

  function getCookie(name) {
    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === " ") c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  // Handle escape key to close modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !cookieModal.classList.contains("hidden")) {
      closeCookieModal()
    }
  })
})