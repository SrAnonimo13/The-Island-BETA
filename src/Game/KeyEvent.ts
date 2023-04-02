export default class KeyEvent {
    binds: { [key: string]: string };
    keys: { [key: string]: string };

    constructor(binds: { [key: string]: string }) {
        this.keys = {};
        this.binds = binds;

        addEventListener("keydown", (e) => {
            const name = this.getKeyBindName(e.key);

            if(name) this.keys[name] = e.key.toLocaleLowerCase();
        });

        addEventListener("keyup", (e) => {
            const name = this.getKeyBindName(e.key);

            if(name) delete this.keys[name];
        });
    }

    getKeyBindName(key: string) {
        return this.binds[key.toLowerCase()];
    }

    IsPressed(name: string) {
        if(name === 'Any')
            return Object.keys(this.keys).length > 0;
        
        return Object.keys(this.keys).includes(name);
    }
}
