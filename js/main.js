// 配置檔案
const config = {
    version: new Date().getTime(),
    links: [
        { href: 'html/rhythm.html', text: '節奏遊戲', icon: '🎵' },
        { href: 'html/game.html', text: '開始遊戲', icon: '🎮' },
        { href: 'html/3d.html', text: '3D測試', icon: '🎨' }
    ]
};

// 導覽列生成器
class NavigationBuilder {
    constructor(containerId, links, version) {
        this.container = document.getElementById(containerId);
        this.links = links;
        this.version = version;
    }

    build() {
        const nav = document.createElement('ul');
        nav.className = 'nav-list';

        this.links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');

            a.href = `${link.href}?v=${this.version}`;
            a.className = 'nav-link';
            a.innerHTML = `<span class="icon">${link.icon}</span>${link.text}`;

            // 添加平滑過渡效果
            a.addEventListener('mouseenter', this.handleHover);

            li.appendChild(a);
            nav.appendChild(li);
        });

        this.container.appendChild(nav);
    }

    handleHover(e) {
        e.target.style.transform = 'translateX(5px)';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const navBuilder = new NavigationBuilder(
        'main-nav',
        config.links,
        config.version
    );
    navBuilder.build();
});
