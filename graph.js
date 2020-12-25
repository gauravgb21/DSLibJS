import { MinHeap } from './priority_queue.js';

const Graph = function(numberOfNodes = 0){
    let nodesCount = numberOfNodes;
    let graph = [...Array(nodesCount + 3)].map( data => data = [] );
    let dist = [...Array(nodesCount + 3).fill(Infinity)];
    
    this.addEdge = function(u,v,dist){
         graph[u].push([v,dist]);
         graph[v].push([u,dist]);
    }

    this.shortestPath = function(start){
        const Q = new MinHeap(true);
        Q.push([0,start]);
        dist[start] = 0;
        while(!Q.isEmpty()){
            const source = (Q.top())[1];
            for(let i = 0; i < graph[source].length; i++){
                const destination = graph[source][i][0];
                const weight = graph[source][i][1];
                if(dist[destination] > dist[source] + weight){
                    dist[destination] = dist[source] + weight;
                    Q.push([dist[destination],destination]);
                }
            }
            Q.pop();
        }
        const ans = [];
        for(let i = 0; i <= nodesCount; i++){
            ans.push(dist[i]);
        }
        return ans;
    }
}

export default Graph;