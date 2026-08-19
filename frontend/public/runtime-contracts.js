// Runtime interaction contract kept outside React only until radial V1 locks.
// Deep Space intentionally delays pointer exit so the gesture that enters it
// cannot immediately close it. Keyboard Escape must not inherit that delay.
const exitDeepSpaceOnEscape = (event) => {
  if (event.key !== 'Escape') return;
  if (!document.querySelector('.app.is-deep')) return;

  history.replaceState({}, '', '/');
  dispatchEvent(new PopStateEvent('popstate'));
};

addEventListener('keydown', exitDeepSpaceOnEscape, { capture: true });
