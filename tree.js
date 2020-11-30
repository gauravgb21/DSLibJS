const Node = function(data){
    this.data = data;
    this.next = null;
}

const LinkedList = function(){
    let head = null;

    this.addNode = function(data){
        if(head === null){
            head = new Node(data);
            head.next = null;
        }
        else{
            const newNode = new Node(data);
            const tempHead = Object.assign({},head);
            while(head.next !== null){
                head = head.next;
            }
            head.next = newNode;
            head = tempHead;
        }
    }

    this.traverseList = function(){
        if(head === null)throw new Error("Can't iterate on an empty list");
        else{
            console.log("List data is ");
            let tempHead = Object.assign({},head);
            while(tempHead !== null){
                console.log(tempHead.data);
                tempHead = tempHead.next;
            }      
        }
    }
}

const TreeNode = function(data){
    this.data = data;
    this.left = null;
    this.right = null;
}

class BinaryTree {
    function addNode 
}
