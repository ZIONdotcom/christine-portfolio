
const projects = [
  {
    id: "rutaco",
    number: "01",
    title: "RutaCo",
    year: "2024",
    category: ["Development", "UI/UX"],
    role: "Lead Developer / UI/UX Designer",
    status: "Completed",

    summary:
      "A mobile commuting companion designed to help people navigate unfamiliar routes and make informed public-transport decisions.",

    overview:
      "RutaCo addresses common commuting challenges by bringing route information and public transportation options into one mobile experience. It helps users plan more efficient journeys.",

    contributions: [
      "Designed and implemented core features including location tracking, route optimization, and integration with public-transport data.",
      "Designed interfaces for the mobile application and admin website.",
      "Collaborated with developers to integrate mapping and public-transport APIs."
    ],

    stack: [
      "Flutter", "Dart", "PHP", "JavaScript",
      "MySQL", "Google Maps API"
    ],

    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/ZIONdotcom/capstone"
      },
      {
        label: "Figma Prototype",
        url: "https://www.figma.com/proto/hGsCmkVPDK1DXFpU37ID8s/commuting-app?node-id=1-2&p=f&t=y7zEIBaf8ZAKfZBy-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1"
      }
    ]
  },

  {
    id: "qwait",
    number: "02",
    title: "QWAIT",
    year: "2024",
    category: ["UI/UX", "Development"],
    role: "UI/UX Designer / Backend Developer",
    status: "Completed",

    summary:
      "A virtual queueing and special exam-slip management system designed to streamline student transactions.",

    overview:
      "QWAIT was designed to improve enrollment-related processes and the distribution of special exam slips. The system uses virtual queueing and real-time updates to make the process more transparent.",

    contributions: [
      "Designed wireframes, interfaces, and prototypes.",
      "Collaborated with the team to fix code issues and integrate features.",
      "Distributed tasks and coordinated project milestones."
    ],

    stack: [
      "Figma", "UI/UX Design", "Prototyping",
      "Backend Integration"
    ],

    links: [
      {
        label: "Admin Design",
        url: "https://www.figma.com/design/nmNmvFz6mdhd0gKxnuYHGw/Qwait-ADMIN?m=auto&t=hc2AVCFF46KVfeZY-1"
      },
      {
        label: "Program Head Design",
        url: "https://www.figma.com/design/pW627BpyXDIA5xp2CrshnP/QWAIT-PROGRAM-HEAD?node-id=0-1&node-type=CANVAS&t=tK0l2s2UrJpBPToE-0"
      },
      {
        label: "Queue Department Design",
        url: "https://www.figma.com/design/eWga0g3gDlOkBjwYhPzDYp/Qwait-Queue-Departments?node-id=0-1&node-type=CANVAS&t=1D2Nfk63xVq1CUgh-0"
      },
      {
        label: "Student Design",
        url: "https://www.figma.com/design/ML7CKwuS5D3ux1pHTueeQc/Qwait-Student?m=auto&t=hc2AVCFF46KVfeZY-1"
      }
    ]
  },

  {
    id: "helping-hands",
    number: "03",
    title: "Helping Hands",
    year: "2023–2024",
    category: ["Development"],
    role: "Lead Developer",
    status: "Completed",

    summary:
      "A volunteer-matching application connecting people with organizations and causes.",

    overview:
      "Helping Hands aims to make it easier for volunteers to discover opportunities and connect with organizations. Features include profiles, opportunity listings, messaging, event management, and notifications.",

    contributions: [
      "Designed and implemented core features including user profiles and opportunity posting.",
      "Led the development team, managed technical tasks, and helped resolve issues."
    ],

    stack: [
      "Java", "Android Studio", "Firebase"
    ],

    links: [
      {
        label: "GitHub Repository",
        url: "https://github.com/ZIONdotcom/Helping-Hands"
      }
    ]
  },

  {
    id: "neighborhood-watch",
    number: "04",
    title: "Neighborhood Watch",
    year: "2023",
    category: ["Development"],
    role: "Lead Developer",
    status: "Completed",

    summary:
      "A barangay communication platform intended to keep residents informed about community events and announcements.",

    overview:
      "The Neighborhood Watch Application was developed to improve communication between residents and the barangay council, reducing delays in sharing important information.",

    contributions: [
      "Designed and implemented key features such as event management.",
      "Coordinated with teammates through regular project meetings and task discussions."
    ],

    stack: [
      "Application Development", "Team Leadership"
    ],

    links: []
  }
];

