

export class Cell{

    private x;
    private y: number;
    private size: number;
    private name: string;

    constructor(x: number,y:number,size:number,name: string){
        this.x = x;
        this.y = y;
        this.size = size;
        this.name = name;
    }

    move(direction: string){
        switch(direction){
            case "up":{
                this.y-=3;
                this.y-=3;
            }
            case "down":{
                this.y+=3;
            }
            case "left":{
                this.x-=3;
                this.x-=3;
            }
            case "right":{
                this.x+=3;
            }
        }
    }

    getX() {
        return this.x
    }

    getY() {
        return this.y
    }

    getSize() {
        return this.size;
    }

    getName(){
        return this.name;
    }

}