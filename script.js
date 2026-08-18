const yearNode = document.querySelector("#year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".section, .hero-card, .project-card, .skill-card, .featured-project-card");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const repoContainer = document.querySelector("#github-repos");

const escapeHTML = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

async function loadGitHubProjects() {
  if (!repoContainer) {
    return;
  }

  repoContainer.innerHTML = '<div class="repo-loading">Loading GitHub projects...</div>';
  const cacheKey = "github_repos_cache";
  const cacheDuration = 3600 * 1000; // 1 hour

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < cacheDuration) {
        renderProjects(data);
        return;
      }
    }

    const response = await fetch("https://api.github.com/users/prk-adi/repos?per_page=8&sort=updated");

    if (!response.ok) {
      throw new Error("Unable to load repositories.");
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories) || repositories.length === 0) {
      throw new Error("No repositories found.");
    }

    const featuredProjects = repositories
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6);

    if (featuredProjects.length === 0) {
      throw new Error("No featured repositories available.");
    }

    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data: featuredProjects,
    }));

    renderProjects(featuredProjects);
  } catch (error) {
    repoContainer.innerHTML = `
      <article class="project-card empty-state">
        <h3>GitHub projects are temporarily unavailable</h3>
        <p>You can still explore the profile directly for recent work and repositories.</p>
        <p><a class="inline-link" href="https://github.com/prk-adi" target="_blank" rel="noreferrer">Open GitHub Profile</a></p>
      </article>
    `;
  }
}

function renderProjects(projects) {
  if (!repoContainer) return;
  repoContainer.innerHTML = "";

  projects.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const topics = (repo.topics || [])
      .slice(0, 4)
      .map((topic) => `<span class="topic-pill">${escapeHTML(topic)}</span>`)
      .join("");

    card.innerHTML = `
      <div class="project-tag">${escapeHTML(repo.language || "Project")}</div>
      <h3>${escapeHTML(repo.name)}</h3>
      <p>${escapeHTML(repo.description || "A public project shared on GitHub.")}</p>
      <div class="repo-meta">
        <span>${repo.stargazers_count} stars</span>
        <span>${repo.forks_count} forks</span>
      </div>
      <div class="topic-list">${topics}</div>
      <p>
        <a class="inline-link" href="${repo.html_url}" target="_blank" rel="noreferrer">Open on GitHub</a>
      </p>
    `;

    repoContainer.appendChild(card);
  });
}

function scheduleGitHubProjectsLoad() {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(loadGitHubProjects, { timeout: 1800 });
    return;
  }

  window.setTimeout(loadGitHubProjects, 700);
}

scheduleGitHubProjectsLoad();
