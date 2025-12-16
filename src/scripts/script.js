const rects = [
    { id: 'rect1', baseHeight: 78.81, baseY: 434.59 },
    { id: 'rect2', baseHeight: 194.89, baseY: 180.67 },
    { id: 'rect3', baseHeight: 117.67, baseY: 140.16 },
    { id: 'rect4', baseHeight: 244.44, baseY: 15.29 },
    { id: 'rect5', baseHeight: 140.99, baseY: 230.32 },
    { id: 'rect6', baseHeight: 125.15, baseY: 411.41 }
];
let paused = false;
let animationId;
let bassHitCounter = 0;
let hoveredRectId = null;

// store frozen state
let frozenStates = {};

// Hip-hop bass pattern
const bassPattern = [
    { time: 0, intensity: 1.0 },
    { time: 0.3, intensity: 0.7 },
    { time: 0.6, intensity: 0.4 },
    { time: 0.8, intensity: 0.8 },
    { time: 1.0, intensity: 1.2 },
    { time: 1.2, intensity: 0.3 },
    { time: 1.5, intensity: 0.9 },
    { time: 1.8, intensity: 0.5 },
    { time: 2.0, intensity: 1.5 },
    { time: 2.1, intensity: 1.3 },
    { time: 2.3, intensity: 0.6 },
    { time: 2.6, intensity: 0.2 },
    { time: 3.0, intensity: 1.8 },
    { time: 3.2, intensity: 0.4 },
    { time: 3.5, intensity: 1.0 },
    { time: 3.8, intensity: 0.7 }
];

function getBassIntensity(time) {
    const cycleTime = time % 2.0;
    let prevHit = bassPattern[bassPattern.length - 1];
    let nextHit = bassPattern[0];

    for (let i = 0; i < bassPattern.length; i++) {
        if (bassPattern[i].time <= cycleTime) {
            prevHit = bassPattern[i];
        } else {
            nextHit = bassPattern[i];
            break;
        }
    }
    const timeSinceHit = cycleTime - prevHit.time;
    const decayFactor = Math.max(0, Math.exp(-timeSinceHit * 8));
    return prevHit.intensity * decayFactor + 0.4;
}

function triggerBassFlash() {
    rects.forEach(r => {
        const rect = document.getElementById(r.id);
        if (rect) {
            rect.classList.remove('bass-hit');
            void rect.offsetWidth;
            rect.classList.add('bass-hit');
        }
    });
}

function setRectHeight(rect, rectData, newHeight) {
    let newY;
    if (rectData.baseY < 0) {
        if (rectData.id === 'rect6') {
            const heightDiff = rectData.baseHeight - newHeight;
            newY = rectData.baseY + heightDiff;
        } else {
            newY = rectData.baseY;
        }
    } else {
        if (rectData.id === 'rect1') {
            newY = rectData.baseY;
        } else {
            const heightDiff = rectData.baseHeight - newHeight;
            newY = rectData.baseY + heightDiff;
        }
    }
    rect.setAttribute('height', newHeight);
    rect.setAttribute('y', newY);
    // update frozen state when animating
    if (!paused) {
        frozenStates[rectData.id] = { height: newHeight, y: newY };
    }
}

function animate() {

    // if (paused) {
    //   rects.forEach((rectData) => {
    //     const rect = document.getElementById(rectData.id);
    //     if (!rect) return;
    //     const frozen = frozenStates[rectData.id] || { height: rectData.baseHeight, y: rectData.baseY };
    //     // if hovered, scale from frozen height
    //     if (hoveredRectId === rectData.id) {
    //       const newHeight = frozen.height * 1.1;
    //       setRectHeight(rect, rectData, newHeight);
    //     } else {
    //       rect.setAttribute('height', frozen.height);
    //       rect.setAttribute('y', frozen.y);
    //     }
    //   });
    //   animationId = requestAnimationFrame(animate);
    //   return;
    // }

    if (paused) {
        // Reset all rectangles to their original state when paused
        rects.forEach((rectData) => {
            const rect = document.getElementById(rectData.id);
            if (!rect) return;

            // If hovered, scale from base height

            if (hoveredRectId === rectData.id) {
                const newHeight = rectData.baseHeight * 1.1;
                setRectHeight(rect, rectData, newHeight);
            } else {
                // Reset to original base state
                rect.setAttribute('height', rectData.baseHeight);
                rect.setAttribute('y', rectData.baseY);
            }
        });
        animationId = requestAnimationFrame(animate);
        return;
    }

    const time = Date.now() * 0.001;
    const bassIntensity = getBassIntensity(time);

    if (bassIntensity > 1.0 && bassHitCounter % 10 === 0) {
        triggerBassFlash();
    }
    bassHitCounter++;
    const scaleMultiplier = 1 + (bassIntensity * 0.4);
    rects.forEach((rectData) => {
        const rect = document.getElementById(rectData.id);
        if (rect) {
            const newHeight = rectData.baseHeight * scaleMultiplier;
            setRectHeight(rect, rectData, newHeight);
        }

    });
    animationId = requestAnimationFrame(animate);
}

// Start animation
animate();

// === Hover events ===
const svg = document.getElementById('animatedLogo');
const texts = document.querySelectorAll('.main-text');

// Pause + show all texts on svg hover

svg.addEventListener('mouseenter', () => {

    if (logoLocked) return; // disable hover when locked
    paused = true;
    texts.forEach(t => t.classList.add('visible'));
});

svg.addEventListener('mouseleave', () => {
    if (logoLocked) return; // disable hover when locked
    paused = false;
    hoveredRectId = null;
    texts.forEach(t => t.classList.remove('visible'));
});

// Track which rect is hovered
rects.forEach(r => {
    const rectEl = document.getElementById(r.id);
    if (rectEl) {
        rectEl.addEventListener('mouseenter', () => {
            if (paused && !logoLocked) hoveredRectId = r.id;
        });
        rectEl.addEventListener('mouseleave', () => {
            if (paused && !logoLocked) hoveredRectId = null;
        });
    }
});

// Remove bass-hit class after animation
document.addEventListener('animationend', (e) => {
    if (e.target.classList.contains('bass-hit')) {
        e.target.classList.remove('bass-hit');
    }
});
