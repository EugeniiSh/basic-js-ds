const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor()
  {
    this.roott = null;
  }

  root() {
    return this.roott;
  }

  add(data) {
    this.roott = addData(this.roott, data);

    function Node(value)
      {
        this.data = value;
        this.left = null;
        this.right = null;
      }
      
    function addData(node, value)
    {
      if(!node)
      {
        return new Node(value);
      }

      if(node.data === value)
      {
        return node;
      }

      if(value < node.data)
      {
        node.left = addData(node.left, value);
      }
      else
      {
        node.right = addData(node.right, value);
      }

      return node;
    }
  }

  has(data) {
    return hasData(this.roott, data);
    
    function hasData(node, value)
    {
      if(!node)
      {
        return false;
      }
      
      if(node.data === value)
      {
        return true;
      }
      
      return value < node.data ?
        hasData(node.left, value):
        hasData(node.right, value);
    }
  }

  find(data) {
    let findData = this.roott;
    while(findData)
    {
      if(findData.data === data)
      {
          return findData;
      }
      else
      {
        if(data < findData.data)
        {
          findData = findData.left;
        }
        else
        {
          findData = findData.right;
        }
      }
    }
    
    return findData;
  }

  remove(data) {
    this.roott = removeData(this.roott, data);
    
    function removeData(node, value)
    {
      if(!node)
      {
        return null;
      }
      
      if(value < node.data)
      {
        node.left = removeData(node.left, value);
        return node;
      }
      else if(value > node.data)
      {
        node.right = removeData(node.right, value);
        return node;
      }
      else
      {
        //Если нет дочерних узлов
        if(!node.left && !node.right)
        {
          //удаляем узел возвращая null.
          return null;
        }
        //Если нет левого узла
        if(!node.left)
        {
          //Присваиваем узлу его правый узел
          node = node.right;
          return node;
        }
        //Если нет правого узла
        if(!node.right)
        {
          //Присваиваем узлу его левый узел
          node = node.left;
          return node;
        }
        
        //Если есть оба узла, левый и правый
        //ищем минимальный узел из правого узла
        let minFromRight = node.right;
        while(minFromRight.left)
        {
          minFromRight = minFromRight.left
        }
        //Когда узел найден, задаём его значение удаляемому узлу.
        node.data = minFromRight.data;
        //Удаляем минимальный узел из правого узла
        node.right = removeData(node.right, minFromRight.data);
        
        return node;
      }
    }
  }

  min() {
    if(!this.roott)
    {
      return;
    }
    
    let node = this.roott;
    while(node.left)
    {
      node = node.left;
    }
    
    return node.data;
  }

  max() {
    if(!this.roott)
    {
      return;
    }
    
    let node = this.roott;
    while(node.right)
    {
      node = node.right;
    }
    
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};