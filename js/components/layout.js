// layout.js - 宣告式布局系統
class Layout {
    static init() {
        this.injectStyles();

        // 處理布局容器
        document.querySelectorAll( '[data-layout]' ).forEach( el => {
            this.apply( el );
        } );

        // 處理所有尺寸屬性（不管有沒有 data-layout）
        document.querySelectorAll( '[data-height], [data-width], [data-flex]' ).forEach( el => {
            this.applySize( el );
        } );
    }

    static applySize( el ) {
        if ( el.dataset.width ) {
            el.style.width = el.dataset.width;
            el.style.flexShrink = '0';
        }
        if ( el.dataset.height ) {
            el.style.height = el.dataset.height;
            el.style.flexShrink = '0';
        }
        if ( el.dataset.flex && el.dataset.flex !== '' ) {
            el.style.flex = isNaN( el.dataset.flex ) ? '1' : el.dataset.flex;
        }
    }

    static injectStyles() {
        if ( document.getElementById( 'layout-styles' ) ) return;

        const css = `
            /* 基礎布局 */
            [data-layout] {
                display: flex;
                box-sizing: border-box;
            }

            [data-layout="horizontal"] {
                flex-direction: row;
            }

            [data-layout="vertical"] {
                flex-direction: column;
            }

            [data-layout="grid"] {
                display: grid;
            }

            /* 填滿容器 */
            [data-fill] {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }

            /* Flex 子元素 */
            [data-flex] {
                flex: 1;
            }

            /* Spacer */
            [data-spacer] {
                flex: 1;
            }

            /* 對齊 */
            [data-align="center"] {
                align-items: center;
            }

            [data-align="start"] {
                align-items: flex-start;
            }

            [data-align="end"] {
                align-items: flex-end;
            }

            [data-align="stretch"] {
                align-items: stretch;
            }

            [data-justify="center"] {
                justify-content: center;
            }

            [data-justify="start"] {
                justify-content: flex-start;
            }

            [data-justify="end"] {
                justify-content: flex-end;
            }

            [data-justify="between"] {
                justify-content: space-between;
            }

            [data-justify="around"] {
                justify-content: space-around;
            }

            /* Wrap */
            [data-wrap] {
                flex-wrap: wrap;
            }
        `;

        const style = document.createElement( 'style' );
        style.id = 'layout-styles';
        style.textContent = css;
        document.head.appendChild( style );
    }

    static apply( el ) {
        const layout = el.dataset.layout;

        // 處理 Grid columns
        if ( layout === 'grid' && el.dataset.cols ) {
            el.style.gridTemplateColumns = `repeat(${ el.dataset.cols }, 1fr)`;
        }

        // 處理 Gap
        if ( el.dataset.gap ) {
            el.style.gap = el.dataset.gap;
        }

        // 處理 Padding
        if ( el.dataset.padding ) {
            el.style.padding = el.dataset.padding;
        }

        // 處理固定尺寸
        if ( el.dataset.width ) {
            el.style.width = el.dataset.width;
            el.style.flexShrink = '0';
        }

        if ( el.dataset.height ) {
            el.style.height = el.dataset.height;
            el.style.flexShrink = '0';
        }

        // 處理 flex 數值
        if ( el.dataset.flex && el.dataset.flex !== '' ) {
            const flexVal = el.dataset.flex;
            el.style.flex = isNaN( flexVal ) ? '1' : flexVal;
        }
    }
}

// 自動初始化
document.addEventListener( 'DOMContentLoaded', () => Layout.init() );