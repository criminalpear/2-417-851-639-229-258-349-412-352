// Ensure GM is globally accessible and initialized once
window.GM = null;

window.requestAnimationFrame(function () {
  window.GM = new GameManager(9, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});
