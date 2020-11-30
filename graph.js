// function Queue(){
//     let size = 0;
//     const queue = [...Array(1e3 + 2)];
//     let front = 0 , rear = 0;
    
//     this.push = function(data){
//         queue[rear] = data;
//         rear++;
//         size++;
//     }

//     this.pop = function(){
//         if(front === rear) throw new Error('Queue is empty !');
//         else {
//             queue[front] = 0;
//             front++;
//             size--;
//         }
//     }

//     this.front = function(){
//         return queue[front];
//     }

//     this.isEmpty = function(){
//         if(size === 0)return true;
//         return false;        
//     }

//     this.size = function(){
//         return size;
//     }
// }

import { Queue } from './queue.js';

export const Graph = function(numberOfNodes = 0){
    let nodesCount = numberOfNodes;
    let graph = [...Array(nodesCount + 3)].map( data => data = [] );
    let dist = [...Array(nodesCount + 3).fill(-1)];
    
    this.add_edge = function(u,v){
         graph[u].push(v);
         graph[v].push(u);
    }

    this.shortestReach = function(start){
        const Q = new Queue();
        Q.push(start);
        dist[start] = 0;
        while(!Q.isEmpty()){
            const source = Q.front();
            for(let i = 0; i < graph[source].length; i++){
                const destination = graph[source][i];
                if(dist[destination] === -1){
                    dist[destination] = dist[source] + 6;
                    Q.push(destination);
                }
            }
            Q.pop();
        }
        const ans = [];
        for(let i = 1; i <= nodesCount; i++){
            if( i !== start)ans.push(dist[i]);
        }
        return ans;
    }
}