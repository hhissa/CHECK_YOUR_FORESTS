export function splashScreen() {
  function showScreen(id: string) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id)?.classList.add('active');
  }

  showScreen('splash-screen');
  setTimeout(() => showScreen('selection-screen'), 5000);
  setTimeout(() => window.location.href = 'selection_page.html', 5000);
}

splashScreen();
