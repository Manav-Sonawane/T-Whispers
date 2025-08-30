// Modal handling
const modal = document.getElementById("confessionModal");

function openConfessionModal() {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeConfessionModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Restore scrolling
  document.getElementById("confessionText").value = ""; // Clear the textarea
}

// Close modal when clicking outside of it
window.onclick = function (event) {
  if (event.target === modal) {
    closeConfessionModal();
  }
};

// Handle confession submission
async function submitConfession() {
  const confessionText = document.getElementById("confessionText").value.trim();

  if (!confessionText) {
    alert("Please write something before submitting.");
    return;
  }

  try {
    const response = await fetch("/confessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: confessionText,
      }),
    });

    if (response.ok) {
      closeConfessionModal();
      // Reload the page to show the new confession
      window.location.reload();
    } else {
      alert("Failed to submit confession. Please try again.");
    }
  } catch (error) {
    console.error("Error submitting confession:", error);
    alert("An error occurred. Please try again.");
  }
}

// Handle like button clicks
document.querySelectorAll(".like-btn").forEach((button) => {
  button.addEventListener("click", async function () {
    const confessionCard = this.closest(".confession-card");
    const likeCount = confessionCard.querySelector(".like-count");

    try {
      // Add animation
      this.style.transform = "scale(1.3)";
      setTimeout(() => (this.style.transform = "scale(1)"), 200);

      // Update like count (this is a placeholder - you'll need to implement the actual API call)
      const currentCount = parseInt(likeCount.textContent);
      likeCount.textContent = currentCount + 1;
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  });
});
