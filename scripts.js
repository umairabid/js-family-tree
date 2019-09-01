function drawFamilyTree(root) {

  // check if we have row
  // check if we have column
  // do we need to take a descision on which row-column where node will go
  // may be there needs to be current row and column concept
  // and how do we take decision where it needs to go
  // info: row might tell us about the level of tree
  // do we draw the tree in depth first way, this will make sense if we know the rol and col where node needs to go and if they already exists
  // also if we draw siblings from left to right it will help us insert extra spaces
  // requirement:  if children count are odd their will be one child under the parent and others will be distributed on the sides
  // requirement: if children is even no child will be under the parent and will be distributed of left and right
  // requirement: if left node of parent has partner, partner goes left
  // requirement: if right node of parent has partner, partner goes right (will use color flag for this)
  
  // when we process parent we will already know its matrix row and col
  // parent will create row and col for its children

  root.row = 0;
  root.col = 0;
  var queue = [root]
  var matrix = [[
    {
      spacer: false,
      isPartner: false,
      data: root,
      hasPartners: root.partners.length > 0,
      color: 1
    }
  ]]
  

  while(queue.length > 0) {
    var node = queue.shift();
    var cell = matrix[node.row][node.col];
    if(!cell) {
      console.log(node.row, node.col, matrix)
    }
    if(cell.hasPartners) {
      if(node.partners.length == 1) {
        if(cell.color == 1) {
          addPartnerToRight(node, node.partners[0])
        } else {
          addPartnerToLeft(node, node.partners[0])
        }
      } else {
        addPartnerToLeft(node, node.partners[0])
        addPartnerToRight(node, node.partners[1])
      }
    }
    resetNodeIndexes();
  }

  console.log(matrix);

  function addPartnerToRight(node, partner) {
    matrix[node.row].push(
      {
        spacer: false,
        isPartner: true,
        data: partner,
        hasPartners: null,
        color: null
      }
    )
    addChildren(node, partner);
  }

  function addPartnerToLeft(node, partner) {
    matrix[node.row].splice(node.col-1 < 0 ? 0 : node.col - 1, 0 , {
      spacer: false,
      isPartner: true,
      data: partner,
      hasPartners: null,
      color: null
    })
    addChildren(node, partner)
  }

  function addChildren(node, partner) {
    if(partner.children) {
      var isEven = partner.children.length % 2 === 0;
      var mid = Math.ceil(partner.children.length / 2) - 1;
      var color = 0;
      partner.children.forEach((c, i) => {
        if(i <= mid) {
          c.row = node.row + 1;
          c.col = node.col - 1;
        } else if (i === mid && !isEven) {
          c.row = node.row + 1;
          c.col = node.col;
        } else {
          c.row = node.row + 1;
          c.col = node.col + 1;
          color = 1;
        }
        addChild(node, partner, c, color);
        queue.push(c);
      })
    }
  }

  function addChild(parent, parentPartner, child, color) {
    if(!matrix[child.row]) matrix.push([]);

    if(child.col < 0) {
      matrix.forEach((row, index) => {
        if(index !== child.row) {
          row.splice(0, 0, null)
        } else {
          row.splice(0, 0, getChildCell(...arguments))
        }
      })
    } else if(!matrix[child.row][child.col]) {
      matrix[child.row][child.col] = getChildCell(...arguments)
    } else if(matrix[child.row][child.col]){
      //matrix.forEach((row, index) => row.splice(child.col, 0, null))
      matrix[child.row][child.col] = getChildCell(...arguments)
    }
  }

  function getChildCell(parent, parentPartner, child, color) {
    return {
      spacer: false,
      isPartner: false,
      data: child,
      hasPartners: child.partners && child.partners.length > 0,
      color,
      parentPartner,
      parent
    }
  }

  function resetNodeIndexes() {
    matrix.forEach((r, ri) => {
      r.forEach((c, ci) => {
        const cell = matrix[ri][ci];
        
        if(cell && cell.data) {
          if(cell.data.id == 3) {
            console.log(ri, ci, cell);
          } 
          cell.data.row = ri;
          cell.data.col = ci;
          console.log(ri, ci);
        }
      })
    })
  }

}