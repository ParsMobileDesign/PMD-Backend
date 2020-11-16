const portgolioItems = [
  {
    id: 1,
    title: "item 1",
    description: "desc 1",
    author: "PMD",
  },
  {
    id: 2,
    title: "item 2",
    description: "desc 2",
    author: "PMD",
  },
  {
    id: 3,
    title: "item 3",
    description: "desc 3",
    author: "PMD",
  },
];
var t = portgolioItems.find((p) => p.id ===2);
console.log(t);
