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
        if(this.binds){
            if(name in this.binds){
                if(this.binds[name] in this.keys) return true
            }else switch(name){
                case "allBinds":
                case 0:
                    for(let i = 0; i < Object.keys(this.keys).length; i++){
                        for(let j in this.binds){
                            if(Object.keys(this.keys)[i] == this.binds[j]){
                                return true
                            }else if(i >= Object.keys(this.keys).length){
                                return false
                            }
    
                        }
                    }
                    break;
            }
        }else{
            if(name in this.keys)
                return true
            else
                return false
        }
    }
}