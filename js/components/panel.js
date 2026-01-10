// panel.js - 面板組件系統
class Panel {
    static init() {
        this.injectStyles();
        document.querySelectorAll( '[data-panel]' ).forEach( el => {
            new Panel( el );
        } );
    }

    static injectStyles() {
        if ( document.getElementById( 'panel-styles' ) ) return;

        const css = `
            /* 面板容器 */
            [data-panel] {
                display: flex;
                flex-direction: column;
                background: #212121;
                border: 1px solid #1a1a1a;
                border-radius: 4px;
                overflow: hidden;
                box-sizing: border-box;
            }

            /* 面板標題列 */
            .panel-header {
                display: flex;
                align-items: center;
                height: 32px;
                padding: 0 12px;
                background: #2d2d2d;
                border-bottom: 1px solid #1a1a1a;
                flex-shrink: 0;
                gap: 8px;
            }

            .panel-title {
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 12px;
                font-weight: 500;
                color: #ccc;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .panel-toolbar {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-left: auto;
            }

            .panel-btn {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                background: transparent;
                border: none;
                border-radius: 3px;
                color: #888;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.15s, color 0.15s;
            }

            .panel-btn:hover {
                background: #3a3a3a;
                color: #ccc;
            }

            .panel-btn:active {
                background: #444;
            }

            /* 面板內容區 */
            .panel-content {
                flex: 1;
                overflow: auto;
                padding: 12px;
            }

            .panel-content::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            .panel-content::-webkit-scrollbar-track {
                background: #1a1a1a;
            }

            .panel-content::-webkit-scrollbar-thumb {
                background: #3a3a3a;
                border-radius: 4px;
            }

            .panel-content::-webkit-scrollbar-thumb:hover {
                background: #4a4a4a;
            }

            /* 摺疊狀態 */
            [data-panel].collapsed .panel-content {
                display: none;
            }

            [data-panel].collapsed {
                height: auto !important;
            }

            [data-panel].collapsed .panel-btn-collapse {
                transform: rotate(-90deg);
            }

            /* 可縮放 */
            [data-panel][data-resizable] {
                resize: vertical;
                min-height: 80px;
            }

            /* Group 內部分組 */
            [data-group] {
                margin-bottom: 16px;
            }

            [data-group]:last-child {
                margin-bottom: 0;
            }

            .group-title {
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                font-size: 11px;
                font-weight: 600;
                color: #888;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
                padding-bottom: 4px;
                border-bottom: 1px solid #2a2a2a;
            }

            [data-group][collapsible] .group-title {
                cursor: pointer;
                user-select: none;
            }

            [data-group][collapsible] .group-title:hover {
                color: #aaa;
            }

            [data-group][collapsible] .group-title::before {
                content: '▼';
                display: inline-block;
                margin-right: 6px;
                font-size: 8px;
                transition: transform 0.2s;
            }

            [data-group].collapsed .group-title::before {
                transform: rotate(-90deg);
            }

            [data-group].collapsed .group-content {
                display: none;
            }
        `;

        const style = document.createElement( 'style' );
        style.id = 'panel-styles';
        style.textContent = css;
        document.head.appendChild( style );
    }

    constructor( el ) {
        this.el = el;
        this.title = el.dataset.panel || el.getAttribute( 'title' ) || '';
        this.collapsible = el.hasAttribute( 'collapsible' );
        this.collapsed = el.hasAttribute( 'collapsed' );
        this.hasToolbar = el.hasAttribute( 'data-toolbar' );

        this.render();
        this.initGroups();
    }

    render() {
        // 保存原本的內容
        const originalContent = this.el.innerHTML;

        // 提取 toolbar slot
        let toolbarContent = '';
        if ( this.hasToolbar ) {
            const toolbarSlot = this.el.querySelector( 'template[data-slot="toolbar"]' );
            if ( toolbarSlot ) {
                toolbarContent = toolbarSlot.innerHTML;
            }
        }

        // 建構面板結構
        this.el.innerHTML = `
            <div class="panel-header">
                <span class="panel-title">${ this.title }</span>
                ${ this.hasToolbar ? `<div class="panel-toolbar">${ toolbarContent }</div>` : '' }
                ${ this.collapsible ? `
                    <button class="panel-btn panel-btn-collapse" title="摺疊">
                        ▼
                    </button>
                ` : '' }
            </div>
            <div class="panel-content">
                ${ originalContent.replace( /<template[^>]*>[\s\S]*?<\/template>/gi, '' ) }
            </div>
        `;

        // 綁定摺疊事件
        if ( this.collapsible ) {
            const collapseBtn = this.el.querySelector( '.panel-btn-collapse' );
            collapseBtn.addEventListener( 'click', () => this.toggle() );
        }

        // 套用初始狀態
        if ( this.collapsed ) {
            this.el.classList.add( 'collapsed' );
        }

        // 處理尺寸
        if ( this.el.dataset.width ) {
            this.el.style.width = this.el.dataset.width;
            this.el.style.flexShrink = '0';
        }

        if ( this.el.dataset.height ) {
            this.el.style.height = this.el.dataset.height;
            this.el.style.flexShrink = '0';
        }
    }

    initGroups() {
        this.el.querySelectorAll( '[data-group]' ).forEach( group => {
            const title = group.dataset.group || group.getAttribute( 'title' ) || '';
            const isCollapsible = group.hasAttribute( 'collapsible' );
            const content = group.innerHTML;

            group.innerHTML = `
                <div class="group-title">${ title }</div>
                <div class="group-content">${ content }</div>
            `;

            if ( isCollapsible ) {
                const titleEl = group.querySelector( '.group-title' );
                titleEl.addEventListener( 'click', () => {
                    group.classList.toggle( 'collapsed' );
                } );
            }
        } );
    }

    toggle() {
        this.collapsed = ! this.collapsed;
        this.el.classList.toggle( 'collapsed', this.collapsed );
    }

    expand() {
        this.collapsed = false;
        this.el.classList.remove( 'collapsed' );
    }

    collapse() {
        this.collapsed = true;
        this.el.classList.add( 'collapsed' );
    }
}

// 自動初始化
document.addEventListener( 'DOMContentLoaded', () => Panel.init() );