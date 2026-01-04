class InputManager {
    constructor() {
        this.keys = {};
        this.activeInputs = []; // 記錄當前幀的輸入

        // 註冊鍵盤事件
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(event) {

        console.log(event.code);

        if (!this.keys[event.code]) {
            this.keys[event.code] = true;
            this.activeInputs.push({
                key: event.code,
                timestamp: performance.now() // 記錄精確時間
            });
        }
    }

    onKeyUp(event) {

        console.log(event.code);

        this.keys[event.code] = false;
    }

    getInputsThisFrame() {
        const inputs = [...this.activeInputs];
        this.activeInputs = []; // 清空當前幀輸入
        return inputs;
    }
}

export { InputManager };
