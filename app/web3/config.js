export const CONTACT_ADDRESS = '0xfAd567EBdCb36f49F3a509FEDF9e72E3ad75ca59';

export const CONTACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'count',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0x06661abd',
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'contacts',
    outputs: [
      {
        name: 'id',
        type: 'uint256',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'phone',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
    signature: '0xe0f478cb',
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
    signature: 'constructor',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_name',
        type: 'string',
      },
      {
        name: '_phone',
        type: 'string',
      },
    ],
    name: 'createContact',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
    signature: '0x3dce4920',
  },
];
