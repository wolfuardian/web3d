document.querySelectorAll('.slider').forEach(slider => {
    const isVertical = slider.closest('.group.vertical') !== null;
    const min = +slider.dataset.min || 0;
    const max = +slider.dataset.max || 100;

    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    slider.appendChild(thumb);

    let dragging = false;

    thumb.onmousedown = () => dragging = true;
    document.onmouseup = () => dragging = false;
    document.onmousemove = (e) => {
        if (!dragging) return;
        const rect = slider.getBoundingClientRect();
        const ratio = isVertical
            ? (e.clientY - rect.top) / rect.height
            : (e.clientX - rect.left) / rect.width;
        const clamped = Math.max(0, Math.min(1, ratio));

        if (isVertical) thumb.style.top = `${clamped * 100}%`;
        else thumb.style.left = `${clamped * 100}%`;

        slider.dataset.value = min + clamped * (max - min);
    };
});