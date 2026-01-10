// timeline.js
class Timeline {
    constructor(options = {}) {
        this.container = options.container;
        this.height = options.height || '10%';
        this.bottom = options.bottom || '0';

        this.injectStyles();
        this.render();
    }

    injectStyles() {
        if (document.getElementById('timeline-styles')) return;

        const css = `
            .tl-wrap {
                position: absolute;
                left: 0;
                right: 0;
                background: #252525;
                font-family: -apple-system, sans-serif;
                font-size: 12px;
                color: #999;
            }
            .tl-header {
                position: absolute;
                background: #2d2d2d;
                border-bottom: 1px solid #1a1a1a;
                left: 0;
                right: 0;
                top: 0;
                height: 28px;
                display: flex;
                align-items: center;
                padding: 0 10px;
                box-sizing: border-box;
            }
            .tl-panel {
                position: absolute;
                inset: 0;
                opacity: 0.3;
                left: 0;
                right: 0;
                top: 29px;
                bottom: 0;
            }
            .tl-panel::before {
                position: absolute;
                inset: 0;
                opacity: 0.3;
                pointer-events: none;
                z-index: 9999;
            }
        `;

        const style = document.createElement('style');
        style.id = 'timeline-styles';
        style.textContent = css;
        document.head.appendChild(style);
    }

    render() {
        const wrap = document.createElement('div');
        wrap.className = 'tl-wrap';
        wrap.style.height = this.height;
        wrap.style.bottom = this.bottom;

        wrap.innerHTML = `
            <div class="tl-header">Timeline</div>
            <div class="tl-panel"></div>
        `;

        this.container.appendChild(wrap);
        this.element = wrap;
    }
}

// 自動初始化
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-timeline]').forEach(el => {
        new Timeline({
            container: el,
            height: el.dataset.height || '10%',
            bottom: el.dataset.bottom || '0'
        });
    });
});