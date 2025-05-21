document.addEventListener("DOMContentLoaded", () => {
  // Events season filtering
  const seasonButtons = document.querySelectorAll(".sidebar-button")
  const pastEventCards = document.querySelectorAll(".past-event[data-season]")

  // Check URL parameters for initial filter
  const urlParams = new URLSearchParams(window.location.search)
  const seasonParam = urlParams.get("season")

  if (seasonParam) {
    // Find the button that matches the season parameter
    const matchingButton = document.querySelector(`.sidebar-button[data-season="${seasonParam}"]`)
    if (matchingButton) {
      // Remove active class from all buttons
      seasonButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to matching button
      matchingButton.classList.add("active")
      // Filter events
      filterPastEvents(seasonParam)
    }
  }

  // Scroll to past events section if hash is present
  if (window.location.hash === "#past-events-section") {
    setTimeout(() => {
      const pastEventsSection = document.getElementById("past-events-section")
      if (pastEventsSection) {
        pastEventsSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 300) // Small delay to ensure filtering is complete
  }

  // Add click event to season buttons
  seasonButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      seasonButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get the season to filter by
      const filterSeason = button.getAttribute("data-season")

      // Update URL parameter without page reload
      const url = new URL(window.location)
      if (filterSeason === "all") {
        url.searchParams.delete("season")
      } else {
        url.searchParams.set("season", filterSeason)
      }
      // Keep the hash if it exists
      if (window.location.hash) {
        url.hash = window.location.hash
      }
      window.history.pushState({}, "", url)

      // Filter past events only
      filterPastEvents(filterSeason)
    })
  })

  // Filter past events function
  function filterPastEvents(season) {
    pastEventCards.forEach((card) => {
      if (season === "all") {
        // Show all past events
        card.style.display = "block"

        // Add animation class
        setTimeout(() => {
          card.classList.add("show")
        }, 10)
      } else {
        // Get season for this event
        const cardSeason = card.getAttribute("data-season")

        // Check if event matches the selected season
        if (cardSeason === season) {
          card.style.display = "block"

          // Add animation class
          setTimeout(() => {
            card.classList.add("show")
          }, 10)
        } else {
          // Remove animation class first
          card.classList.remove("show")

          // Then hide after animation completes
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      }
    })
  }
})