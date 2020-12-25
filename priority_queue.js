export const MinHeap = function(tupleFlag = false){
    const heapArray = [];
    let size = -1;
    let isTuple = tupleFlag;

    const getParent = index => Math.floor((index - 1) / 2);

    const getLeftChild = index => ((2 * index) + 1);

    const getRightChild = index => ((2 * index) + 2);

    const swapNodes = (index1,index2) => {
        const temp = heapArray[index1];
        heapArray[index1] = heapArray[index2];
        heapArray[index2] = temp;
    }

    const shiftUp = index => {
        if(isTuple){
            while( index > 0  && heapArray[getParent(index)][0] > heapArray[index][0] ){
                swapNodes(getParent(index),index);
                index = getParent(index);
            }
        }
        else{
            while( index > 0  && heapArray[getParent(index)] > heapArray[index] ){
                swapNodes(getParent(index),index);
                index = getParent(index);
            }
        }
    }

    const shiftDown = index => {
        let minIndex = index;
        if(isTuple){
            const left = getLeftChild(index);
            if(left <= size && heapArray[left][0] < heapArray[minIndex][0])minIndex = left;    
            const right = getRightChild(index);
            if(right <= size && heapArray[right][0] < heapArray[minIndex][0])minIndex = right;
        }
        else{
            const left = getLeftChild(index);
            if(left <= size && heapArray[left] < heapArray[minIndex])minIndex = left;    
            const right = getRightChild(index);
            if(right <= size && heapArray[right] < heapArray[minIndex])minIndex = right;
        }
        
        if(index !== minIndex){
            swapNodes(index,minIndex);
            shiftDown(minIndex);
        }
    }

    this.push = data => {
        size++;
        heapArray[size] = data;
        shiftUp(size);
    }

    this.top = () => heapArray[0];

    this.pop = () => {
        const res = heapArray[0];
        heapArray[0] = heapArray[size];
        size--;
        shiftDown(0);
        return res;
    }

    this.isEmpty = () => size === -1

    this.printHeap = () => {
        for(let i = 0; i <= size; i++)console.log(heapArray[i]);
    }
}