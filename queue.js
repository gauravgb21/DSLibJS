export const Queue = function(){
    let size = 0;
    const queue = [...Array(1e3 + 2)];
    let front = 0 , rear = 0;
    
    this.push = function(data){
        queue[rear] = data;
        rear++;
        size++;
    }

    this.pop = function(){
        if(front === rear) throw new Error('Queue is empty !');
        else {
            queue[front] = 0;
            front++;
            size--;
        }
    }

    this.front = function(){
        return queue[front];
    }

    this.isEmpty = function(){
        if(size === 0)return true;
        return false;        
    }

    this.size = function(){
        return size;
    }
}