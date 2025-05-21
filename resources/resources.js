document.addEventListener("DOMContentLoaded", () => {
  // Difficulty level filtering
  const difficultyButtons = document.querySelectorAll(".difficulty-filter-btn")
  const resourceCards = document.querySelectorAll(".resources-grid .card[data-difficulty]")

  // Add click event to difficulty buttons
  difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      difficultyButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get the difficulty to filter by
      const filterDifficulty = button.getAttribute("data-difficulty")

      // Filter resources
      filterResources(filterDifficulty)
    })
  })

  // Filter resources function
  function filterResources(difficulty) {
    resourceCards.forEach((card) => {
      if (difficulty === "all") {
        // Show all resources
        card.style.display = "block"

        // Add animation class
        setTimeout(() => {
          card.classList.add("show")
        }, 10)
      } else {
        // Get difficulty for this resource
        const cardDifficulty = card.getAttribute("data-difficulty")

        // Check if resource matches the selected difficulty
        if (cardDifficulty === difficulty) {
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

  // Get all category cards
  const categoryCards = document.querySelectorAll(".category-card")
  const categoryContentSection = document.getElementById("category-content")
  const categoryTitle = document.getElementById("category-title")
  const categoryDescription = document.getElementById("category-description")
  const allCategoryContents = document.querySelectorAll(".category-content")

  // Check URL parameters for initial category
  const urlParams = new URLSearchParams(window.location.search)
  const categoryParam = urlParams.get("category")

  if (categoryParam) {
    // Find the card that matches the category parameter
    const matchingCard = document.querySelector(`.category-card[data-category="${categoryParam}"]`)
    if (matchingCard) {
      // Show the category content
      showCategoryContent(categoryParam)

      // Add active class to the card
      categoryCards.forEach((card) => card.classList.remove("active"))
      matchingCard.classList.add("active")

      // Scroll to the content section
      setTimeout(() => {
        categoryContentSection.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  // Add click event to category cards
  categoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Get the category
      const category = card.getAttribute("data-category")

      // Update URL parameter without page reload
      const url = new URL(window.location)
      url.searchParams.set("category", category)
      window.history.pushState({}, "", url)

      // Remove active class from all cards
      categoryCards.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked card
      card.classList.add("active")

      // Show the category content
      showCategoryContent(category)

      // Scroll to the content section
      categoryContentSection.scrollIntoView({ behavior: "smooth" })
    })
  })

  // Function to show category content
  function showCategoryContent(category) {
    // Update the title and description
    const categoryData = getCategoryData(category)
    categoryTitle.textContent = categoryData.title
    categoryDescription.textContent = categoryData.description

    // Hide all category contents
    allCategoryContents.forEach((content) => {
      content.classList.add("hidden")
    })

    // Show the selected category content
    const selectedContent = document.getElementById(`${category}-content`)
    if (selectedContent) {
      // Show the content section
      categoryContentSection.classList.remove("hidden")

      // Show the specific category content
      selectedContent.classList.remove("hidden")
    }
  }

  // Function to get category data
  function getCategoryData(category) {
    const categoryMap = {
      general: {
        title: "General",
        description: "Introductory materials and overview resources",
      },
      economics: {
        title: "Economics",
        description: "Resources on economic theory, policy, and macroeconomic analysis",
      },
      finance: {
        title: "Finance",
        description: "Materials on financial markets, instruments, and corporate finance",
      },
      quantitative: {
        title: "Quantitative",
        description: "Advanced quantitative methods and models for data analysis",
      },
      platform: {
        title: "Platform",
        description: "Data platforms, financial software, and analytical tools",
      },
      coding: {
        title: "Coding",
        description: "Programming resources for financial applications and algorithms",
      },
      "data-source": {
        title: "Data Source",
        description: "Data providers, APIs, and datasets for research",
      },
      "math-stat": {
        title: "Math & Statistics",
        description: "Mathematical and statistical foundations",
      },
      "ai-ml": {
        title: "AI/ML",
        description: "Artificial intelligence and machine learning applications",
      },
    }

    return (
      categoryMap[category] || {
        title: "Resources",
        description: "Browse our collection of resources.",
      }
    )
  }
})