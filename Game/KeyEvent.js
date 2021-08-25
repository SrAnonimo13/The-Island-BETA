export default class KeyEvent{
    constructor(binds){
        this.binds = binds
        this.keys = {}

        addEventListener('keydown', e => {
            this.keys[e.key] = e.key
        })

        addEventListener('keyup', e => {
            delete this.keys[e.key]
        })
    }

    IsPressed(name){
        if(name in this.binds){
            if(this.binds[name] in this.keys) return true
        }else switch(name){
            case "allBinds":
            case 0:
                for(let i = 0; i < Object.keys(this.keys).length; i++){
                    let value = Object.keys(this.keys)[i]
                    if(value){
                        return true
                    }else if(i >= Object.keys(this.keys).length){
                        return false
                    }
                }
                break;
        }
    }
}