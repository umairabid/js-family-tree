function drawFamilyTree(root) {

  var cursorRow = 0;
  var cursorCol = 0;
  var queue = [root]
  var matrix = [[{
    color: 1,
    data: root,
    isPartner: false,
    row: cursorRow
  }]]

  root.row = 0;

  while(queue.length > 0) {
    var node = queue.shift();
    cursorRow = node.row;
    for(var i = 0; i < matrix[cursorRow.length]; i++) {
      if(matrix[cursorRow][i].data.id === node.id) {
        cursorCol = i;
        break;
      }
    }
    console.log(cursorRow, cursorCol);
    if(node.partners && node.partners.length > 0) addPartners(node);
    console.log(matrix);
  }

  

  function addPartners(node) {
    if(node.partners.length === 1) {
      matrix[cursorRow][cursorCol].color === 1 ?
        addRightPartner(node.partners[0]):
        addLeftPartner(node.partners[0])
    } else {
      addLeftPartner(node.partners[0])
      addRightPartner(node.partners[1])
    }
  }

  function addRightPartner(partner) {
    if(shouldAddColumn(cursorRow, cursorCol + 1)) addColumnOnRight();
    matrix[cursorRow][cursorCol + 1] = getPartnerObject(partner)
    if(shouldAddColumn(cursorRow, cursorCol + 1)) addColumnOnRight();
    matrix[cursorRow][cursorCol + 1] = {partnerSpace: true}
    addChildren(partner);
  }
     
  function addLeftPartner(partner) {
    if(shouldAddColumn(cursorRow, cursorCol - 1)) addColumnOnLeft();
    matrix[cursorRow][cursorCol - 1] = getPartnerObject(partner)
    if(shouldAddColumn(cursorRow, cursorCol - 1)) addColumnOnLeft();
    matrix[cursorRow][cursorCol - 1] = {partnerSpace: true}
    addChildren(partner);
  }

  function addChildren(partner) {
    if(!partner.children) return;
    var isEven = partner.children.length % 2 === 0;
    var mid = Math.ceil(partner.children.length / 2) - 1;
    var color = 0;
    partner.children.forEach((c, i) => {
      var col = findPartnerSpaceColofNode(partner);
      if(i < mid || (i === mid && isEven)) {
        addLeftChild(cursorRow, col, color, c);
      }  else if ( i > mid) {
        color = 1;
        addRightChild(cursorRow, col, color, c);
      } else {
        matrix[cursorRow + 1][col] = {data: c, color}
      }
      c.row = cursorRow + 1;
      queue.push(c);
    })
  }

  function findPartnerSpaceColofNode(partner) {
    if(node.partners.length === 1) {
      if(matrix[cursorRow][cursorCol].color == 1) return cursorCol + 1;
      else return cursorCol - 1;
    } else {
      var rightPartner = matrix[cursorRow][cursorCol + 2];
      if(rightPartner.data.id === partner.id) return cursorCol + 1;
      else return cursorCol - 1;
    }
  }

  function addLeftChild(spaceRow, spaceCol, color, child) {
    var colForChild = spaceCol - 2;
    var rowForChild = spaceRow + 1;
    if(colForChild < 0) colForChild = 0;
    if(!matrix[rowForChild]) addRowBelow();
    if(shouldAddColumn(rowForChild, colForChild)) {
      cursorCol = cursorCol + 1;
      matrix.forEach(row => row.splice(colForChild, 0, {empty: true}))
    }
    matrix[rowForChild][colForChild] = {data: child, color}
  }

  function addRightChild(spaceRow, spaceCol, color, child) {
    var colForChild = spaceCol + 2;
    var rowForChild = spaceRow + 1;
    if(!matrix[rowForChild]) addRowBelow();
    if(shouldAddColumn(rowForChild, colForChild)) {
      matrix.forEach(row => row.splice(colForChild, 0, {empty: true}))
    }
    matrix[rowForChild][colForChild] = {data: child, color}
  }

  function addRowBelow() {
    matrix.push([])
    matrix[matrix.length-1].push([]);
    for(var i = 0; i < matrix[cursorRow].length ; i++) {
      matrix[matrix.length-1][i] = {empty: true};
    }
  }

  function addColumnOnLeft() {
    matrix[cursorRow].splice(cursorCol, 0, {empty: true})
    cursorCol = cursorCol + 1;
  }

  function addColumnOnRight() {
    matrix[cursorRow].splice(cursorCol + 1, 0, {empty: true})
  }

  function shouldAddColumn(row, col) {
    console.log(row, col)
    return !matrix[row][col] 
      || (
        matrix[row][col] &&
        !matrix[row][col].empty
      )
  }

  function getPartnerObject(data) {
    return {
      data,
      isPartner: true,
      row: cursorRow
    }
  }

}

