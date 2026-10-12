import styles from "./motion-lab.module.css";

export function MotionLabPoster() {
  return (
    <svg className={styles.posterArt} viewBox="0 0 800 700" role="img" aria-labelledby="poster-title poster-desc">
      <title id="poster-title">A sculptural system form</title>
      <desc id="poster-desc">A static bronze and graphite form made from a folded central loop and fine orbital line.</desc>
      <defs>
        <linearGradient id="poster-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d8b68a" />
          <stop offset="0.36" stopColor="#725039" />
          <stop offset="0.68" stopColor="#c39a69" />
          <stop offset="1" stopColor="#38281f" />
        </linearGradient>
        <linearGradient id="poster-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d7b88f" stopOpacity="0.12" />
          <stop offset="0.5" stopColor="#e7c69c" stopOpacity="0.8" />
          <stop offset="1" stopColor="#d7b88f" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="poster-core" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#a77c52" />
          <stop offset="0.55" stopColor="#352920" />
          <stop offset="1" stopColor="#121416" />
        </radialGradient>
      </defs>
      <ellipse cx="404" cy="355" rx="218" ry="238" fill="none" stroke="url(#poster-line)" strokeWidth="2" transform="rotate(31 404 355)" />
      <path d="M208 383 C150 221 246 128 364 205 C444 257 507 399 599 421 C690 442 665 550 563 547 C472 544 434 434 341 442 C266 448 215 539 170 490 C130 446 182 411 208 383Z" fill="none" stroke="url(#poster-metal)" strokeWidth="42" strokeLinecap="round" />
      <path d="M210 382 C153 223 248 132 365 207 C445 258 506 398 599 420" fill="none" stroke="#f0d0a7" strokeOpacity=".54" strokeWidth="2" />
      <ellipse cx="401" cy="357" rx="84" ry="106" fill="url(#poster-core)" stroke="#bb9165" strokeOpacity=".55" strokeWidth="2" />
      <path d="M333 323 C364 294 435 294 468 326" fill="none" stroke="#dfb486" strokeOpacity=".42" strokeWidth="2" />
      <circle cx="402" cy="355" r="4" fill="#efd1a9" />
    </svg>
  );
}
