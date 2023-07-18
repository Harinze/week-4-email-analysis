import FileTree from './fileTree';

export function createFileTree(input) {

const parent = [];
const child = [];

for(let index  = 0; index < input.length; index++){
    if(input[index].parentId){
      child.push(input[index])
    }else{parent.push(input[index])}
}
 
for(let indexOfParent = 0; indexOfParent < parent.length; indexOfParent++){
     for(let indexOfChild = 0; indexOfChild < child.length; indexOfChild++){
      if(parent[indexOfParent].id==child[indexOfChild].parentId){
        parent.push(child[indexOfChild])
      }
     }
}
 
input = parent
console.log(input)

  const fileTree = new FileTree();
  for (const inputNode of input) {
    const parentNode = inputNode.parentId
      ? fileTree.findNodeById(inputNode.parentId)
      : null;

    fileTree.createNode(
      inputNode.id,
      inputNode.name,
      inputNode.type,
      parentNode
    );
  }

  return fileTree;
}
