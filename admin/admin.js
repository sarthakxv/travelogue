import { ADMIN_PASSCODE } from "../cities/config.js";

export function initAdminMode(onAdminEnabled) {
  // 1. Inject Admin styles/buttons if not present
  if (!document.getElementById("adminToggleBtn")) {
    const btn = document.createElement("button");
    btn.id = "adminToggleBtn";
    btn.textContent = "Edit";
    btn.className = "admin-toggle-btn";
    document.body.appendChild(btn);

    // 2. Inject Passcode Modal Template
    const modalHTML = `
      <div id="adminPasscodeModal" class="modal-overlay">
        <div class="modal">
          <h2>Admin Access</h2>
          <p>Please enter the passcode to edit.</p>
          <input type="password" id="adminPasscodeInput" placeholder="Passcode">
          <div class="modal-buttons">
            <button id="cancelAdminBtn" class="btn-secondary">Cancel</button>
            <button id="confirmAdminBtn" class="btn-primary">Enter</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById("adminPasscodeModal");
    const input = document.getElementById("adminPasscodeInput");
    const confirmBtn = document.getElementById("confirmAdminBtn");
    const cancelBtn = document.getElementById("cancelAdminBtn");

    const checkPasscode = () => {
      if (input.value === ADMIN_PASSCODE) {
        document.body.classList.add("admin-mode");
        btn.textContent = "Done";
        modal.classList.remove("active");
        if (onAdminEnabled) onAdminEnabled();
      } else {
        alert("Incorrect passcode"); // Keeping basic alert for wrong password to avoid complexity, or could shake input
        input.value = "";
      }
    };

    confirmBtn.onclick = checkPasscode;
    cancelBtn.onclick = () => modal.classList.remove("active");
    
    // Allow Enter key
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") checkPasscode();
    });

    btn.addEventListener("click", () => {
      if (document.body.classList.contains("admin-mode")) {
        // Exit
        document.body.classList.remove("admin-mode");
        btn.textContent = "Edit";
      } else {
        // Open Modal
        modal.classList.add("active");
        input.value = "";
        setTimeout(() => input.focus(), 100);
      }
    });
  }
}