// ELEMENTS

const projectGrid = document.querySelector("#projectGrid");
const searchInput = document.querySelector("#projectSearch");
const dialog = document.querySelector("#projectDialog");
const dialogContent = document.querySelector("#dialogContent");

let activeFilter = "All";

// CREATE HTML ELEMENTS SAFELY

function createElement(tag, className, text) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}

// DISPLAY PROJECTS

function renderProjects() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredProjects = projects.filter(project => {
    const matchesFilter =
      activeFilter === "All" ||
      project.category.includes(activeFilter);

    const searchableText = [
      project.title,
      project.summary,
      project.role,
      project.year,
      ...project.stack
    ].join(" ").toLowerCase();

    return matchesFilter &&
      searchableText.includes(searchTerm);
  });

  projectGrid.replaceChildren();

  if (filteredProjects.length === 0) {
    projectGrid.append(
      createElement("p", "empty-state", "No projects found.")
    );
    return;
  }

  filteredProjects.forEach(project => {
    const card = createElement("article", "project-card");

    const artwork = createElement("div", "project-art");
    const artworkInner = createElement("div", "project-art-inner");

    artworkInner.append(
      createElement("small", "", `PROJECT ${project.number}`),
      createElement("strong", "", project.title)
    );

    artwork.append(artworkInner);

    const meta = createElement("div", "project-meta");
    meta.append(
      createElement("span", "", project.year),
      createElement("span", "", project.category.join(" · "))
    );

    const titleRow = createElement("div", "project-title-row");
    const title = createElement("h3", "", project.title);

    const button = createElement("button", "arrow-link");
    button.type = "button";
    button.setAttribute("aria-label", `View ${project.title} details`);

    button.addEventListener("click", () => {
      showProject(project);
    });

    titleRow.append(title, button);

    card.append(
      artwork,
      meta,
      titleRow,
      createElement("p", "", project.summary),
      createElement("span", "status", project.status)
    );

    card.addEventListener("click", event => {
      if (!event.target.closest("button")) {
        showProject(project);
      }
    });

    projectGrid.append(card);
  });
}

// OPEN PROJECT CASE STUDY

function showProject(project) {
  dialogContent.replaceChildren();

  const body = createElement("div", "dialog-body");

  body.append(
    createElement(
      "p",
      "eyebrow",
      `PROJECT ${project.number} / ${project.year}`
    ),

    createElement("h2", "", project.title),

    createElement(
      "p",
      "",
      `${project.role} · ${project.status}`
    ),

    createElement("div", "detail-label", "PROJECT OVERVIEW"),

    createElement("p", "", project.overview),

    createElement("div", "detail-label", "CONTRIBUTIONS")
  );

  const list = document.createElement("ul");

  project.contributions.forEach(item => {
    list.append(createElement("li", "", item));
  });

  body.append(
    list,
    createElement("div", "detail-label", "TOOLS & TECHNOLOGIES"),
    createElement("p", "", project.stack.join(" · "))
  );

  if (project.links.length > 0) {
    body.append(
      createElement("div", "detail-label", "PROJECT LINKS")
    );

    const linksContainer = createElement("div", "detail-links");

    project.links.forEach(link => {
      const anchor = createElement(
        "a",
        "",
        link.label
      );

      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";

      const arrow = document.createElement("span");
      arrow.className = "external-arrow";
      arrow.setAttribute("aria-hidden", "true");

      anchor.append(" ", arrow);

      linksContainer.append(anchor);
    });

    body.append(linksContainer);
  }

  dialogContent.append(body);
  dialog.showModal();
}

// FILTER BUTTONS

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn === button);
    });

    renderProjects();
  });
});

// SEARCH

searchInput.addEventListener("input", renderProjects);

// CLOSE PROJECT DIALOG

document.querySelector("#dialogClose").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    dialog.close();
  }
});

// LIGHT / DARK MODE

const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("archive-theme");

if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

function updateThemeButton() {
  const isDark =
    document.documentElement.dataset.theme === "dark";

  themeToggle.textContent = isDark ? "☾ Dark" : "☼ Light";
}

themeToggle.addEventListener("click", () => {
  const isDark =
    document.documentElement.dataset.theme === "dark";

  const newTheme = isDark ? "light" : "dark";

  document.documentElement.dataset.theme = newTheme;

  localStorage.setItem("archive-theme", newTheme);

  updateThemeButton();
});

// INITIALIZE

updateThemeButton();
renderProjects();
