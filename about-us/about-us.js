document.addEventListener("DOMContentLoaded", () => {
  // Get all team cards and team member sections
  const teamCards = document.querySelectorAll(".team-card")
  const teamMembersSections = document.querySelectorAll(".team-members-section")

  // Add click event to team cards
  teamCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Get the team name from the data attribute
      const teamName = card.getAttribute("data-team")

      // Get the corresponding team members section
      const teamMembersSection = document.getElementById(`team-${teamName}-members`)

      // Check if the card is already active
      const isActive = card.classList.contains("active")

      // Remove active class from all cards
      teamCards.forEach((c) => c.classList.remove("active"))

      // Hide all team members sections
      teamMembersSections.forEach((section) => {
        section.classList.add("hidden")
      })

      // If the card wasn't active before, make it active and show its members section
      if (!isActive) {
        card.classList.add("active")
        teamMembersSection.classList.remove("hidden")

        // Scroll to the team members section
        setTimeout(() => {
          teamMembersSection.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }, 100)
      }
    })
  })

  // Get all faculty categories and faculty members sections
  const facultyCategories = document.querySelectorAll(".faculty-category")
  const facultyMembersSections = document.querySelectorAll(".faculty-members-section")

  // Add click event to faculty categories
  facultyCategories.forEach((category) => {
    category.addEventListener("click", () => {
      // Get the category name from the data attribute
      const categoryName = category.getAttribute("data-category")

      // Get the corresponding faculty members section
      const facultyMembersSection = document.getElementById(`${categoryName}-faculty`)

      // Check if the category is already active
      const isActive = category.classList.contains("active")

      // Remove active class from all categories
      facultyCategories.forEach((c) => c.classList.remove("active"))

      // Hide all faculty members sections
      facultyMembersSections.forEach((section) => {
        section.classList.add("hidden")
      })

      // If the category wasn't active before, make it active and show its members section
      if (!isActive) {
        category.classList.add("active")
        facultyMembersSection.classList.remove("hidden")

        // Scroll to the faculty members section
        setTimeout(() => {
          facultyMembersSection.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }, 100)
      }
    })
  })

  // Check URL parameters for initial team
  const urlParams = new URLSearchParams(window.location.search)
  const teamParam = urlParams.get("team")

  if (teamParam) {
    // Find the card that matches the team parameter
    const matchingCard = document.querySelector(`.team-card[data-team="${teamParam}"]`)
    if (matchingCard) {
      // Simulate a click on the matching card
      matchingCard.click()
    }
  }

  // Check URL parameters for initial category
  const categoryParam = urlParams.get("category")

  if (categoryParam) {
    // Find the category that matches the category parameter
    const matchingCategory = document.querySelector(`.faculty-category[data-category="${categoryParam}"]`)
    if (matchingCategory) {
      // Simulate a click on the matching category
      matchingCategory.click()
    }
  }
})