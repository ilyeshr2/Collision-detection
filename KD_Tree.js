class KD_TREE {
  constructor(el, direction) {
    this.x = el[0];
    this.y = el[1];
    this.left = null;
    this.right = null;
    this.direction = direction;
  }

  static make_kd_node(root, el, direction = 0) {
    if (root == null) return new KD_TREE(el, direction);
    if (root.direction == 0) {
      if (root.x > el[0])
        root.left = KD_TREE.make_kd_node(
          root.left,
          el,
          (root.direction + 1) % 2
        );
      else
        root.right = KD_TREE.make_kd_node(
          root.right,
          el,
          (root.direction + 1) % 2
        );
    } else {
      if (root.y > el[1])
        root.left = KD_TREE.make_kd_node(
          root.left,
          el,
          (root.direction + 1) % 2
        );
      else
        root.right = KD_TREE.make_kd_node(
          root.right,
          el,
          (root.direction + 1) % 2
        );
    }
    return root;
  }

  static make_kd_tree(arr) {
    let root = null;
    for (const el of arr) root = KD_TREE.make_kd_node(root, el);

    return root;
  }
}

arr = [
  [3, 6],
  [17, 15],
  [13, 15],
  [6, 12],
  [9, 1],
  [2, 7],
  [10, 19],
];

function display_element(root) {
  if (root == null) return;
  console.log(`(${root.x} , ${root.y})`);
  display_element(root.left);
  display_element(root.right);
}

KD_ROOT = KD_TREE.make_kd_tree(arr);

display_element(KD_ROOT);

