const bankData = [
  {
    authDetails: {
      username: 'rahulyadav',
      password: '123456',
    },
    personalDetails: {
      name: 'Rahul Yadav',
      address: 'Ram Nagar',
      email: 'rahulyadav@mypage.com',
    },
    bankAccountDetails: {
      accountNumber: 123456789012,
      accountType: 'Saving Account',
      accountBalance: 10000,
      ifsc: 'PLSO123456',
      branch: 'Metro Tower, Palasia Indore, MP',
      nominee: '-',
    },
    debitCardDetails: {
      cardType: 'Premium Debit Card',
      cardNumber: '1234567812345678',
      validity: '12/30',
      cvv: '123',
      cardPin: '',
      POSLimit: '50000',
      withdrawalLimit: '25000',
    },
    creditCardDetails: {
      cardType: 'Premium Credit Card',
      cardNumber: '5678123456781234',
      validity: '04/27',
      cvv: '321',
      cardPin: '',
      POSLimit: '50000',
      withdrawalLimit: '5000',
    },
    loanAccountDetails: [],
    depositDetails: [],
    movements: [
      {
        amount: -500,
        time: '2019-04-22T18:30:00.000Z',
        remark: 'a book',
      },
      {
        amount: -750,
        time: '2019-05-22T18:30:00.000Z',
        remark: 'goggle',
      },
      {
        amount: 1100,
        time: '2019-10-22T18:30:00.000Z',
        remark: 'e-ticket refund',
      },
      {
        amount: 700000,
        time: '2020-02-22T18:30:00.000Z',
        remark: 'received from mohit',
      },
      {
        amount: -1650,
        time: '2020-06-22T18:30:00.000Z',
        remark: 'dress purchased',
      },
    ],
  },
];

export default bankData;
