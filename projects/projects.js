document.addEventListener("DOMContentLoaded", () => {
  // Project tag filtering
  const tagButtons = document.querySelectorAll(".tag-filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  // Check URL parameters for initial filter
  const urlParams = new URLSearchParams(window.location.search)
  const tagParam = urlParams.get("tag")

  if (tagParam) {
    // Find the button that matches the tag parameter
    const matchingButton = document.querySelector(`.tag-filter-btn[data-tag="${tagParam}"]`)
    if (matchingButton) {
      // Remove active class from all buttons
      tagButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to matching button
      matchingButton.classList.add("active")
      // Filter projects
      filterProjects(tagParam)
    } else {
      // If no matching button but we have a tag parameter, filter directly
      filterProjects(tagParam)
    }
  }

  // Scroll to projects section if hash is present
  if (window.location.hash === "#projects-section") {
    setTimeout(() => {
      const projectsSection = document.getElementById("projects-section")
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 300) // Small delay to ensure filtering is complete
  }

  // Add click event to tag buttons
  tagButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tagButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      // Get the tag to filter by
      const filterTag = button.getAttribute("data-tag")

      // Update URL parameter without page reload
      const url = new URL(window.location)
      if (filterTag === "all") {
        url.searchParams.delete("tag")
      } else {
        url.searchParams.set("tag", filterTag)
      }
      // Keep the hash if it exists
      if (window.location.hash) {
        url.hash = window.location.hash
      }
      window.history.pushState({}, "", url)

      // Filter projects
      filterProjects(filterTag)
    })
  })

  // Filter projects function
  function filterProjects(tag) {
    projectCards.forEach((card) => {
      if (tag === "all") {
        // Show all projects
        card.style.display = "block"

        // Add animation class
        setTimeout(() => {
          card.classList.add("show")
        }, 10)
      } else {
        // Get tags for this project
        const cardTags = card.getAttribute("data-tags").split(",")

        // Check if project has the selected tag
        if (cardTags.includes(tag)) {
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