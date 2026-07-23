const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

let chart;

// FETCH ALL DATA
function fetchAll() {
  fetchStatus();
  fetchActivity();
  document.getElementById("last-updated").innerText =
    "Last updated: " + new Date().toLocaleTimeString();
}

// LOGOUT
function handleLogout() {
  localStorage.clear();
  window.location.href = "login.html";
}

// STATUS SUMMARY
function fetchStatus() {
  fetch("http://localhost:3000/metrics/status-summary", {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("status-summary");
      container.innerHTML = "";

      const colors = {
        SUCCESS: "success",
        FAILED: "failed",
        UNKNOWN: "unknown"
      };

      Object.keys(data).forEach(key => {
        const card = document.createElement("div");
        card.className = `status-card ${colors[key]}`;

        card.innerHTML = `
          <div class="status-card-header">
            <span class="status-label">${key}</span>
            <div class="status-icon">⚙️</div>
          </div>
          <div class="status-count">${data[key]}</div>
          <div class="status-meta">Total workflows</div>
        `;

        container.appendChild(card);
      });

      renderChart(data);
    });
}

// CHART
function renderChart(data) {
  const ctx = document.getElementById("statusChart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: ["#22c55e", "#ef4444", "#94a3b8"]
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      }
    }
  });

  renderLegend(data);
}

// LEGEND
function renderLegend(data) {
  const legend = document.getElementById("chart-legend");
  legend.innerHTML = "";

  const colors = ["#22c55e", "#ef4444", "#94a3b8"];

  Object.keys(data).forEach((key, index) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    item.innerHTML = `
      <div class="legend-label">
        <span class="legend-dot" style="background:${colors[index]}"></span>
        ${key}
      </div>
      <div class="legend-value">${data[key]}</div>
    `;

    legend.appendChild(item);
  });
}

// ACTIVITY
function fetchActivity() {
  fetch("http://localhost:3000/metrics/recent-activity", {
    headers: { Authorization: token }
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("activity-list");
      list.innerHTML = "";

      document.getElementById("activity-count").innerText =
        data.length + " items";

      if (data.length === 0) {
        list.innerHTML = `<div class="empty-state">No activity found</div>`;
        return;
      }

      data.forEach(item => {
        const li = document.createElement("li");
        li.className = "activity-item";

        const status = item.status || "UNKNOWN";

        li.innerHTML = `
          <div class="activity-badge ${status.toLowerCase()}">
            ${status}
          </div>
          <div class="activity-content">
            <div class="activity-name">${item.action}</div>
            <div class="activity-time">
              ${new Date(item.created_at).toLocaleString()}
            </div>
          </div>
        `;

        list.appendChild(li);
      });
    });
}

// INITIAL LOAD
fetchAll();