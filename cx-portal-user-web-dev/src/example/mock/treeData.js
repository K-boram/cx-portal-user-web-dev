const mockTreeData = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 2,
        label: 'Level two 1-1',
        children: [
          {
            id: 3,
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
        children: [
          {
            id: 6,
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        id: 7,
        label: 'Level two 2-2',
        children: [
          {
            id: 8,
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    id: 9,
    label: 'Level one 3',
    children: [
      {
        id: 10,
        label: 'Level two 3-1',
        children: [
          {
            id: 11,
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        id: 12,
        label: 'Level two 3-2',
        children: [
          {
            id: 13,
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

export default mockTreeData
