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

// we cant store col in node beacuse it will be ever changing but we can store row
// parents will add their child in tree with row number
// when node will have row it will be easy to find col
